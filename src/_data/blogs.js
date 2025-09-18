require("dotenv").config();
const contentful = require("contentful");
const matter = require("gray-matter");
const getData = require("./_shared.js").getData;

const USE_PREVIEW = false;
const CMS_REPO = "i-dot-ai/ai-gov-uk-cms-content";

// Return empty array if using test credentials
if (process.env.CONTENTFUL_ACCESS_TOKEN === 'test') {
  module.exports = async () => [];
  return;
}

let contentfulOptions = {
  space: process.env.CONTENTFUL_SPACE,
  accessToken: USE_PREVIEW
    ? process.env.PREVIEW_ACCESS_TOKEN
    : process.env.CONTENTFUL_ACCESS_TOKEN,
};
if (USE_PREVIEW) {
  contentfulOptions.host = "preview.contentful.com";
}
const client = contentful.createClient(contentfulOptions);

let cache;

module.exports = async () => {

  if (cache) {
    console.log("Using cached blogs");
    return cache;
  }

  let response = await client.getEntries({
    content_type: "blog",
  });
  let blogs = response.items.map((blog) => {
    return {
      title: blog.fields.title,
      summaryShort: blog.fields.summary,
      summaryLong: blog.fields.summaryBlogPage,
      authors: blog.fields.authors.map((author) => author.fields),
      date: blog.fields.date,
      coverImage: blog.fields.coverImage?.fields,
      content: blog.fields.content,
      contentPart2: blog.fields.contentPart2,
      source: "Contentful",
    };
  });

  // Get new authors
  const newAuthors = await getData(
    `https://api.github.com/repos/${CMS_REPO}/contents/content/authors`
  );
  let allAuthors = [];
  for (const author of newAuthors.map((item) => item.url)) {
    const authorRawData = await getData(author);
    const authorContent = Buffer.from(authorRawData.content, "base64").toString(
      "utf8"
    );
    const authorData = matter(authorContent).data;

    allAuthors.push({
      name: authorData.name,
      jobTitle: authorData.jobTitle,
      picture: {
        fields: {
          file: {
            url: authorData.picture,
          },
        },
      },
    });
  }

  // Get new blogs
  const newBlogs = await getData(
    `https://api.github.com/repos/${CMS_REPO}/contents/content/blogs`
  );
  for (const blog of newBlogs.map((item) => item.url)) {
    const blogRawData = await getData(blog);
    const blogContent = Buffer.from(blogRawData.content, "base64").toString(
      "utf8"
    );
    const blogData = matter(blogContent).data;

    const image = (() => {
      if (blogData.leadImage.includes("http:")) {
        return blogData.leadImage.replace("http:", "https:");
      }
      const returnUrl = blogData.leadImage;
      return returnUrl;
    })();

    for (let component of blogData.components || []) {
      // get all images within the content
      if (component.type === "bodyText") {
        const imagePaths = component.content.match(
          /\/images\/uploads\/[a-z0-9\.]*/g
        );
      }
      // convert carousel items
      if (component.type === "carousel" && Array.isArray(component.carouselItems)) {
        const items = Array.isArray(component.carouselItems) ? component.carouselItems.map((item) => item.carouselContent) : [];
        component.carouselItems = JSON.stringify(items);
      }
    }

    blogs.push({
      title: blogData.title,
      summaryShort: blogData.summaryHubPage,
      summaryLong: blogData.summaryBlogPage,
      authors: (() => {
        let blogAuthors = blogData.authors?.map((author) => {
          return author.author;
        });
        let foundAuthors = [];
        allAuthors.forEach((author) => {
          if (blogAuthors?.includes(author.name)) {
            author.picture.fields.file.url = author.picture.fields.file.url.replace("/images/uploads/", "https://i-dot-ai-cms.netlify.app/assets/");
            foundAuthors.push(author);
          }
        });
        return foundAuthors;
      })(),
      date: blogData.date,
      coverImage: {
        title: blogData.leadImageCaption,
        description: blogData.leadImageAlt,
        file: {
          url: (() => {
            if (image.includes("https:")) {
              return image;
            }
            return image.replace("/images/uploads/", "https://i-dot-ai-cms.netlify.app/assets/");
          })(),
        },
      },
      components: blogData.components,
      source: "DecapCMS",
    });
  }

  // Add preview blog (for CMS)
  blogs.push({
    title: "Preview",
    summaryLong: "[Optional summary goes here]",
    authors: [
      {
        name: "[Author goes here]",
        jobTitle: "Job title and image (not available in preview)",
        picture: {
          fields: {
            file: {
              url: "https://t4.ftcdn.net/jpg/00/93/85/69/360_F_93856984_YszdhleLIiJzQG9L9pSGDCIvNu5GEWCc.jpg",
            },
          },
        },
      },
    ],
    date: new Date().toDateString(),
    coverImage: {
      file: {
        url: blogs[0].coverImage.file.url,
      },
      description: blogs[0].coverImage.description,
      title: "Optional image caption goes here",
    },
    components: [
      {
        type: "video",
      },
      {
        type: "infographic",
      },
    ],
    source: "DecapCMS",
  });

  // sort by date (latest first)
  blogs.sort((a, b) => {
    return a.date < b.date ? 1 : -1;
  });
  cache = blogs;
  return blogs;
};

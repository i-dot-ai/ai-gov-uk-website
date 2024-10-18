const matter = require("gray-matter");
const getData = require("./_shared.js").getData;

const CMS_REPO = "i-dot-ai/ai-gov-uk-cms-content";

  
module.exports = async () => {

    const faqsFetch = await getData(`https://api.github.com/repos/${CMS_REPO}/contents/content/faqs`);
    const faqsRawData = await getData(faqsFetch[0].url);
    const faqsData = Buffer.from(faqsRawData.content, "base64").toString("utf8");
    const faqs = matter(faqsData).data;

    return faqs;

};
  
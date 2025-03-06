const matter = require("gray-matter");
const getData = require("./_shared.js").getData;

const CMS_REPO = "i-dot-ai/ai-gov-uk-cms-content";

module.exports = async () => {

  let pressMentions = [];
    
  const pressMentionsData = await getData(
    `https://api.github.com/repos/${CMS_REPO}/contents/content/press`
  );
  for (const entry of pressMentionsData.map((entry) => entry.url)) {
    const entryRawData = await getData(entry);
    const entryContent = Buffer.from(entryRawData.content, "base64").toString("utf8");
    const entryData = matter(entryContent).data;

    const logo = entryData.logo;
    entryData.logo = logo.replace("/images/uploads/", "https://i-dot-ai-cms.netlify.app/assets/");

    pressMentions.push(entryData);
  }

  const mediaOutletSortPreferences = {
    bbc: 3,
    independent: 2,
    mirror: 1
  }

  return pressMentions.sort((entryA, entryB) => {
    // sort by date first
    if (entryA.date.toString() !== entryB.date.toString()) {
      return entryA.date < entryB.date ? 1 : -1;
    }
    // then sort by media outlet preference
    const outletA = entryA.media?.split(" ").pop().toLowerCase();
    const outletAIndex = mediaOutletSortPreferences[outletA] || 0;
    const outletB = entryB.media?.split(" ").pop().toLowerCase();
    const outletBIndex = mediaOutletSortPreferences[outletB] || 0;
    console.log(outletA, outletAIndex, outletB, outletBIndex);
    return outletBIndex - outletAIndex;
  });

};

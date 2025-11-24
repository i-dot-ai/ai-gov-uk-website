let pagefindInstancePromise;

const getPagefindInstance = async () => {
  if (!pagefindInstancePromise) {
    pagefindInstancePromise = import("/pagefind/pagefind.js").then(async (module) => {
      const instance = module.default ?? module;
      await instance.init();
      return instance;
    });
  }
  return pagefindInstancePromise;
};

export const searchKnowledgeHub = async (rawQuery = "", type = "tools") => {
  const query = rawQuery.trim();
  if (!query) {
    return [];
  }

  const pagefind = await getPagefindInstance();
  const search = await pagefind.search(query);
  const results = [];

  for (const result of search.results) {
    const data = await result.data();
    if (data.url.includes(`/knowledge-hub/${type}/`)) {
      results.push(data);
    }
  }

  return results;
};

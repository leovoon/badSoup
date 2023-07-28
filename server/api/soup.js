export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const endpoint = config.corshApi + config.soupApi;
  const res = await fetch(endpoint);
  if (!res.ok) {
    throw createError({
      statusCode: 500,
      statusMessage: "Something went wrong, developer to fix.",
    });
  }
  const soup = await res.json();
  return soup;
});

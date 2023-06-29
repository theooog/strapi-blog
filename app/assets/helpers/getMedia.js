export function getMedia(data, format) {
  const formats = data.data.attributes.formats;
  const name = data.data.attributes.alternativeText || "";
  if (formats && formats[format]) {
    return {
      url: process.env.NEXT_PUBLIC_STRAPI_URL + formats[format].url,
      alt: name,
    };
  }
  return {
    url: process.env.NEXT_PUBLIC_STRAPI_URL + data.data.attributes.url,
    alt: name,
  };
}

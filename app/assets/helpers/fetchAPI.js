import qs from "qs";
export async function fetchAPI(
  endPoint,
  {
    filters,
    sort,
    populate,
    fields,
    pagination,
    publicationState,
    locale,
    cacheOption = "no-store",
    revalidate = "",
  } = {} // Added default value here
) {
  const params = {
    filters,
    sort,
    populate,
    fields,
    pagination,
    publicationState,
    locale,
  };

  const queryString = qs.stringify(params, {
    addQueryPrefix: true,
    arrayFormat: "brackets",
  });

  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/${endPoint}${queryString}`;

  const options = {
    // Change the type to RequestInit
    headers: {
      "Content-Type": "application/json",
    },
    cache: cacheOption,
  };

  if (revalidate) {
    options["next"] = { revalidate };
    delete options.cache;
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();

  return data;
}

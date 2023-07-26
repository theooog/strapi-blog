import { fetchAPI } from "@/assets/helpers/fetchAPI";
import BlogList from "@/components/Lists/BlogList";
import React from "react";
import Pagination from "@/components/Pagination/Pagination";

const valueToLabel = (text) => {
  text = text.replaceAll("_", " ");
  const firstLetter = text.charAt(0).toUpperCase();
  const remainingLetters = text.slice(1);
  return firstLetter + remainingLetters;
};

export async function generateMetadata({ params }) {
  const title = "Category - " + valueToLabel(params?.slug);
  return {
    title: title,
  };
}

const page = async ({ params, searchParams }) => {
  const slug = params?.slug;
  const pageSize = 2;
  const page = searchParams?.page || 1;
  const { data: articles, meta: meta } = await fetchAPI("articles", {
    filters: {
      categories: {
        value: slug,
      },
    },
    populate: "*",
    pagination: {
      page: page,
      pageSize: pageSize,
      withCount: true,
    },
  });

  return (
    <div className="mt-10">
      <h1 className="mb-0 ">{valueToLabel(slug)}</h1>
      <BlogList blogs={articles} />
      <Pagination
        total={meta?.pagination?.total}
        page={page}
        pageSize={pageSize}
      />
    </div>
  );
};

export default page;

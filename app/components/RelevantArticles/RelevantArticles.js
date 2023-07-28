"use client";
import React, { useEffect, useRef, useState } from "react";
import useOnScreen from "../../assets/hooks/useOnScreen";
import { fetchAPI } from "../../assets/helpers/fetchAPI";
import BlogList from "../Lists/BlogList";
import BlogListSkeleton from "./../Skeleton/BlogListSkeleton";

const RelevantArticles = ({ categories, slug }) => {
  const ref = useRef();
  const isInViewPort = useOnScreen(ref);
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    if (articles.length === 0 && isInViewPort) {
      setIsLoading(true);
      const categoryArr = categories.map((cat) => cat?.attributes?.value);
      const getData = async () => {
        const { data: art } = await fetchAPI("articles", {
          pagination: {
            limit: 4,
            start: 0,
          },
          filters: {
            categories: {
              value: {
                $in: categoryArr,
              },
            },
            slug: {
              $ne: slug,
            },
          },
          populate: "*",
        });
        setArticles(art);
        setIsLoading(false);
      };
      getData();
    }
  }, [isInViewPort, articles]);

  return (
    <div ref={ref} className="mt-10">
      <h4>Relevant articles</h4>
      <div>
        {isLoading && (
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <BlogListSkeleton />
            <BlogListSkeleton />
            <BlogListSkeleton />
            <BlogListSkeleton />
          </div>
        )}
      </div>
      <BlogList blogs={articles} />
    </div>
  );
};

export default RelevantArticles;

import React from "react";
import FeaturedCard from "../components/Cards/FeaturedCard";
import { getMedia } from "../assets/helpers/getMedia";
import BlogList from "../components/Lists/BlogList";
const PageBuilder = ({ components, blogs }) => {
  const page = components.map((component, index) => {
    const name = component?.__component;

    switch (name) {
      case "card.featured":
        const articleData = component?.article?.data;
        const attr = articleData?.attributes;
        return (
          <FeaturedCard
            key={articleData?.id + " - " + index}
            title={attr?.title}
            description={attr?.description}
            imageURL={getMedia(attr?.featured_image, "small")?.url}
            imageALT={getMedia(attr?.featured_image, "small")?.alt}
            url={attr?.slug}
          />
        );
      case "list.bloglist":
        return (
          <BlogList
            title={component?.title}
            count={component?.count}
            blogs={blogs}
          />
        );
    }
  });
  return <div>{page}</div>;
};

export default PageBuilder;

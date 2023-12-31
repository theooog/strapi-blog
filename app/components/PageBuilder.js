import React from "react";
import FeaturedCard from "../components/Cards/FeaturedCard";
import { getMedia } from "../assets/helpers/getMedia";
import BlogList from "../components/Lists/BlogList";
import { sanitize } from "isomorphic-dompurify";
import { marked } from "marked";
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
            key={component?.title + index}
            title={component?.title}
            count={component?.count}
            blogs={blogs}
          />
        );
      case "text.text":
        const getDescription = (text) => {
          const sanitizedDescription = sanitize(text);
          const formattedDescription = marked(sanitizedDescription);
          return { __html: formattedDescription };
        };
        return (
          <div
            dangerouslySetInnerHTML={getDescription(component?.TextField)}
          ></div>
        );
    }
  });
  return <div>{page}</div>;
};

export default PageBuilder;

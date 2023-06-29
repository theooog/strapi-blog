import React from "react";
import BlogCard from "../Cards/BlogCard";
import { getMedia } from "../../assets/helpers/getMedia";
const BlogList = ({ blogs, title, count }) => {
  return (
    <div className="mt-20">
      <h4>{title}</h4>
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {blogs.map((blog, index) => {
          const attr = blog.attributes;
          const image = getMedia(attr?.featured_image, "small");
          if (index < count) {
            return (
              <BlogCard
                key={"BlogCard " + blog?.id}
                title={attr?.title}
                description={attr?.description}
                imageURL={image?.url}
                imageALT={image?.alt}
                url={"/blog/" + attr?.slug}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default BlogList;

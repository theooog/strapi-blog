import React from "react";
import BlogCard from "../Cards/BlogCard";
const BlogList = ({ title }) => {
  return (
    <div className="mt-20">
      <h4>{title}</h4>
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <BlogCard
          title={"Blog example"}
          description={
            "this is a blog example.this is a blog examplethis is a blog examplethis is a blog examplethis is a blog examplethis is a blog example"
          }
          imageURL={"https://i.imgur.com/Vbsk7t5.jpeg"}
          imageALT={"Robot art image"}
          url={"/"}
        />
        <BlogCard
          title={"Blog example"}
          description={
            "this is a blog example.this is a blog examplethis is a blog examplethis is a blog examplethis is a blog examplethis is a blog example"
          }
          imageURL={"https://i.imgur.com/Vbsk7t5.jpeg"}
          imageALT={"Robot art image"}
          url={"/"}
        />
        <BlogCard
          title={"Blog example"}
          description={
            "this is a blog example.this is a blog examplethis is a blog examplethis is a blog examplethis is a blog examplethis is a blog example"
          }
          imageURL={"https://i.imgur.com/Vbsk7t5.jpeg"}
          imageALT={"Robot art image"}
          url={"/"}
        />
        <BlogCard
          title={"Blog example"}
          description={
            "this is a blog example.this is a blog examplethis is a blog examplethis is a blog examplethis is a blog examplethis is a blog example"
          }
          imageURL={"https://i.imgur.com/Vbsk7t5.jpeg"}
          imageALT={"Robot art image"}
          url={"/"}
        />
      </div>
    </div>
  );
};

export default BlogList;

import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogCard = ({ title, description, imageURL, imageALT, url }) => {
  return (
    <Link href={url}>
      <div className="flex flex-col  border rounded-lg hover:bg-slate-100 mt-5">
        <div className="relative h-[9rem] w-full">
          <Image src={imageURL} alt={imageALT} fill className="object-cover" />
        </div>
        <div className=" p-4 w-full">
          <h5>{title}</h5>
          <p className="line-clamp-3">{description}</p>
          <button className="bg-black opacity-80 hover:opacity-100 text-white rounded p-2">
            Read more
          </button>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;

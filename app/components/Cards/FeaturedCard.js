import Image from "next/image";
import Link from "next/link";
import React from "react";

const FeaturedCard = ({ title, description, imageURL, imageALT, url }) => {
  return (
    <Link href={"/blog/" + url}>
      <div className="flex flex-col sm:flex-row border rounded-lg hover:bg-slate-100 mt-14 mb-14">
        <div className="relative sm:w-4/12 h-[15rem] w-full">
          <Image src={imageURL} alt={imageALT} fill className="object-cover" />
        </div>
        <div className="sm:w-8/12 p-4 w-full">
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

export default FeaturedCard;

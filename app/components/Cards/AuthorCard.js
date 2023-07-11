import Image from "next/image";
import React from "react";

const AuthorCard = ({ name, bio, imageURL, imageALT }) => {
  return (
    <div className="flex text-center sm:text-left  flex-col sm:flex-row gap-6 mt-10 bg-slate-50 px-4 py-3 border border-1 rounded max-w-[40rem]">
      <Image
        width={70}
        height={70}
        className="rounded-full m-auto h-fit"
        src={imageURL}
        imageALT={imageALT}
      />
      <div>
        <h4>{name}</h4>
        <p>{bio}</p>
      </div>
    </div>
  );
};

export default AuthorCard;

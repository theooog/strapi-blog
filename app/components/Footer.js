import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const menuItems = [
    { title: "Home", link: "/" },
    { title: "Blogs", link: "/blogs" },
    { title: "About us", link: "/about" },
  ];
  return (
    <div className=" py-5 bg-black mt-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 container">
        <div>
          <Link href={"/"}>
            <Image
              src={"https://i.imgur.com/msqTdnJ.png"}
              width={150}
              height={100}
              alt={"Strapi Blog Logo"}
            />
          </Link>
        </div>
        <div className="lg:ml-auto">
          {menuItems.map((item) => {
            return (
              <Link href={item?.link}>
                <span className="text-white px-3">{item?.title}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Footer;

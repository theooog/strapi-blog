"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Hamburger from "../assets/Hamburger";
const NavigationBar = () => {
  const menuItems = [
    { title: "Home", link: "/" },
    { title: "Blogs", link: "/blogs" },
    { title: "About us", link: "/about" },
  ];
  const [menuOpen, setMenuOpen] = useState();
  return (
    <div className="py-5 border-b-2 border-grey" id="navbar">
      <div className="container flex flex-row gap-5">
        <Link href={"/"} className="flex-none">
          <Image
            src={"https://i.imgur.com/msqTdnJ.png"}
            width={150}
            height={100}
            alt={"Strapi Blog Logo"}
          />
        </Link>
        <Hamburger
          className="ml-auto md:hidden"
          role="button"
          onClick={() => setMenuOpen(true)}
        />
        <div className="ml-6 hidden md:block">
          {menuItems.map((item) => {
            return (
              <Link key={item?.link} href={item?.link}>
                <span>{item?.title}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/*MOBILE MENU*/}
      {menuOpen && (
        <div className="absolute left-0 top-0 bg-white w-full h-full p-10 z-50">
          <div className="flex flex-row">
            <Link href={"/"} className="flex-none">
              <Image
                src={"https://i.imgur.com/msqTdnJ.png"}
                width={150}
                height={100}
                alt={"Strapi Blog Logo"}
              />
            </Link>
            <span
              role="button"
              className="ml-auto"
              onClick={() => setMenuOpen(false)}
            >
              X
            </span>
          </div>
          <div className="ml-6 flex flex-col mt-10 gap-6">
            {menuItems.map((item) => {
              return (
                <Link href={item?.link}>
                  <span>{item?.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavigationBar;

"use client";
import Cookies from "js-cookie";
import Loading from "../../../components/Loading/Loading";
import { useEffect } from "react";

const page = ({ searchParams }) => {
  useEffect(() => {
    if (searchParams?.code) {
      Cookies.set("googleAuth", searchParams?.code);
    }
  }, []);

  useEffect(() => {
    if (Cookies.get("googleAuth")) {
      window.location.replace("/youtube");
    }
  }, [Cookies.get("googleAuth")]);

  return (
    <div>
      <Loading height={8} width={8} />
    </div>
  );
};

export default page;

"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Pagination = ({ total, page, pageSize }) => {
  const firstIndex = Math.max((page - 1) * pageSize + 1, 1);
  const secondIndex = Math.min(page * pageSize, total);
  const router = useRouter();

  return (
    <div className="flex flex-col items-center">
      <span className="text-sm text-gray-700 dark:text-gray-400">
        Showing{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {firstIndex}
        </span>{" "}
        to{" "}
        <span class="font-semibold text-gray-900 dark:text-white">
          {secondIndex}
        </span>{" "}
        of{" "}
        <span class="font-semibold text-gray-900 dark:text-white">{total}</span>{" "}
        Articles
      </span>
      <div className="inline-flex mt-2 xs:mt-0">
        <button
          onClick={() => router.push(`?page=${parseInt(page) - 1}`)}
          disabled={firstIndex <= 1}
          className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Prev
        </button>
        <button
          onClick={() => router.push(`?page=${parseInt(page) + 1}`)}
          disabled={secondIndex >= total}
          className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;

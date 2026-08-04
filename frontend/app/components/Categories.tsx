"use client";

import { useState } from "react";
import Image from "next/image";

const categories = [
  { key: "beach", label: "Beach" },
  { key: "villas", label: "Villas" },
  { key: "cabins", label: "Cabins" },
  { key: "tiny_homes", label: "Tiny homes" },
];

const Categories = () => {
  const [category, setCategory] = useState("beach");

  return (
    <div className="pt-3 cursor-pointer pb-6 flex items-center space-x-12">
      {categories.map((item) => (
        <div
          key={item.key}
          onClick={() => setCategory(item.key)}
          className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
            category === item.key ? "border-black" : "border-white"
          } opacity-60 hover:border-gray-200 hover:opacity-100`}
        >
          <Image
            src="/icn_category_beach.jpeg"
            alt={`Category - ${item.label}`}
            width={20}
            height={20}
          />
          <span className="text-xs">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Categories;

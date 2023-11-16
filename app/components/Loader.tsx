"use client";
import React from "react";
import { CircleLoader } from "react-spinners";
const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
      <CircleLoader color="#36d7b7" size={100} />
    </div>
  );
};

export default Loader;

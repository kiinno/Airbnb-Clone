"use client";
import Image from "next/image";
import React from "react";

interface AvatarProps {
  src?: string | null | undefined;
  large?: boolean;
}
const Avatar: React.FC<AvatarProps> = ({ src, large }) => {
  return (
    <Image
      className="rounded-full"
      height={large ? 57 : 30}
      width={large ? 57 : 30}
      alt="avatar"
      src={src ?? "/images/placeholder.jpg"}
    />
  );
};

export default Avatar;

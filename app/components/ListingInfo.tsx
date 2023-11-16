"use client";
import { User } from "@prisma/client";
import React from "react";
import { IconType } from "react-icons";
import useCountries from "../hooks/useCountries";
import Avatar from "./Avatar";
import ListingCategory from "./Listings/ListingCategory";
import dynamic from "next/dynamic";

interface ListingInfoProps {
  user: User;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  bathroomCount,
  category,
  description,
  roomCount,
  guestCount,
  locationValue,
  user,
}) => {
  const { getByValue } = useCountries();
  const Map = dynamic(() => import("../components/Map"), { ssr: false });
  const coordinates = getByValue(locationValue)?.latlng;
  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <Avatar src={user?.image} large />
          <div>
            <p>{user?.name}</p>
            <p className="text-sm font-light text-gray-600">{user?.email}</p>
          </div>
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div className="">{guestCount} guests</div>
          <div className="">{roomCount} rooms</div>
          <div className="">{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;

"use client";
import { Listing, Reservation, User } from "@prisma/client";
import React, { useCallback, useState } from "react";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/Listings/ListingCard";

interface PropertiesClientProps {
  currentUser: User;
  listings: Listing[];
}
const PropertiesClient: React.FC<PropertiesClientProps> = ({
  currentUser,
  listings,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/listings/${id}`)
        .then((response) => {
          toast.success("Listing deleted");
          router.refresh();
        })
        .catch((error: any) => {
          toast.error(
            error?.response?.data?.error ||
              error.message ||
              "Something went wrong."
          );
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Properties" subtitle="List of your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xlg:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onCancel}
            disabled={deletingId === listing.id}
            actionLabel="Delete property"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;

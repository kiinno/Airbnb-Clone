import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import EmptyState from "@/app/components/EmptyState";
import React from "react";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";

interface IParams {
  listingId?: string;
}

const ListingDetailsPage = async ({ params }: { params: IParams }) => {
  const currentUser = await getCurrentUser();
  const reservation = await getReservations(params);
  const listing = await getListingById(params);

  if (!listing) return <EmptyState />;

  return (
    <>
      <ListingClient
        listing={listing}
        currentUser={currentUser}
        reservations={reservation}
      />
    </>
  );
};

export default ListingDetailsPage;

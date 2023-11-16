import React from "react";
import getCurrentUser from "../actions/getCurrentUser";
import EmptyState from "../components/EmptyState";
import getListings from "../actions/getListings";
import PropertiesClient from "./PropertiesClient";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser)
    return <EmptyState title="Unauthorized" subtitle="Please login" />;

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0)
    return (
      <EmptyState
        title="No properties found"
        subtitle="Looks like have no properties"
      />
    );

  return (
    <>
      <PropertiesClient listings={listings} currentUser={currentUser} />
    </>
  );
};

export default TripsPage;

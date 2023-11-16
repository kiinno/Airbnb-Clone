import React from "react";
import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getFavoritesListings from "../actions/getFavoritesListings";
import FavoriteClient from "./FavoriteClient";

const FavoritesPage = async () => {
  const listings = await getFavoritesListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0)
    return (
      <EmptyState
        title="No favorites found"
        subtitle="looks like you have no favorite listings"
      />
    );

  return <FavoriteClient listings={listings} currentUser={currentUser} />;
};

export default FavoritesPage;

import { Listing, User } from "@prisma/client";
import React from "react";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/Listings/ListingCard";

interface FavoriteClientProps {
  currentUser?: User | null;
  listings: Listing[];
}
const FavoriteClient: React.FC<FavoriteClientProps> = ({
  currentUser,
  listings,
}) => {
  return (
    <Container>
      <Heading
        title="Favorites"
        subtitle="List of places you have favorited!"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-8">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            currentUser={currentUser}
            data={listing}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoriteClient;

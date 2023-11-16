"use client";

import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import toast from "react-hot-toast";

import Heading from "../components/Heading";
import ListingCard from "../components/Listings/ListingCard";
import Container from "../components/Container";
import { Listing, Reservation, User } from "@prisma/client";

interface ReservationsClientProps {
  reservations: (Reservation & { listing: Listing })[];
  currentUser: User;
}
const ReservationsClient: React.FC<ReservationsClientProps> = ({
  currentUser,
  reservations,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    async (id: string) => {
      try {
        setDeletingId(id);
        const res = await axios.delete(`/api/reservations/${id}`);
        toast.success("Reservation cancelled");
        router.refresh();
      } catch (error: any) {
        toast.error("Something went wrong.");
      } finally {
        setDeletingId("");
      }
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Reservations" subtitle="Bookings on your properties" />

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel guest reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationsClient;

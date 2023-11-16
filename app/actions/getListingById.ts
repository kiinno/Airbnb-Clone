import { Listing, User } from "@prisma/client";
import prisma from "../libs/prismadb";

interface IParams {
  listingId?: string;
}

export default async function getListingById(
  params: IParams
): Promise<(Listing & { user: User }) | null> {
  try {
    const { listingId } = params;
    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
      include: {
        user: true,
      },
    });

    if (!listing) return null;

    return listing;
  } catch (error: any) {
    throw new Error(error);
  }
}

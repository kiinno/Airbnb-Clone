import { Nunito } from "@next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import RegisterModal from "./components/Modals/RegisterModal";
import LoginModal from "./components/Modals/LoginModal";
import ToasterProvider from "./providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./components/Modals/RentModal";
import SearchModal from "./components/Modals/SearchModal";

const font = Nunito({
  subsets: ["latin"],
});

export const metadata = {
  title: "Airbnb",
  description:
    "Airbnb-Clone Using Next.JS TailwindCSS Prisma MongoDB - NextAuth, Fully Responsive And Compatible with All Devices (Mobile, Tablet, LG & XLG Or Above)",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <SearchModal />
        <RentModal />
        <ToasterProvider />
        <RegisterModal />
        <LoginModal />
        <Navbar currentUser={currentUser} />
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}

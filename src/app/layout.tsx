import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { getServerSession } from "next-auth";
import AuthProvider from "@/utilis/SessionProvider";
import Footer from "@/components/footer/Footer";
import { NavbarProvider } from "@/lib/Context/NavContext";
import { ListingProvider } from "@/lib/Context/ListingContext";

const inter = Rubik({ subsets: ["latin"], weight:['400'] });

export const metadata: Metadata = {
  title: {
    default: "CampusEase",
    template: "%s - CampusEase"
  },
  description: "Find Comfort with campusEase Discover Accommodation, Services, MarketPlace and Roommate within your campus - All in One Place!",
  keywords: [
    "CampusEase",
    "student housing Nigeria",
    "student hostel",
    "campus services",
    "university services",
    "roommates",
    "college roommates",
    "university roommates",
    "sell on campus",
    "student marketplace",
    "university marketplace",
    "university classifieds",
    "student tech Nigeria",
    "student listings",
  ],
  openGraph: {
    title: "CampusEase",
    description: "Find Comfort with campusEase Discover Accommodation, Services, MarketPLace and Roommate within your campus - All in One Place!",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    type: 'website',
    // edit this
    // images: [
    //   {
    //     url: "https://campusease.com/new-cover-image.jpg", // Replace with your actual image URL
    //     width: 1200,
    //     height: 900,
    //     alt: "CampusEase platform preview"
    //   }
    // ]
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession();
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className }>
        <>
        <NavbarProvider>
          <AuthProvider session={session} >
            <ListingProvider>
              <Navbar/>
              {children}
              <Footer/>
            </ListingProvider>
          </AuthProvider>
        </NavbarProvider>
        </>
        </body>
    </html>
  );
}

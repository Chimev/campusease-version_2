import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { getServerSession } from "next-auth";
import AuthProvider from "@/utilis/SessionProvider";
import Footer from "@/components/footer/Footer";
import { NavbarProvider } from "@/lib/Context/NavContext";

const inter = Rubik({ subsets: ["latin"], weight:['400'] });

export const metadata: Metadata = {
  title: {
    default: "CampusEase",
    template: "%s - CampusEase"
  },
  description: "Find Comfort with campusEase Discover Accommodation, Services, MarketPlace and Roommate within your campus - All in One Place!",
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
    <html lang="en">
      <body className={inter.className }>
        <>
        <NavbarProvider>
          <AuthProvider session={session} >
            <Navbar/>
            {children}
            <Footer/>
          </AuthProvider>
        </NavbarProvider>
        </>
        </body>
    </html>
  );
}

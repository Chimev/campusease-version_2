import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "@/app/globals.css";
import { getServerSession } from "next-auth";
import AuthProvider from "@/utilis/SessionProvider";
import { ListingProvider } from "@/lib/Context/ListingContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession();
  return (
        <>
        <AuthProvider session={session} >
          <ListingProvider>
            <Navbar/>
            {children}
            <Footer/>
          </ListingProvider>
        </AuthProvider>
        </>
  );
}

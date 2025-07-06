
'use client';

import { SchoolContextProvider } from "@/lib/Context/SchoolContext";



export default function SchoolLayout({ children }: { children: React.ReactNode }) {
  return <SchoolContextProvider>{children}</SchoolContextProvider>;
}

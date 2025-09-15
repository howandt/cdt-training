import { ClerkProvider } from "@clerk/nextjs";
import { UserProvider } from "./contexts/UserContext";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CDT Training Platform",
  description: "Personlig træningsplatform til specialpædagogik",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <UserProvider>
        <html lang="da">
          <head />
          <body className="bg-gray-50 text-gray-900 min-h-screen">
            <div className="max-w-4xl mx-auto p-4">
              {children}
            </div>
          </body>
        </html>
      </UserProvider>
    </ClerkProvider>
  );
}

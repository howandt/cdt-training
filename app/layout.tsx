import { ClerkProvider } from "@clerk/nextjs";
import { UserProvider } from "@/contexts/UserContext";
import "./globals.css";

export const metadata = {
  title: "CDT Training Platform",
  description: "Personlig træningsplatform til specialpædagogik",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <UserProvider>
        <html lang="da">
          <body>{children}</body>
        </html>
      </UserProvider>
    </ClerkProvider>
  );
}

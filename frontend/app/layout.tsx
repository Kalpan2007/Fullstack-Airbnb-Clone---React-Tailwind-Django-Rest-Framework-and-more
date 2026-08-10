import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import LoginModal from "./components/modals/LoginModal";
import SignupModal from "./components/modals/SignupModal";
import AddPropertyModal from "./components/modals/AddPropertyModal";

export const metadata: Metadata = {
  title: "DjangoBnb",
  description: "DjangoBnb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />

        <div className="pt-[100px]">{children}</div>

        <LoginModal />
        <SignupModal />
        <AddPropertyModal />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ModalProvider } from "@/components/common/ContactModal";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HopeAlive Foundation - Non-Profit & Humanitarian Aid",
  description: "HopeAlive is a global non-profit organization dedicated to empowering vulnerable children, supporting families, and uplifting communities through education, healthcare, and humanitarian aid.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${roboto.variable} ${poppins.className} font-sans h-full antialiased`}
    >
      <body className={`min-h-full flex flex-col font-sans ${poppins.className}`}>
        <ModalProvider>
          <Navbar />
          {children}
          <Footer />
        </ModalProvider>
      </body>
    </html>
  );
}

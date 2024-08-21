import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "New MinTax",
  description: "Audit Company",  
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <Header />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

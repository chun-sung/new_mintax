import { Inter, Advent_Pro } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Providers } from '../redux/provider'


const inter = Inter({ subsets: ["latin"] });
const advent_Pro = Advent_Pro({ 
  weight: ['400', '700'],
  subsets: ["latin"]
});

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
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <Header />
            {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

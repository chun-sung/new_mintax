import { Inter, Advent_Pro } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Providers } from '../redux/provider'
import { cookies } from 'next/dist/client/components/headers'

const inter = Inter({ subsets: ["latin"] });
const advent_Pro = Advent_Pro({ 
  weight: ['400', '700'],
  subsets: ["latin"]
});

// console.log(mode?.value)

/** @type {import("next").Viewport} */
export const viewport = {
  themeColor: 'black',
}

export const metadata = {
  title: "n-MinTax",
  description: "Audit Company",  
};

export default function RootLayout({ children }) {
  
  let mode = cookies().get('mode') 

  return (
    <html lang="ko">            
      <link rel="icon" href="/favicon.ico" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content={`${ mode?.value == undefined || mode?.value == 'lightMode' ? '#ffffff' : '#000000' }`} />

      <body className={`relative ${inter.className} ${ mode?.value == undefined || mode?.value == 'lightMode' ? 'lightMode' : 'darkMode' }`}>        
        <Providers>
          <Header />          
            {children}          
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

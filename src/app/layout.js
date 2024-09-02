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

export const metadata = {
  title: "n-MinTax",
  description: "Audit Company",
};

export default function RootLayout({ children }) {
  
  let mode = cookies().get('mode') 
  // 다크모드를 위해서 아래 <head> 태그를 사용해야 쿠키값이 바로 적용 된다.
  
  return (
    <html lang="ko">
      <head> 
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content={`${ mode?.value == undefined || mode?.value == 'lightMode' ? '#ffffff' : '#000000' }`} />
      </head>
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

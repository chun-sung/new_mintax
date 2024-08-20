import Image from "next/image";
import { db } from '@vercel/postgres'
import Header from "../../components/Header";

export default async function Home() {
  const data = await db`SELECT * FROM users`;
  let { rows }  =  data 
  console.log(rows[0].name);

  return (
    <main className="">
    
    </main>
  );
}

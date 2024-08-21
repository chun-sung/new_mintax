import Image from "next/image";
import { db } from '@vercel/postgres'


export default async function Home() {
  const data = await db`SELECT * FROM users`;
  let { rows }  =  data 
  console.log(rows[0].name);

  return (
    <main className="" style={{"height": "550px"}}>
      <div className="hover:bg-red-200 border-4 border-red-400 w-[300px] h-[100px] bg-blue-300 text-center pt-8 mt-10 ml-5">테스트 박스<br /><p className="text-yellow-100 font-bold">{rows[0].name}</p></div>
    </main>
  );
}

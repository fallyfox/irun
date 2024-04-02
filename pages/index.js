import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { Merriweather } from "next/font/google";
import { FaArrowRight } from "react-icons/fa";
import { Card,CardActions,CardContent,CardMedia,Typography,Button } from "@mui/material";

const MerriReg900 = Merriweather({
  subsets:['latin'],
  display:'swap',
  weight:'900'
});

export default function Index() {
  return (
    <>
      <Head>
        <title>Irun | Shop for hairs with fixes</title>
      </Head>

      <main className="h-screen">
        <div className="h-full w-full hidden lg:flex justify-center items-center bg-desktop">
          <div className="h-full w-full bg-[#402B3A]/50 flex justify-center items-center">
            <div className="w-full md:w-[520px] flex flex-col items-center gap-6 px-4 md:px-0">
              <h1 className={`${MerriReg900.className} text-4xl lg:text-6xl text-center text-[#F8F4EC]`}>Shop for hairs and book an appoint for a fix</h1>
              <Link 
              href='/auth/signup' 
              className="h-[48px] w-full md:w-[300px] flex justify-center items-center gap-4 bg-[#402B3A] text-[#F8F4EC] text-2xl px-4 rounded-md">
                <span>Get Started</span>
                <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>

        <div className="h-full w-full lg:hidden justify-center items-center bg-mobile">
          <div className="h-full w-full bg-[#402B3A]/50 flex justify-center items-center">
            <div className="w-full md:w-[520px] flex flex-col items-center gap-6 px-4 md:px-0">
              <h1 className={`${MerriReg900.className} text-4xl lg:text-6xl text-center text-[#F8F4EC]`}>Shop for hairs and book an appoint for a fix</h1>
              <Link 
              href='/auth/signup' 
              className="h-[48px] w-full md:w-[300px] flex justify-center items-center gap-4 bg-[#402B3A] text-[#F8F4EC] text-2xl px-4 rounded-md">
                <span>Get Started</span>
                <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
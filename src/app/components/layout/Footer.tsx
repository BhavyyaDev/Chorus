"use client";

import { BsInstagram } from "react-icons/bs";
import { IoIosMail } from "react-icons/io";
import Image from 'next/image';
import ToLoud from "./TOOLOUD";

export default function Footer() {


  return (
    <footer
      className="relative w-full bg-cover bg-gray-50  bg-center min-h-[100px] md:!min-h-[200px] lg:!min-h-[400px] xl:!min-h-[400px]"
      style={{
        backgroundImage: "url('BgpatternBlack.png')"
      }}
    >


      <div className="bottom-bar text-white absolute top-0 left-0 w-full py-[100px] md:py-[200px] px-10 bg-gradient-to-b from-black to-transparent"></div>
      <div className="container mx-auto px-0  md:px-5 py-5  pb-0 overflow-hidden
      min-h-[250px] md:!min-h-[200px] lg:!min-h-[400px] xl:!min-h-[500px]">

        <div className="flex w-full justify-between px-1 md:px-10">
          <div className="grid grid-cols-2 gap-8 text-white  mt-1 z-[9]">
            <div className="col-span-1">
              <h4 className="font-bold mb-1 md:mb-4 text-white  md:text-[18px]">LEGAL</h4>
              <ul className="space-y-0 md:space-y-1">
                <li><a href="/privacypolicy" className="hover:text-white  text-[10px] md:text-[16px]">PRIVACY POLICY</a></li>
                <li><a href="/termsandconditions" className="hover:text-white  text-[10px] md:text-[16px]">TERMS & CONDITIONS</a></li>
                <li><a href="/cancellationsandrefunds" className="hover:text-white  text-[10px] md:text-[16px]">CANCELLATIONS & REFUNDS</a></li>
              </ul>
            </div>

            <div className="col-span-1">
              <h4 className="font-bold mb-1 md:mb-4 text-white  md:text-[18px]">SUPPORT</h4>
              <ul className="space-y-0 md:space-y-1">
                <li><a href="/contactus" className="hover:text-white  text-[10px] md:text-[16px]">CONTACT US</a></li>
                <li><a href="/shippingpolicy" className="hover:text-white  text-[10px] md:text-[16px]">SHIPPING POLICY</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center z-[9]">
            <Image src="/icons/chorusWhite.svg" alt="Chorus Logo" width={160} height={60} className="w-24 md:w-40" />
            <ul className="flex gap-2 cursor-pointer">
              <li onClick={() => (
                window.open('https://www.instagram.com/chorus_in/')
              )}>
                <BsInstagram color="white" />
              </li>
              <li
              onClick={() => (
                window.open('mailto:team@chorus.co.in')
              )}
              className="cursor-pointer -mt-0.5"
              >
                <IoIosMail color="white" size={20} />
              </li>
            </ul>
          </div>
        </div>

        <ToLoud />



      </div>
      <div className="min-w-[100vw] bg-black border-black">
        <p className="text-gray-400 p-3 text-center text-[14px]">© 2025  cHORUS. All rigHts reserved.</p>
      </div>
    </footer>
  )
}
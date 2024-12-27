
import React from 'react';
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { FaSquareThreads } from "react-icons/fa6";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white px-32 py-16 font-open_sans">
      <div className="grid grid-cols-12 space-x-10">
        <div className='col-span-3'>
          <h2 className="text-base mb-3 text-gray-500">CAT ADOPTION FOUNDATION INC</h2>
          <p className='text-gray-400 text-sm'>Office address:</p>
          <p className='text-gray-400 text-sm'>PO Box 143 Dernancourt</p>
          <p className='text-gray-400 text-sm'>SA 5075</p>
          <p className='text-gray-400 text-sm'>(Please note we do not have a shelter location, we’re a foster care network only)</p>
        </div>
        <div className='col-span-3'>
          <h2 className="text-base mb-3 text-gray-500">CONTACT US</h2>
          <p className='text-gray-400 text-sm'>Phone: 0404 032 650</p>
          <p className='text-gray-400 text-sm'>Email: info@cafinc.org.au</p>
        </div>
        <div className='col-span-3'>
          <h2 className="text-base mb-3 text-gray-500">DIRECT DONATION</h2>
          <p className='text-gray-400 text-sm'>Account name: Cat Adoption Foundation</p>
          <p className='text-gray-400 text-sm'>BSB: 065 145  Account: 10459071</p>
          <p className='text-gray-400 text-sm'>PayPal: info@cafinc.org.au</p>
        </div>
        <div className='col-span-3'>
          <h2 className="text-base mb-3 text-gray-500">CONNECT WITH US</h2>
          <div className="flex space-x-7">
            <a href="#"><FaFacebookSquare /></a>
            <a href="#"><FaInstagramSquare /></a>
            <a href="#"><IoLogoYoutube /></a>
            <a href="#"><FaSquareThreads /></a>
          </div>
        </div>
      </div>
      <hr className="my-4 border-gray-600 mt-10" />
      <div className="mt-4 text-xs text-gray-500">
        © 2024 Cat Adoption Foundation Inc.
      </div>
    </footer>
  );
};

export default Footer;
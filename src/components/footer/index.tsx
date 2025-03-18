
import React from 'react';
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { FaSquareThreads } from "react-icons/fa6";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white px-32 py-16 font-open_sans">
      <div className="grid grid-cols-12 space-x-10">
        <div className='col-span-3 flex justify-center'>
          <img src="/images/logo2.png" alt="Logo" className="h-14 " />
        </div>
        <div className='col-span-3'>
          <p className='text-base mb-3 text-gray-300'>ĐỊA CHỈ</p>
          <p className='text-gray-400 text-sm'>Thành phố Hồ Chí Minh, Việt Nam</p>
          <p className='text-gray-400 text-sm'>(Xin lưu ý rằng chúng tôi không có địa chỉ tạm thời, chúng tôi chỉ là mạng lưới cung cấp tài liệu)</p>
        </div>
        <div className='col-span-3'>
          <h2 className="text-base mb-3 text-gray-300">LIÊN HỆ</h2>
          <p className='text-gray-400 text-sm'>Số điện thoại: 0918777437</p>
          <p className='text-gray-400 text-sm'>Email: edusource@gmail.com</p>
        </div>
        <div className="col-span-3 flex flex-col items-center">
          <h2 className="text-base mb-3 text-gray-300 text-center">THEO DÕI CHÚNG TÔI</h2>
          <div className="flex justify-between w-full max-w-[180px]">
            <a href="#"><FaFacebookSquare /></a>
            <a href="#"><FaInstagramSquare /></a>
            <a href="#"><IoLogoYoutube /></a>
            <a href="#"><FaSquareThreads /></a>
          </div>
        </div>
      </div>
      <hr className="my-4 border-gray-600 mt-10" />
      <div className="mt-4 text-sm text-gray-300">
        © Công ty The Dream, 2025
      </div>
    </footer>
  );
};

export default Footer;
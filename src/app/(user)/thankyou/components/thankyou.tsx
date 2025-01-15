'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from "@/components/ui/button"
import { GoArrowLeft } from "react-icons/go";

function Thankyou() {

    const router = useRouter()

    return (
        <div className="flex h-screen items-center justify-center">
            <div className='grid grid-cols-2 gap-4'>
                <div className='flex flex-col justify-around'>
                    <div className='space-y-3'>
                        <h4>Khám phá những điều kỳ diệu của không gian với Edusource.</h4>
                        <h1 className="text-8xl font-pacifico">Cảm Ơn</h1>
                        <p className='font-bold text-2xl'>Vì đã sử dụng website của chúng tôi!</p>
                    </div>
                    <div>
                        <Button className='bg-sky-500 hover:bg-sky-700' onClick={() => router.push('/')}> <GoArrowLeft/>Quay về trang chủ</Button>
                    </div>
                </div>
                <div className=''>
                    <img src="/images/heart-thankyou.webp" alt="" />
                </div>

            </div>
        </div>
    )
}

export default Thankyou

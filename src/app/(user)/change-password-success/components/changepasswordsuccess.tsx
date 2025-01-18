'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'
import { GoArrowLeft } from "react-icons/go";
function ChangePasswordSuccess() {
    const router = useRouter()
    return (
        <div className="flex h-screen items-center justify-center">
            <div>
                <div className="flex flex-col items-center space-y-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-28 w-28 text-green-600" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" strokeWidth="1">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h1 className="text-4xl font-bold">Password Changed !</h1>
                    <p>Thank you for your interest! Check your email for a link to the guide.</p>
                    <div>
                        <Button className='bg-sky-500 hover:bg-sky-700' onClick={() => router.push('/')}> <GoArrowLeft/>Quay về trang chủ</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePasswordSuccess

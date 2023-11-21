import Head from 'next/head'
import Sidebar from '../Components/Sidebar'
import Header from "../Components/Header"
import Container from '../Components/Container'
import { useState, useEffect } from 'react'
const customTheme = {
    default: {
        colors: {
            brand: "rgb(139 92 246)",
            brandAccent: "hsl(354deg 88% 36%)",
            brandButtonText: "white",
            inputBorder: "lightgray",
            inputPlaceholder: "rgb(107 114 128)",
            defaultButtonBorder: "white",
            // ..
        },
        fontSizes: {
            baseBodySize: "18px",
            baseInputSize: "18px",
            baseLabelSize: "18px",
            baseButtonSize: "22px",
        },
        space: {
            buttonPadding: "12px 10px",
            inputPadding: "16px 15px",
            labelBottomMargin: "4px",
            labelLeftMargin: "8px",
        },
        radii: {
            borderRadiusButton: "12px",
            buttonBorderRadius: "12px",
            inputBorderRadius: "12px",
        },
        fontWeights: {
            baseButtonWeight: "bold",
        },
    },
};
export default function Customer() {


    return (
    <div>
        <div className='flex bg-white text-black'>
            <div className='h-screen sticky top-0'>
                <Sidebar />
            </div>
            <div className=' w-full pr-2'>
            </div>
        </div>
            
        </div>
    )
}

import CustomerList from "../components/CustomerList"
import AdminSidebar from "../components/AdminSidebar"
import AdminContainer from "../components/AdminContainer"
import React, { useState, useEffect } from "react";
import axios from "axios";
export default function Admin() {
    const [emails, setEmails] = useState([])

    // useEffect(() => {
    //     const response = axios
    //   .get("http://127.0.0.1:5000/fetchUserData",  {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //       "Access-Control-Allow-Origin": "*",
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //     setEmails(res.data);
    //   });
    //   }, []);


    return (
        <div>
            <div className='flex bg-white text-black'>
                <div className='flex h-screen sticky top-0 border-r-2'>
                    <AdminSidebar />
                    <CustomerList/>
                </div>
                <div className=' w-full pr-2'>
                    <AdminContainer />
                </div>
            </div>
            all emails here
            {emails}
        </div>
    )
}

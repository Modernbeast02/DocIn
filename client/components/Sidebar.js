import React from 'react'
// import DonutLargeIcon from '@material-ui/icons/DonutLarge';
// import ClearAllIcon from '@material-ui/icons/ClearAll';
// import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
// import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
// import SyncAltIcon from '@material-ui/icons/SyncAlt';
// import LayersIcon from '@material-ui/icons/Layers';
// import LockIcon from '@material-ui/icons/Lock';
// import EcoIcon from '@material-ui/icons/Eco';
import SidebarTile from './SidebarTile';

const Sidebar = () => {
    return (
        <div className=" w-72 h-screen sticky top-0">
            <div className=" border-b  py-5 ml-4  ">
                <p className=" text-4xl font-bold">verifyMe</p>
                <h1 className="text-gray-400 py-2">Customer Dashboard</h1>
            </div>
            <div className="p-4 border-r-2">
                <div className="space-y-1" >
                    <SidebarTile title="Address Proof" />
                    <SidebarTile title="Bank Statement" />
                    <SidebarTile title="Business Proof" />
                    <SidebarTile title="Employement Proof" />
                    <SidebarTile title="Fund Raising" />
                    <SidebarTile title="Identity Proof" />
                    <SidebarTile title="Invoice" />
                    <SidebarTile title="Personal Finance Statement" />
                    <SidebarTile title="Power of attorney" />
                    <SidebarTile title="Receipt" />
                    <SidebarTile title="Salary Slip" />
                    <SidebarTile title="Tax Return" />
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  w-full ">
                        Upload Photo
                    </button>
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  w-full ">
                        Upload PDF
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Sidebar
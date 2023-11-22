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

const AdminSidebar = () => {
    return (
        <div className=" w-64 h-screen sticky top-0 border-r bg-white text-black">
            <div className=" border-b  py-5 flex ml-4 ">
                <p className=" text-4xl font-bold">DocIn</p>
            </div>
            <div className="p-4 space-y-14">
                <div className="space-y-4" >
                    <h1 className="text-gray-400">Admin Dashboard</h1>                
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
                                Verify Documents
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AdminSidebar
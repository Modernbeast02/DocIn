import React, { useState, useEffect } from "react";
// import DonutLargeIcon from '@material-ui/icons/DonutLarge';
// import ClearAllIcon from '@material-ui/icons/ClearAll';
// import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
// import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
// import SyncAltIcon from '@material-ui/icons/SyncAlt';
// import LayersIcon from '@material-ui/icons/Layers';
// import LockIcon from '@material-ui/icons/Lock';
// import EcoIcon from '@material-ui/icons/Eco';

const CustomerList = () => {
  const [emails, setEmails] = useState(["ankur@gmail.com", "yashita@gmail.com", "sparsh@gmail.com"]);
  return (
    <div className=" w-64 h-screen sticky top-0 overflow-y-auto">
      <div className=" border-b  py-10 flex ml-4 "></div>
      <div className="p-4 space-y-14">
        <div className="space-y-4">
          <h1 className="text-gray-400">List of Customers</h1>
          {emails.map((email) => (
            <div className="">
              <div className="flex p-3 text-gray-700  space-x-4 hover:text-blue-600  cursor-pointer  ">
                <p className=" ">{email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerList;

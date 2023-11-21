import React from 'react'
import Card from './Card'
// import Middle from './Middle'
// import RightBar from './RightBar'

const AdminContainer = () => {
    return (
        <div className=" bg-gradient-to-r  bg-white text-black" >
            <div className="  px-8 py-1 ">
                <p className="text-gray-500 text-lg">
                    Documents by
                </p>
                <p className="font-bold text-2xl transform -translate-y-2">
                    User Name
                </p>
            </div>
            <div className="flex p-4 mt-4 space-x-12 ml-40">
                <Card title="Document Name" balance="Document Type" icon={0} type="unchecked" />
                <Card title="Document Name" balance="Document Type" icon={1} type="valid" />
                <Card title="Document Name" balance="Document Type" icon={2} type="invalid" />
            </div>
            <div className="flex p-4 space-x-12 ml-40">
                <Card title="Document Name" balance="Document Type" icon={0} type="valid" />
                <Card title="Document Name" balance="Document Type" icon={1} type="invalid" />
                <Card title="Document Name" balance="Document Type" icon={2} type="unchecked" />
            </div>
            <div className="flex p-4 space-x-12 ml-40">
                <Card title="Document Name" balance="Document Type" icon={0} type="invalid" />
                <Card title="Document Name" balance="Document Type" icon={1} type="unchecked" />
                <Card title="Document Name" balance="Document Type" icon={2} type="valid" />
            </div>
            {/* <div className="flex  ml-3 mt-6 space-x-6  mr-4">
            </div> */}
        </div>
    )
}

export default AdminContainer
import Sidebar from "@/Components/Admin/Sidebar";
import { Link } from "@inertiajs/react";
import React, { useEffect, useState } from "react";


export default function Admin(props) {

    return (
        <React.Fragment>
            <div className="p-6">
                <Sidebar />
            </div>
        </React.Fragment>
    )
}
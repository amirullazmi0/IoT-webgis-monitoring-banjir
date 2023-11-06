import SectionAdmin from "@/Components/Admin/SectionAdmin";
import Sidebar from "@/Components/Admin/Sidebar";
import { Head, Link } from "@inertiajs/react";
import React, { useEffect, useState } from "react";


export default function Admin(props) {
    return (
        <React.Fragment>
            <Head title='Halaman Admin' />
            <div className="lg:p-6 p-2">
                <Sidebar active={`dashboard`} />
                <SectionAdmin props={props} />
            </div>
        </React.Fragment>
    )
}
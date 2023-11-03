import { Link } from "@inertiajs/react";
import React from "react";


export default function Welcome(props) {
    return (
        <React.Fragment>
            <div className="grid lg:grid-cols-2 h-screen w-full">
                <div className="flex justify-center items-center">
                    <div className="card lg:w-3/6 w-5/6 shadow-lg border">
                        <div className="card-body">
                            <div className="logo flex justify-center">
                                <img className="h-24" src="/img/logo.png" alt="" />
                            </div>
                            <div className="text-2xl font-bold text-center">
                                Login Admin
                            </div>
                            <div className="">
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" placeholder="masukan email" className="input input-sm input-bordered w-full " />
                                </div>
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" placeholder="masukan password" className="input input-sm input-bordered w-full " />
                                </div>
                            </div>
                            <div className="m-4">
                                <hr />
                            </div>
                            <div className="flex">
                                <button className="btn btn-accent w-full btn-sm text-white">Login</button>
                            </div>
                            <div className="flex items-center justify-center w-full">
                                <span>kembali ke dashboard </span>
                                <Link href="/" className="btn btn-accent btn-sm m-2 text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="lg:block hidden bg-indigo-300 ...">
                    <img className="object-cover h-full" src="/img/bg-login.jpg" alt="" />
                </div>
            </div>
        </React.Fragment>
    )
}
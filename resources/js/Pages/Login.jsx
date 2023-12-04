import { Head, Link, router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";


export default function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = () => {
        const data = {
            email, password
        }
        router.post(`/login`, data)
        setEmail('')
        setPassword('')
    }
    return (
        <React.Fragment>
            <Head title='Halaman Login' />
            <div className="grid lg:grid-cols-2 h-screen w-full">
                <div className="flex justify-center items-center">
                    <div className="card lg:w-3/6 w-5/6 shadow-lg border">
                        <div className="card-body">
                            {props.errors.email || props.errors.password ?
                                <React.Fragment>
                                    <div className="alert">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-error shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        <span>Periksa Kembali Email dan Password</span>
                                    </div>
                                </React.Fragment>
                                :
                                null
                            }
                            <div className="logo flex justify-center">
                                <img className="lg:h-20 h-16" src="/img/logo2.png" alt="" />
                            </div>
                            <div className="text-2xl font-bold text-center">
                                Login Admin
                            </div>
                            <div className="">
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Masukan email" className="input input-accent input-bordered w-full " />
                                </div>
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Masukan password" className="input input-accent input-bordered w-full " />
                                </div>
                            </div>
                            <div className="m-4">
                                <hr />
                            </div>
                            <div className="flex">
                                <button onClick={() => handleLogin()} className="btn btn-accent w-full btn-sm text-white">Login</button>
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
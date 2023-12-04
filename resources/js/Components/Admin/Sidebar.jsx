import { router } from '@inertiajs/react'
import React from 'react'

const Sidebar = ({ active }) => {
    const handleLogout = () => {
        router.post(`/logout`)
    }

    const handleNavigasi = (e) => {
        router.get(e)
    }


    return (
        <div className="navbar bg-white rounded-lg shadow-xl p-4 flex items-center">
            <div className="w-8 rounded">
                <img src="/img/logo2.png" />
            </div>
            <div className="navbar-start flex items-center">
                <ul className='ml-4 gap-4 flex'>
                    <li>
                        <div className={`bg-accent p-2 shadow-md rounded-lg text-white flex`}>
                            Dashboard Admin
                        </div>
                    </li>
                </ul>
            </div>

            <div className="navbar-end">
                <button className='btn btn-circle btn-warning' onClick={() => handleLogout()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default Sidebar
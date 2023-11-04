import React from 'react'

const Sidebar = () => {
    return (
        <div className="navbar bg-white rounded-lg shadow-xl p-4">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52">
                        <li><button>Dashboard</button></li>
                        <li><button>Data</button></li>
                        <li><button>Koordinat</button></li>
                    </ul>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><button>Dashboard</button></li>
                    <li><button>Data</button></li>
                    <li><button>Koordinat</button></li>
                </ul>
            </div>
            <div className="navbar-end">
                <div className="w-8 rounded">
                    <img src="/img/logo.png" />
                </div>
            </div>
        </div>
    )
}

export default Sidebar
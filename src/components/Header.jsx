import React from 'react'
import Link from 'next/link'

function Header() {
    return (
        <div className="z-10 flex flex-row justify-between items-center sticky top-0 bg-blue-900 border-b border-solid border-white/5">
            <div className="flex justify-between items-center w-full px-[2.25em]">
                <div className="flex py-3 lg:py-5 justify-center items-center">
                    <Link className="text-xl lg:text-2xl cursor-pointer text-white truncate" href="/">
                        <span className="sm:hidden">
                            D<span className="text-blue-500">F</span>
                        </span>
                        <span className="hidden sm:inline-flex">
                            Double <span className="text-blue-500">Fun</span>
                        </span>
                    </Link>
                </div>
                <Link className="cursor-pointer text-white truncate" href="/quotes">
                    Quotes
                </Link>
            </div>
        </div>
    )
}

export default Header

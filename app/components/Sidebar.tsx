"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"
// create wallet
// request airdrop
// send money
// wallets
const Sidebar = () => {
    const path = usePathname()

    return (
        <nav className="bg-slate-500 h-screen min-w-[200px] flex flex-col items-start p-10 justify-center gap-6">
            <Link href="/" className={clsx("group",
                path === "/" && "text-white",
            )}>
                Create Wallet
                <div className="h-1 w-0 bg-gradient-to-t from-indigo-500 to-slate-800 group-hover:w-full transition-all duration-500"></div>
            </Link>

            <Link href="/request-airdrop" className="group">
                Request Airdrop
                <div className="h-1 w-0 bg-gradient-to-t from-indigo-500 to-slate-800 group-hover:w-full transition-all duration-500"></div>

            </Link>

            <Link href="/send-money" className="group">
                Send Money
                <div className="h-1 w-0 bg-gradient-to-t from-indigo-500 to-slate-800 group-hover:w-full transition-all duration-500"></div>

            </Link>
            
        </nav>
    )
}

export default Sidebar
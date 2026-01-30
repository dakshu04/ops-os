import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const links = [
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
]


export default function Navbar() {
    return (
        <>
            <section className="flex flex-row text-[#808080] p-4 px-10 justify-between">
                <div className="font-bold text-2xl">OpsOs</div>
                <div className="flex gap-5 cursor-pointer">
                    {links.map((link) => (
                        <Link className="mx-2 text-gray-400 transition-colors hover:text-white hover:underline underline-offset-4 decoration-2" key={link.name} href={link.href}>{link.name}</Link>
                    ))}
                </div>
                <button className="text-slate-50 border-2 rounded-md px-5 cursor-pointer">
                    Log In
                </button>
            </section>
        </>
    )
}
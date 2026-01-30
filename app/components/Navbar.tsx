import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"




export default function Navbar() {
    return (
        <>
            <section className="flex flex-row text-[#808080] p-4 px-10 justify-between">
                <div className="font-bold text-2xl">OpsOs</div>
                <button className="text-slate-50 border-2 rounded-md px-5 py-2 cursor-pointer">
                    Log In
                </button>
            </section>
        </>
    )
}
'use client'
import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";

import { ArrowRight } from "lucide-react";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog"

const blurFadeVariant: Variants = {
    hidden: { filter: "blur(20px)", opacity: 0, y: 5 },
    visible: { 
        filter: "blur(0px)", 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    },
};

// Helper to split text into animated words
const AnimatedText = ({ text, className }: { text: string, className: string }) => (
    <span className="flex flex-wrap justify-center italic-none">
        {text.split(" ").map((word, i) => (
            <motion.span
                key={i}
                variants={blurFadeVariant}
                className={`inline-block ${className}`}
                style={{ whiteSpace: 'pre' }}
            >
                {word}{" "}
            </motion.span>
        ))}
    </span>
);

export default function Hero() {

    // Fixed variants to resolve TypeScript index errors
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15, // Delay between each word
            }
        }
    };

    return (
        <section className="flex flex-col items-center justify-center mt-10 bg-black text-center px-4 overflow-hidden">
            <motion.div 
                className="max-w-6xl flex flex-col items-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                
                {/* Line 1: Ultra Thin and Dimmed */}
                <AnimatedText 
                    text="The engine" 
                    className="text-6xl md:text-6xl font-extralight tracking-tighter text-white/20" 
                />
                
                {/* Line 2: Thin and Slightly Brighter */}
                <div className="-mt-2 md:-mt-8">
                    <AnimatedText 
                        text="of autonomous" 
                        className="leading-none text-5xl md:text-9xl font-light tracking-tighter text-white/30" 
                    />
                </div>
                
                {/* Line 3: The Focus Point - Massive and Bold */}
                <motion.div 
                    variants={blurFadeVariant} 
                    className="flex items-center justify-center leading-[0.75] -mt-1 md:-mt-4"
                >
                    <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-white flex items-center gap-4">
                        is human + 
                        <span className="relative">
                            <span className="text-[#2739c1] drop-shadow-[0_0_35px_rgba(39,193,138,0.6)]">✦</span>
                            Agents
                        </span>
                    </h2>
                </motion.div>

                {/* Refined Subtext */}
                <div className="mt-4 max-w-2xl">
                    <AnimatedText 
                        text="Deploying AI Agents to build and automate full-stack architecture with OpsOs" 
                        className="text-gray-500 text-base md:text-lg opacity-80" 
                    />
                </div>

                {/* Button */}
                {/* <HeroButton /> */}
                <motion.div
                    variants={blurFadeVariant} >
                    <Button variant="outline"
                    size="lg"
                    className="py-1 mt-6 cursor-pointer">
                        Get Started 
                        <motion.span
                            initial={{ x: 0 }}
                            whileHover={{ x: 5 }} // Slides 5px to the right
                            transition={{ type: "spring", stiffness: 100, damping: 25 }}
                            ><ArrowRight className="size-4"/></motion.span>
                        
                    </Button>
                    </motion.div>
                    <HeroVideoDialog
                        className="block dark:hidden w-full max-w-4xl mt-10 border-5 rounded-xl shadow-lg"
                        animationStyle="from-center"
                        videoSrc="https://www.youtube.com/embed/6pXsdCxy2Oo?si=eHk8EWgWzrVt1IDU"
                        thumbnailSrc="https://img.youtube.com/vi/6pXsdCxy2Oo/maxresdefault.jpg"
                        thumbnailAlt="Dummy Video Thumbnail"
                    />
            </motion.div>
        </section>
    )
}
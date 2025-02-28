"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { WalletConnect } from "@/components/wallet-connect"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronRight, ExternalLink, Shield, Zap, BarChart3, Lock } from "lucide-react"

export function LandingPage() {
  const router = useRouter()
  const [isConnected, setIsConnected] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Track mouse position for dynamic lighting effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Handle wallet connection and navigation
  const handleStartRestaking = async () => {
    if (!isConnected) {
      // If not connected, connect wallet first
      setIsConnected(true)
    }
    // Navigate to dashboard
    router.push("/dashboard")
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Dynamic background gradients */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(76, 29, 149, 0.5) 0%, rgba(0, 0, 0, 0) 50%)`,
        }}
      />
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10" />

      {/* Animated grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />

      {/* Glowing orbs */}
      <div className="absolute left-[10%] top-[20%] h-64 w-64 rounded-full bg-purple-600/20 blur-[100px]" />
      <div className="absolute right-[15%] top-[60%] h-72 w-72 rounded-full bg-cyan-500/20 blur-[100px]" />
      <div className="absolute bottom-[10%] left-[30%] h-80 w-80 rounded-full bg-blue-600/20 blur-[100px]" />

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-black/50 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-purple-600 to-cyan-400">
              <div className="absolute inset-0.5 rounded-full bg-black" />
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-purple-500 to-cyan-300" />
            </div>
            <span className="text-xl font-bold tracking-tight">RestakeX</span>
          </div>

          <nav className="hidden md:block">
            <ul className="flex gap-8">
              {["Features", "Protocols", "Security", "Docs"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm font-medium text-white/70 transition-colors hover:text-white">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <WalletConnect isConnected={isConnected} onConnect={() => setIsConnected(true)} />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2 md:gap-8">
            <div className="flex flex-col justify-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h1 className="mb-6 bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-5xl lg:text-6xl">
                  Maximize Your Yield with Multi-Protocol Restaking
                </h1>
                <p className="mb-8 max-w-md text-lg text-white/70">
                  Stake your assets across multiple protocols simultaneously to earn compounded rewards while
                  maintaining network security.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button
                    size="lg"
                    className="group bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:from-purple-700 hover:to-cyan-600"
                    onClick={handleStartRestaking}
                  >
                    Start Restaking
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    Learn More
                  </Button>
                </div>
              </motion.div>
            </div>

            <div className="relative flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                {/* 3D-like token visualization */}
                <div className="relative h-[400px] w-[400px]">
                  <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-500/30 bg-gradient-to-b from-purple-900/20 to-transparent shadow-[0_0_30px_rgba(168,85,247,0.3)]" />

                  <div className="absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 animate-[spin_30s_linear_infinite] rounded-full border border-cyan-500/20" />

                  <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 animate-[spin_40s_linear_infinite_reverse] rounded-full border border-blue-500/20" />

                  {/* Protocol nodes */}
                  {[0, 72, 144, 216, 288].map((angle, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-purple-600 to-cyan-600 p-0.5 shadow-lg"
                      style={{
                        transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-120px) rotate(-${angle}deg)`,
                      }}
                    >
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-black/80 text-white">
                        <Image
                          src={`/placeholder.svg?height=30&width=30`}
                          alt="Protocol"
                          width={30}
                          height={30}
                          className="rounded-full"
                        />
                      </div>
                    </motion.div>
                  ))}

                  {/* Center token */}
                  <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 p-1 shadow-[0_0_30px_rgba(168,85,247,0.5)]">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-black/80 text-white">
                      <span className="text-xl font-bold">ETH</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { label: "Total Value Locked", value: "$1.2B+" },
              { label: "Active Stakers", value: "45,000+" },
              { label: "Supported Protocols", value: "12" },
              { label: "Average APY", value: "12.4%" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-6 backdrop-blur-sm"
              >
                <p className="mb-1 text-sm text-white/60">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl">
              Advanced Restaking Features
            </h2>
            <p className="mx-auto max-w-2xl text-white/70">
              Our platform offers cutting-edge technology to maximize your staking rewards while maintaining security
              and flexibility.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <Zap className="h-6 w-6" />,
                title: "Multi-Protocol Staking",
                description: "Stake your assets across multiple protocols simultaneously to maximize returns.",
              },
              {
                icon: <Shield className="h-6 w-6" />,
                title: "Enhanced Security",
                description: "Advanced security measures to protect your assets with multi-signature validation.",
              },
              {
                icon: <BarChart3 className="h-6 w-6" />,
                title: "Real-time Analytics",
                description: "Track your rewards and performance with detailed analytics and reporting.",
              },
              {
                icon: <Lock className="h-6 w-6" />,
                title: "Non-custodial",
                description: "Maintain full control of your assets with our non-custodial staking solution.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="group rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6 transition-all duration-300 hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500 text-white">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Protocols Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl">
              Supported Protocols
            </h2>
            <p className="mx-auto max-w-2xl text-white/70">
              Stake your assets across the leading protocols in the ecosystem, all from a single interface.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6 transition-all duration-300 hover:border-purple-500/30 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]"
              >
                <div className="mb-3 h-12 w-12 overflow-hidden rounded-full bg-gradient-to-br from-purple-600/20 to-cyan-500/20 p-0.5">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-black">
                    <Image src={`/placeholder.svg?height=30&width=30`} alt="Protocol" width={30} height={30} />
                  </div>
                </div>
                <p className="text-center font-medium text-white">
                  {["EigenLayer", "Lido", "Rocket Pool", "Stride", "Jito", "Marinade"][i]}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              View All Protocols <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="overflow-hidden rounded-2xl border border-purple-500/20 bg-gradient-to-r from-purple-900/20 via-black to-cyan-900/20 shadow-[0_0_50px_rgba(168,85,247,0.2)]">
            <div className="grid gap-8 p-8 md:grid-cols-2 md:p-12">
              <div>
                <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
                  Ready to maximize your staking rewards?
                </h2>
                <p className="mb-6 text-white/70">
                  Join thousands of users who are already earning more with our advanced restaking platform.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:from-purple-700 hover:to-cyan-600"
                    onClick={handleStartRestaking}
                  >
                    Start Restaking Now
                  </Button>
                  <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    <ExternalLink className="mr-2 h-4 w-4" /> Read Documentation
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-60 w-60">
                  {/* Animated rings */}
                  <div className="absolute inset-0 animate-pulse rounded-full border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.3)]" />
                  <div className="absolute inset-4 animate-pulse rounded-full border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.3)]" />
                  <div className="absolute inset-8 animate-pulse rounded-full border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.3)]" />

                  {/* Center icon */}
                  <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-[0_0_30px_rgba(168,85,247,0.5)]">
                    <Zap className="h-10 w-10" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-black/50 py-12 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-purple-600 to-cyan-400">
                  <div className="absolute inset-0.5 rounded-full bg-black" />
                  <div className="absolute inset-2 rounded-full bg-gradient-to-br from-purple-500 to-cyan-300" />
                </div>
                <span className="text-xl font-bold tracking-tight">RestakeX</span>
              </div>
              <p className="mt-4 text-sm text-white/60">
                The next generation restaking platform for maximizing your crypto yield.
              </p>
            </div>

            {["Platform", "Resources", "Company"].map((category, i) => (
              <div key={i}>
                <h3 className="mb-4 font-medium text-white">{category}</h3>
                <ul className="space-y-2">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <li key={j}>
                      <Link href="#" className="text-sm text-white/60 transition-colors hover:text-white">
                        {
                          [
                            ["Features", "Protocols", "Security", "Pricing"],
                            ["Documentation", "API", "Guides", "Community"],
                            ["About", "Blog", "Careers", "Contact"],
                          ][i][j]
                        }
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/60 md:flex-row">
            <p>© {new Date().getFullYear()} RestakeX. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-white">
                Terms
              </Link>
              <Link href="#" className="hover:text-white">
                Privacy
              </Link>
              <Link href="#" className="hover:text-white">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}


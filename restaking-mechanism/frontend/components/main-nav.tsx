"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { WalletConnect } from "@/components/wallet-connect"
import { cn } from "@/lib/utils"

export function MainNav({
  isConnected,
  onConnect,
}: {
  isConnected: boolean
  onConnect: () => void
}) {
  const pathname = usePathname()
  const isOnDashboard = pathname.startsWith("/dashboard")

  return (
    <header className="relative z-10 border-b border-white/10 bg-black/50 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-purple-600 to-cyan-400">
              <div className="absolute inset-0.5 rounded-full bg-black" />
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-purple-500 to-cyan-300" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">RestakeX</span>
          </Link>
        </div>

        <nav className="hidden md:block">
          <ul className="flex gap-8">
            {[
              { name: "Features", href: "/#features" },
              { name: "Protocols", href: "/#protocols" },
              { name: "Security", href: "/#security" },
              { name: "Docs", href: "/docs" },
              ...(isOnDashboard
                ? [
                    { name: "Dashboard", href: "/dashboard" },
                    { name: "Positions", href: "/dashboard/positions" },
                    { name: "Rewards", href: "/dashboard/rewards" },
                  ]
                : []),
            ].map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-white",
                    pathname === item.href ? "text-white" : "text-white/70",
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <WalletConnect isConnected={isConnected} onConnect={onConnect} />
      </div>
    </header>
  )
}


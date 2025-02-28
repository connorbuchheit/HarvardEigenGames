"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Wallet, ChevronDown, Check } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface WalletConnectProps {
  isConnected: boolean
  onConnect: () => void
  size?: "default" | "lg"
}

const WALLETS = [
  { id: "metamask", name: "MetaMask", icon: "/placeholder.svg?height=40&width=40" },
  { id: "coinbase", name: "Coinbase Wallet", icon: "/placeholder.svg?height=40&width=40" },
  { id: "walletconnect", name: "WalletConnect", icon: "/placeholder.svg?height=40&width=40" },
  { id: "phantom", name: "Phantom", icon: "/placeholder.svg?height=40&width=40" },
]

export function WalletConnect({ isConnected, onConnect, size = "default" }: WalletConnectProps) {
  const [open, setOpen] = useState(false)
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)

  const handleConnect = (walletId: string) => {
    setSelectedWallet(walletId)
    setTimeout(() => {
      setOpen(false)
      onConnect()
    }, 1000)
  }

  if (isConnected) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <div className="h-4 w-4 rounded-full bg-green-500" />
            <span className="hidden sm:inline">0x7a...3f9b</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Copy Address</DropdownMenuItem>
          <DropdownMenuItem>View on Explorer</DropdownMenuItem>
          <DropdownMenuItem>Disconnect</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={size === "lg" ? "px-8 py-6 text-lg" : ""}>
          <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect your wallet</DialogTitle>
          <DialogDescription>Select a wallet to connect to our restaking platform</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {WALLETS.map((wallet) => (
            <Button
              key={wallet.id}
              variant="outline"
              className="flex justify-between px-4 py-6"
              onClick={() => handleConnect(wallet.id)}
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <img src={wallet.icon || "/placeholder.svg"} alt={wallet.name} />
                </Avatar>
                <span>{wallet.name}</span>
              </div>
              {selectedWallet === wallet.id && <Check className="h-5 w-5 animate-pulse text-green-500" />}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}


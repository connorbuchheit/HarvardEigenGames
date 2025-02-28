"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowUpRight, ChevronUp, Download } from "lucide-react"

// Mock data for rewards
const REWARDS_DATA = {
  totalEarned: 0.1828,
  available: 0.0922,
  protocols: [
    { name: "EigenLayer", amount: 0.0658, icon: "/placeholder.svg?height=24&width=24" },
    { name: "Lido", amount: 0.0169, icon: "/placeholder.svg?height=24&width=24" },
    { name: "Rocket Pool", amount: 0.0095, icon: "/placeholder.svg?height=24&width=24" },
  ],
  history: [
    { date: "Feb 25, 2024", amount: 0.0032, protocol: "EigenLayer" },
    { date: "Feb 18, 2024", amount: 0.0028, protocol: "Lido" },
    { date: "Feb 11, 2024", amount: 0.0041, protocol: "EigenLayer" },
    { date: "Feb 04, 2024", amount: 0.0025, protocol: "Rocket Pool" },
  ],
}

export function RewardsPanel() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Total Earned</span>
          <span className="font-medium">{REWARDS_DATA.totalEarned} ETH</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Available to Claim</span>
          <span className="font-medium">{REWARDS_DATA.available} ETH</span>
        </div>
        <Button className="mt-2 w-full gap-1">
          <Download className="h-4 w-4" /> Claim All Rewards
        </Button>
      </div>

      <Separator />

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Rewards by Protocol</h3>
        {REWARDS_DATA.protocols.map((protocol) => (
          <div key={protocol.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={protocol.icon || "/placeholder.svg"} alt={protocol.name} className="h-5 w-5" />
              <span className="text-sm">{protocol.name}</span>
            </div>
            <span className="text-sm font-medium">{protocol.amount} ETH</span>
          </div>
        ))}
      </div>

      <Separator />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Recent Rewards</h3>
          <Button variant="ghost" size="sm" className="h-6 gap-1 text-xs">
            View All <ChevronUp className="h-3 w-3" />
          </Button>
        </div>

        <div className="space-y-2">
          {REWARDS_DATA.history.map((item, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="flex items-center justify-between p-3">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                  <p className="text-sm">{item.protocol}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">+{item.amount} ETH</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <ArrowUpRight className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}


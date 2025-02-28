"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ArrowUpRight, Clock, Plus } from "lucide-react"

// Mock data for staking positions
const ACTIVE_POSITIONS = [
  {
    id: "pos1",
    protocol: "EigenLayer",
    amount: 3.2,
    startDate: "2023-12-15",
    duration: "90 days",
    apy: 8.2,
    rewards: 0.0658,
    progress: 65,
    icon: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "pos2",
    protocol: "Lido",
    amount: 1.5,
    startDate: "2024-01-10",
    duration: "Flexible",
    apy: 4.5,
    rewards: 0.0169,
    progress: 100,
    icon: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "pos3",
    protocol: "Rocket Pool",
    amount: 2.0,
    startDate: "2024-02-05",
    duration: "180 days",
    apy: 5.7,
    rewards: 0.0095,
    progress: 15,
    icon: "/placeholder.svg?height=32&width=32",
  },
]

const COMPLETED_POSITIONS = [
  {
    id: "pos4",
    protocol: "EigenLayer",
    amount: 1.8,
    startDate: "2023-09-20",
    endDate: "2023-12-20",
    apy: 7.9,
    rewards: 0.0356,
    icon: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "pos5",
    protocol: "Stride",
    amount: 2.5,
    startDate: "2023-10-15",
    endDate: "2024-01-15",
    apy: 8.8,
    rewards: 0.055,
    icon: "/placeholder.svg?height=32&width=32",
  },
]

export function StakingPositions() {
  return (
    <Tabs defaultValue="active" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="active">Active ({ACTIVE_POSITIONS.length})</TabsTrigger>
        <TabsTrigger value="completed">Completed ({COMPLETED_POSITIONS.length})</TabsTrigger>
      </TabsList>
      <TabsContent value="active" className="mt-4 space-y-4">
        {ACTIVE_POSITIONS.map((position) => (
          <Card key={position.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src={position.icon || "/placeholder.svg"} alt={position.protocol} className="h-6 w-6" />
                  <CardTitle className="text-lg">{position.protocol}</CardTitle>
                </div>
                <Badge variant="outline">{position.apy}% APY</Badge>
              </div>
              <CardDescription>Started on {position.startDate}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Staked Amount</p>
                    <p className="text-lg font-medium">{position.amount} ETH</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Earned Rewards</p>
                    <p className="text-lg font-medium">{position.rewards} ETH</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{position.duration}</span>
                    </div>
                    <span>{position.progress}% complete</span>
                  </div>
                  <Progress value={position.progress} />
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    Unstake
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Claim Rewards
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        <div className="flex justify-center pt-4">
          <Button variant="outline" className="gap-1">
            <Plus className="h-4 w-4" /> Add New Position
          </Button>
        </div>
      </TabsContent>
      <TabsContent value="completed" className="mt-4 space-y-4">
        {COMPLETED_POSITIONS.map((position) => (
          <Card key={position.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src={position.icon || "/placeholder.svg"} alt={position.protocol} className="h-6 w-6" />
                  <CardTitle className="text-lg">{position.protocol}</CardTitle>
                </div>
                <Badge variant="secondary">Completed</Badge>
              </div>
              <CardDescription>
                {position.startDate} to {position.endDate}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Staked Amount</p>
                    <p className="text-lg font-medium">{position.amount} ETH</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">APY</p>
                    <p className="text-lg font-medium">{position.apy}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Rewards</p>
                    <p className="text-lg font-medium">{position.rewards} ETH</p>
                  </div>
                </div>

                <Button variant="outline" className="gap-1">
                  View Transaction <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </TabsContent>
    </Tabs>
  )
}


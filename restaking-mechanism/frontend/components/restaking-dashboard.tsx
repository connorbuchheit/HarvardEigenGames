"use client"

import { useState } from "react"
import { WalletConnect } from "@/components/wallet-connect"
import { StakingPositions } from "@/components/staking-positions"
import { RestakingForm } from "@/components/restaking-form"
import { RewardsPanel } from "@/components/rewards-panel"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"
import { MainNav } from "@/components/main-nav"

export function RestakingDashboard() {
  const [isConnected, setIsConnected] = useState(false)
  const [activeTab, setActiveTab] = useState("stake")

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <MainNav isConnected={isConnected} onConnect={() => setIsConnected(true)} />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Restaking Platform</h1>
            <p className="text-muted-foreground">Maximize your yield by restaking across multiple protocols</p>
          </div>
          <WalletConnect isConnected={isConnected} onConnect={() => setIsConnected(true)} />
        </div>

        <Alert className="mb-8">
          <Info className="h-4 w-4" />
          <AlertTitle>What is restaking?</AlertTitle>
          <AlertDescription>
            Restaking allows you to stake your tokens across multiple protocols simultaneously, earning rewards from
            each while maintaining your security commitment to the network.
          </AlertDescription>
        </Alert>

        {isConnected ? (
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="stake">Stake</TabsTrigger>
                  <TabsTrigger value="positions">Your Positions</TabsTrigger>
                </TabsList>
                <TabsContent value="stake" className="mt-4">
                  <RestakingForm />
                </TabsContent>
                <TabsContent value="positions" className="mt-4">
                  <StakingPositions />
                </TabsContent>
              </Tabs>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Your Rewards</CardTitle>
                  <CardDescription>Track your earnings across all protocols</CardDescription>
                </CardHeader>
                <CardContent>
                  <RewardsPanel />
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <Card className="p-8 text-center">
            <CardHeader>
              <CardTitle className="text-xl">Connect Your Wallet</CardTitle>
              <CardDescription>Connect your wallet to start restaking your tokens</CardDescription>
            </CardHeader>
            <CardContent>
              <WalletConnect isConnected={isConnected} onConnect={() => setIsConnected(true)} size="lg" />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}


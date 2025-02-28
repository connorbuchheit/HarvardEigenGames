"use client"

import { CardFooter } from "@/components/ui/card"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { getRealtimeApy } from "@/lib/protocol-config"
import { ApyBreakdown } from "@/components/apy-breakdown"
import { PROTOCOL_IDS, type ProtocolId } from "@/lib/protocol-config"

// Updated protocol data with correct IDs
const PROTOCOLS = [
  {
    id: PROTOCOL_IDS.EIGEN_LAYER,
    name: "EigenLayer",
    icon: "/placeholder.svg?height=32&width=32",
  },
  {
    id: PROTOCOL_IDS.LIDO,
    name: "Lido",
    icon: "/placeholder.svg?height=32&width=32",
  },
  {
    id: PROTOCOL_IDS.ROCKET_POOL,
    name: "Rocket Pool",
    icon: "/placeholder.svg?height=32&width=32",
  },
  {
    id: PROTOCOL_IDS.STRIDE,
    name: "Stride",
    icon: "/placeholder.svg?height=32&width=32",
  },
]

export function RestakingForm() {
  const [amount, setAmount] = useState("1.0")
  const [selectedProtocols, setSelectedProtocols] = useState<ProtocolId[]>([PROTOCOL_IDS.EIGEN_LAYER])
  const [allocation, setAllocation] = useState<Record<ProtocolId, number>>({
    [PROTOCOL_IDS.EIGEN_LAYER]: 100,
    [PROTOCOL_IDS.LIDO]: 0,
    [PROTOCOL_IDS.ROCKET_POOL]: 0,
    [PROTOCOL_IDS.STRIDE]: 0,
  })
  const [apyData, setApyData] = useState<Record<ProtocolId, number>>({})

  useEffect(() => {
    const fetchApyData = async () => {
      const data: Record<ProtocolId, number> = {}
      for (const protocolId of selectedProtocols) {
        try {
          data[protocolId] = await getRealtimeApy(protocolId)
        } catch (error) {
          console.error(`Error fetching APY for ${protocolId}:`, error)
        }
      }
      setApyData(data)
    }

    fetchApyData()
    // Refresh APY data periodically
    const interval = setInterval(fetchApyData, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [selectedProtocols])

  const handleProtocolToggle = (protocolId: ProtocolId) => {
    setSelectedProtocols((prev) => {
      if (prev.includes(protocolId)) {
        return prev.filter((id) => id !== protocolId)
      } else {
        return [...prev, protocolId]
      }
    })

    // Recalculate allocations
    if (selectedProtocols.includes(protocolId)) {
      // Remove allocation
      const newAllocation = { ...allocation }
      const removedValue = newAllocation[protocolId]
      delete newAllocation[protocolId]

      // Distribute removed value among remaining protocols
      const remainingProtocols = Object.keys(newAllocation)
      if (remainingProtocols.length > 0) {
        const valuePerProtocol = removedValue / remainingProtocols.length
        remainingProtocols.forEach((id) => {
          newAllocation[id as ProtocolId] += valuePerProtocol
        })
      }

      setAllocation(newAllocation)
    } else {
      // Add new protocol with equal allocation
      const protocolCount = selectedProtocols.length + 1
      const valuePerProtocol = 100 / protocolCount

      const newAllocation: Record<ProtocolId, number> = {}
      selectedProtocols.forEach((id) => {
        newAllocation[id] = valuePerProtocol
      })
      newAllocation[protocolId] = valuePerProtocol

      setAllocation(newAllocation)
    }
  }

  const handleAllocationChange = (protocolId: ProtocolId, value: number[]) => {
    const newValue = value[0]
    const oldValue = allocation[protocolId]
    const diff = newValue - oldValue

    // Don't allow changes if only one protocol is selected
    if (selectedProtocols.length === 1) {
      return
    }

    // Calculate how much to subtract from other protocols
    const otherProtocols = selectedProtocols.filter((id) => id !== protocolId)
    const valuePerProtocol = diff / otherProtocols.length

    const newAllocation = { ...allocation }
    newAllocation[protocolId] = newValue

    // Adjust other protocols
    otherProtocols.forEach((id) => {
      newAllocation[id] = Math.max(0, newAllocation[id] - valuePerProtocol)
    })

    // Normalize to ensure sum is 100%
    const sum = Object.values(newAllocation).reduce((a, b) => a + b, 0)
    if (sum !== 100) {
      const factor = 100 / sum
      Object.keys(newAllocation).forEach((id) => {
        newAllocation[id as ProtocolId] *= factor
      })
    }

    setAllocation(newAllocation)
  }

  const calculateCombinedApy = () => {
    let combinedApy = 0
    selectedProtocols.forEach((id) => {
      const apy = apyData[id] || 0
      combinedApy += (apy * allocation[id]) / 100
    })
    return combinedApy
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Restake Your Tokens</CardTitle>
        <CardDescription>Allocate your tokens across multiple protocols to maximize returns</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount to Stake (ETH)</Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0.1"
            step="0.1"
          />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Balance: 10.45 ETH</span>
            <Button variant="link" className="h-auto p-0" onClick={() => setAmount("10.45")}>
              Max
            </Button>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Select Protocols</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Info className="h-4 w-4" />
                    <span className="sr-only">About protocols</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    Select multiple protocols to distribute your stake. Each protocol offers different rewards and
                    security models.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="space-y-4">
            {PROTOCOLS.map((protocol) => (
              <div key={protocol.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id={protocol.id}
                      checked={selectedProtocols.includes(protocol.id)}
                      onCheckedChange={() => handleProtocolToggle(protocol.id)}
                    />
                    <img src={protocol.icon || "/placeholder.svg"} alt={protocol.name} className="h-6 w-6" />
                    <Label htmlFor={protocol.id} className="cursor-pointer">
                      {protocol.name}
                    </Label>
                  </div>
                  <Badge variant="outline">
                    {apyData[protocol.id] ? apyData[protocol.id].toFixed(2) : protocol.apy}% APY
                  </Badge>
                </div>

                {selectedProtocols.includes(protocol.id) && (
                  <div className="pl-8 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Allocation</span>
                      <span className="text-sm font-medium">{allocation[protocol.id].toFixed(0)}%</span>
                    </div>
                    <Slider
                      value={[allocation[protocol.id]]}
                      onValueChange={(value) => handleAllocationChange(protocol.id, value)}
                      min={0}
                      max={100}
                      step={1}
                      className="py-4"
                    />
                    <ApyBreakdown protocolId={protocol.id} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="rounded-lg bg-muted p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium">Summary</span>
            <Badge className="bg-primary">{calculateCombinedApy().toFixed(2)}% Combined APY</Badge>
          </div>
          <div className="space-y-1">
            {selectedProtocols.map((id) => {
              const protocol = PROTOCOLS.find((p) => p.id === id)
              if (!protocol) return null
              return (
                <div key={id} className="flex items-center justify-between text-sm">
                  <span>{protocol.name}</span>
                  <span>
                    {allocation[id].toFixed(0)}% ({((Number.parseFloat(amount) * allocation[id]) / 100).toFixed(4)} ETH)
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          Stake {amount} ETH <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}


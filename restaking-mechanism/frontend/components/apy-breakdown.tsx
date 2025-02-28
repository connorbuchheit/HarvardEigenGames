"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { getApyBreakdown } from "@/lib/protocol-config"
import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { ProtocolId } from "@/lib/protocol-config"

interface ApyBreakdownProps {
  protocolId: ProtocolId
}

export function ApyBreakdown({ protocolId }: ApyBreakdownProps) {
  const [breakdown, setBreakdown] = useState<ReturnType<typeof getApyBreakdown> | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const data = getApyBreakdown(protocolId)
      setBreakdown(data)
    } catch (error) {
      console.error("Error fetching APY breakdown:", error)
    } finally {
      setIsLoading(false)
    }
  }, [protocolId])

  if (isLoading || !breakdown) {
    return <Skeleton className="h-[200px] w-full" />
  }

  const maxValue = Math.max(breakdown.base, breakdown.protocol, breakdown.mev)

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">APY Breakdown</h3>
          <span className="text-2xl font-bold">{breakdown.total.toFixed(2)}%</span>
        </div>

        <div className="space-y-4">
          {[
            { label: "Base Rewards", value: breakdown.base, info: "Standard staking rewards" },
            { label: "Protocol Rewards", value: breakdown.protocol, info: "Additional protocol-specific rewards" },
            { label: "MEV Rewards", value: breakdown.mev, info: "Maximal Extractable Value rewards" },
          ].map((item) => (
            <div key={item.label} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{item.label}</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs text-sm">{item.info}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span className="text-sm font-medium">{item.value.toFixed(2)}%</span>
              </div>
              <Progress value={(item.value / maxValue) * 100} className="h-2" />
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-lg bg-muted p-3 text-sm">
          <p className="text-muted-foreground">
            APY calculations include compounding effects and are subject to change based on network conditions and
            validator performance.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}


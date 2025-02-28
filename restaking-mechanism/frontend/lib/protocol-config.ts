import type { ProtocolRewards } from "./apy-calculator"
import { APYCalculator } from "./apy-calculator"

// Protocol-specific APY configurations
export const PROTOCOL_CONFIGS: Record<string, ProtocolRewards> = {
  eigenLayer: {
    baseRewards: 4.0, // Base ETH staking rewards
    protocolRewards: 3.5, // EigenLayer specific rewards
    mevRewards: 0.7, // MEV rewards
    validatorEffectiveness: 0.98, // 98% effectiveness
    networkParticipation: 0.95, // 95% participation rate
    compoundingFrequency: "daily",
  },
  lido: {
    baseRewards: 3.8, // Slightly lower due to protocol fee
    protocolRewards: 0.7, // LDO rewards
    mevRewards: 0.5,
    validatorEffectiveness: 0.99,
    networkParticipation: 0.97,
    compoundingFrequency: "daily",
  },
  rocketPool: {
    baseRewards: 4.0,
    protocolRewards: 1.7, // RPL rewards
    mevRewards: 0.6,
    validatorEffectiveness: 0.985,
    networkParticipation: 0.96,
    compoundingFrequency: "daily",
  },
  stride: {
    baseRewards: 8.5, // Higher base rewards for Cosmos staking
    protocolRewards: 0.6,
    compoundingFrequency: "daily",
  },
}

// Export protocol IDs for consistency
export const PROTOCOL_IDS = {
  EIGEN_LAYER: "eigenLayer",
  LIDO: "lido",
  ROCKET_POOL: "rocketPool",
  STRIDE: "stride",
} as const

export type ProtocolId = keyof typeof PROTOCOL_CONFIGS

// Function to get real-time APY with market conditions
export async function getRealtimeApy(protocolId: ProtocolId): Promise<number> {
  const config = PROTOCOL_CONFIGS[protocolId]
  if (!config) throw new Error(`Protocol ${protocolId} not found`)

  try {
    // For demo purposes, we'll add some randomness to simulate market fluctuations
    const marketVariation = 0.95 + Math.random() * 0.1 // ±5% variation

    const modifiedConfig: ProtocolRewards = {
      ...config,
      baseRewards: config.baseRewards * marketVariation,
      protocolRewards: config.protocolRewards * marketVariation,
    }

    return APYCalculator.calculateTotalApy(modifiedConfig)
  } catch (error) {
    console.error(`Error calculating APY for ${protocolId}:`, error)
    // Fallback to static config if real-time calculation fails
    return APYCalculator.calculateTotalApy(config)
  }
}

// Get APY breakdown for UI display
export function getApyBreakdown(protocolId: ProtocolId) {
  const config = PROTOCOL_CONFIGS[protocolId]
  if (!config) throw new Error(`Protocol ${protocolId} not found`)

  return APYCalculator.getApyBreakdown(config)
}


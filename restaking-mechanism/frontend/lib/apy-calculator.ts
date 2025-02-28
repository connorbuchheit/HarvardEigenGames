export type ProtocolRewards = {
  baseRewards: number // Base staking rewards (e.g., 4% for Ethereum)
  protocolRewards: number // Additional protocol-specific rewards
  mevRewards?: number // Optional MEV rewards
  validatorEffectiveness?: number // Validator performance (0-1)
  networkParticipation?: number // Network participation rate (0-1)
  compoundingFrequency: "daily" | "weekly" | "monthly" | "yearly"
}

export class APYCalculator {
  // Convert APR to APY based on compounding frequency
  private static aprToApy(apr: number, compoundingFrequency: ProtocolRewards["compoundingFrequency"]): number {
    const frequencyMap = {
      daily: 365,
      weekly: 52,
      monthly: 12,
      yearly: 1,
    }

    const n = frequencyMap[compoundingFrequency]
    return (Math.pow(1 + apr / 100 / n, n) - 1) * 100
  }

  // Calculate base APY including compounding
  private static calculateBaseApy(rewards: ProtocolRewards): number {
    const baseApr = rewards.baseRewards
    return this.aprToApy(baseApr, rewards.compoundingFrequency)
  }

  // Calculate protocol-specific rewards
  private static calculateProtocolRewards(rewards: ProtocolRewards): number {
    const protocolApr = rewards.protocolRewards
    return this.aprToApy(protocolApr, rewards.compoundingFrequency)
  }

  // Calculate MEV rewards if available
  private static calculateMevRewards(rewards: ProtocolRewards): number {
    if (!rewards.mevRewards) return 0
    return this.aprToApy(rewards.mevRewards, rewards.compoundingFrequency)
  }

  // Apply validator effectiveness and network participation modifiers
  private static applyModifiers(apy: number, rewards: ProtocolRewards): number {
    let modifiedApy = apy

    if (rewards.validatorEffectiveness) {
      modifiedApy *= rewards.validatorEffectiveness
    }

    if (rewards.networkParticipation) {
      modifiedApy *= rewards.networkParticipation
    }

    return modifiedApy
  }

  // Calculate total APY for a protocol
  public static calculateTotalApy(rewards: ProtocolRewards): number {
    const baseApy = this.calculateBaseApy(rewards)
    const protocolApy = this.calculateProtocolRewards(rewards)
    const mevApy = this.calculateMevRewards(rewards)

    const totalApy = baseApy + protocolApy + mevApy
    return this.applyModifiers(totalApy, rewards)
  }

  // Get detailed breakdown of APY components
  public static getApyBreakdown(rewards: ProtocolRewards): {
    total: number
    base: number
    protocol: number
    mev: number
  } {
    const base = this.calculateBaseApy(rewards)
    const protocol = this.calculateProtocolRewards(rewards)
    const mev = this.calculateMevRewards(rewards)
    const total = this.applyModifiers(base + protocol + mev, rewards)

    return {
      total,
      base,
      protocol,
      mev,
    }
  }
}


import type { Metadata } from "next"
import { LandingPage } from "@/components/landing-page"

export const metadata: Metadata = {
  title: "Restaking Platform | Maximize Your Crypto Yield",
  description: "Stake your tokens across multiple protocols to maximize your rewards",
}

export default function HomePage() {
  return <LandingPage />
}


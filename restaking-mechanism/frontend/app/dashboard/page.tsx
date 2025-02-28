import type { Metadata } from "next"
import { RestakingDashboard } from "@/components/restaking-dashboard"

export const metadata: Metadata = {
  title: "Dashboard | Restaking Platform",
  description: "Manage your restaking positions and rewards",
}

export default function DashboardPage() {
  return <RestakingDashboard />
}


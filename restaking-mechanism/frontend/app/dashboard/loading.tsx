import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
        <p className="text-sm text-white/70">Loading dashboard...</p>
      </div>
    </div>
  )
}


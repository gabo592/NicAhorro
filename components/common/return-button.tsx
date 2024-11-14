"use client"

import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { ChevronLeft } from "lucide-react"

export default function ReturnButton() {
  const router = useRouter()

  return (
    <Button variant="outline" size="icon" onClick={() => router.back()}>
      <ChevronLeft className="w-4 h-4" />
    </Button>
  )
}
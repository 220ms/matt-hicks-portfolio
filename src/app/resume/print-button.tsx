"use client"

import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PrintButton() {
  return (
    <Button size="lg" className="rounded-full px-5" onClick={() => window.print()}>
      <Download /> Download PDF
    </Button>
  )
}

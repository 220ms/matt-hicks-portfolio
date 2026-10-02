"use client"

import { useState } from "react"
import { Check, Copy, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

// mailto: links do nothing for visitors without a default mail app (common with webmail),
// so the address is always visible and can be copied in one click.
export function EmailButton({ email, className }: { email: string; className?: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(email)
    } catch {
      // Older browsers / insecure contexts: fall back to a hidden textarea
      const el = document.createElement("textarea")
      el.value = email
      document.body.appendChild(el)
      el.select()
      document.execCommand("copy")
      el.remove()
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className={cn(
        "flex h-14 items-stretch overflow-hidden rounded-full bg-primary text-base font-medium text-primary-foreground",
        className
      )}
    >
      <a
        href={`mailto:${email}`}
        className="flex min-w-0 flex-1 items-center gap-2 pr-3 pl-5 transition-colors hover:bg-black/10 sm:flex-none sm:pr-4 sm:pl-6"
      >
        <Mail className="size-4 shrink-0" />
        <span className="truncate">{email}</span>
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Email copied" : "Copy email address"}
        className="flex shrink-0 items-center gap-1.5 border-l border-primary-foreground/20 px-4 text-sm transition-colors hover:bg-black/10 sm:pr-6 sm:pl-4"
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        <span aria-live="polite" className="sr-only sm:not-sr-only">
          {copied ? "Copied!" : "Copy"}
        </span>
      </button>
    </div>
  )
}

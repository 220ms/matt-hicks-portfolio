import { profile } from "@/data/portfolio"

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-8 font-mono text-sm text-muted-foreground sm:flex-row sm:px-6">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>Built with Next.js, shadcn/ui &amp; Tailwind</p>
      </div>
    </footer>
  )
}

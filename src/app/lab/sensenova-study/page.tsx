import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ChevronRight } from "lucide-react"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { profile } from "@/data/portfolio"
import { cn } from "@/lib/utils"
import data from "./data.json"

export const metadata: Metadata = {
  title: `SenseNova U1.5 on an 8 GB GPU — ${profile.name}`,
  description: "A one-factor-at-a-time study of the SenseNova U1.5 image model running locally on an RTX 3070 Ti.",
  robots: { index: false, follow: false },
}

const BASE = "/lab/sensenova-study"
type Factor = [string, string, [string, string][]]

const notes = data.notes as Record<string, string>
const secs = data.secs as Record<string, number>
const skipped = data.skipped as Record<string, string>
const scenes = data.scenes as [string, string][]
const factors = data.factors as Factor[]
const prompts = data.prompts as Record<string, string>

function time(key: string, tag: string) {
  if (tag === "klein") return "~30 s"
  const s = secs[key]
  if (!s) return null
  return `${Math.floor(s / 60)} min ${String(s % 60).padStart(2, "0")} s`
}

function Still({ scene, tag, label }: { scene: string; tag: string; label: string }) {
  const key = `${scene}__${tag}`
  const t = time(key, tag)
  return (
    <figure className="m-0">
      {skipped[key] ? (
        <div className="flex aspect-video items-center justify-center rounded-xl border border-dashed border-destructive/60 bg-muted/40 p-4 text-center font-mono text-xs text-destructive">
          ✕ cancelled: ~15 h per image on 8 GB
        </div>
      ) : (
        <a href={`${BASE}/${key}.jpg`} target="_blank" rel="noreferrer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${BASE}/${key}.jpg`} alt={`${label}: ${scene.replace(/_/g, " ")}`} loading="lazy" className="block aspect-video w-full rounded-xl bg-black object-cover" />
        </a>
      )}
      <figcaption className="mt-2 text-sm">
        <span className="font-semibold">{label}</span>
        {t && <span className="font-mono text-xs text-muted-foreground"> · {t}</span>}
        {notes[key] && <p className="mt-0.5 text-muted-foreground">{notes[key]}</p>}
      </figcaption>
    </figure>
  )
}

const stats = [
  { label: "GPU", value: "RTX 3070 Ti · 8 GB" },
  { label: "Model", value: "SenseNova U1.5 8B MoT" },
  { label: "Renders", value: "30" },
  { label: "Best time", value: "~6 min / still" },
]

export default function SenseNovaStudyPage() {
  const summary = (notes["summary"] || "").split("\n").filter(Boolean)

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pt-24 pb-16 sm:px-6 md:pt-28">
        <Link href="/lab" className={cn(buttonVariants({ variant: "ghost" }), "-ml-3 mb-8")}>
          <ArrowLeft /> All lab experiments
        </Link>

        <header className="mb-12">
          <nav aria-label="Breadcrumb" className="mb-3 flex flex-wrap items-center gap-1 font-mono text-sm">
            <Link href="/lab" className="text-brand hover:underline">lab</Link>
            <ChevronRight className="size-3.5 text-muted-foreground" />
            <Link href="/lab#documentary-pipeline" className="text-brand hover:underline">documentary-pipeline</Link>
            <ChevronRight className="size-3.5 text-muted-foreground" />
            <span className="text-muted-foreground" aria-current="page">sensenova-study</span>
          </nav>
          <h1 className="text-4xl font-bold md:text-6xl">
            Tuning <span className="text-gradient">SenseNova U1.5</span> on an 8 GB GPU
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            A study of an open-weights image model for an AI documentary pipeline. One setting changes at a time from a
            fixed baseline, on two scenes, with the same prompt, seed and character reference image throughout, so every
            difference is that setting&apos;s doing. FLUX 3 Klein is included as the bar to beat.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border bg-card px-4 py-3">
                <p className="font-mono text-xs text-muted-foreground uppercase">{s.label}</p>
                <p className="mt-1 font-semibold">{s.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {["SenseNova U1.5", "GGUF Q6_K", "ComfyUI API", "Python", "FLUX 3 Klein"].map((t) => (
              <Badge key={t} variant="outline" className="font-mono">{t}</Badge>
            ))}
          </div>
        </header>

        <section className="mb-10 rounded-3xl border bg-gradient-to-br from-brand/15 via-card to-brand-2/15 p-5 sm:p-8">
          <h2 className="text-2xl font-bold md:text-3xl">The result</h2>
          <div className="mt-4 space-y-3 leading-relaxed">
            {summary.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <p className="mt-4 font-mono text-sm text-muted-foreground">
            Baseline: Q6_K · 1344×768 · 30 steps · cfg 4 · img_cfg 1.5 · cfg_norm global · shift 3 · thinking off · reference on · seed 1
          </p>
        </section>

        <div className="space-y-8">
          {factors.map(([title, what, cols], i) => (
            <section key={title} className="rounded-3xl border bg-card p-5 sm:p-8">
              <p className="mb-1 font-mono text-sm text-brand">{String(i + 1).padStart(2, "0")} / factor</p>
              <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
              <p className="mt-1 mb-6 text-muted-foreground">{what}</p>
              <div className="space-y-6">
                {scenes.map(([scene, sceneLabel]) => (
                  <div key={scene}>
                    <h3 className="mb-3 text-sm font-semibold text-muted-foreground">{sceneLabel}</h3>
                    <div className={cn("grid gap-5 sm:grid-cols-2", cols.length === 3 && "lg:grid-cols-3")}>
                      {cols.map(([tag, label]) => (
                        <Still key={tag} scene={scene} tag={tag} label={label} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {notes[`verdict::${title}`] && (
                <div className="mt-6 rounded-r-lg border-l-4 border-brand bg-muted/50 px-4 py-3 text-sm leading-relaxed">
                  {notes[`verdict::${title}`]}
                </div>
              )}
            </section>
          ))}

          <section className="rounded-3xl border bg-card p-5 sm:p-8">
            <p className="mb-1 font-mono text-sm text-brand">prompts</p>
            <h2 className="text-2xl font-bold md:text-3xl">Prompts used</h2>
            <p className="mt-1 mb-6 text-muted-foreground">The same two prompts for every render. The character comes from the reference image (Image-1).</p>
            <div className="divide-y">
              {scenes.map(([scene, label]) => (
                <details key={scene} className="py-3">
                  <summary className="cursor-pointer font-semibold">{label}</summary>
                  <pre className="mt-3 overflow-x-auto rounded-xl bg-muted/60 p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap">{prompts[scene]}</pre>
                </details>
              ))}
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}

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
  title: `Local image model showdown — ${profile.name}`,
  description: "Five local image models and Gemini, head to head on the same prompts, seed and character reference.",
  robots: { index: false, follow: false },
}

const BASE = "/lab/image-model-showdown"
const secs = data.secs as Record<string, number>
const prompts = data.prompts as Record<string, string>

const models = [
  { id: "gemini", name: "Gemini", sub: "cloud · reference image", license: "Free tier, daily limits" },
  { id: "klein_int8", name: "FLUX 3 Klein · int8", sub: "16 steps · reference", license: "Free under US$5M revenue" },
  { id: "klein_bf16", name: "FLUX 3 Klein · bf16", sub: "16 steps · reference", license: "Free under US$5M revenue" },
  { id: "qwen_fast", name: "Qwen Image Edit 2511 · Lightning", sub: "8 steps · reference", license: "Apache 2.0" },
  { id: "qwen_full", name: "Qwen Image Edit 2511 · full", sub: "40 steps · reference", license: "Apache 2.0" },
  { id: "moss", name: "MOSS-Image SFT", sub: "25 steps · text only", license: "Apache 2.0" },
  { id: "sensenova", name: "SenseNova U1.5 · Q6_K", sub: "30 steps · 1920×1088 · reference", license: "Apache 2.0" },
]

const scenes = [
  { id: "k14_bats_shrine", title: "Inside the shrine with bats", note: "Recreating an existing Gemini still: low light, light beams, small subjects.",
    verdict: "Gemini is the most natural. SenseNova is a strong second on mood and keeps the face fully hidden, but its bats are oversized. Klein is close behind. Qwen Lightning's light beams look artificial." },
  { id: "k24_oasis", title: "The oasis puddle", note: "Recreating an existing Gemini still: water, harsh light, a man lying down.",
    verdict: "Gemini and Qwen full look the most photographic. Klein is decent but the water is odd. SenseNova is dramatic but over-graded, and he is kneeling in the puddle. Qwen Lightning turned illustrative." },
  { id: "new_charcoal_note", title: "Writing the charcoal note (new scene)", note: "Night, ember light, face must stay hidden.",
    verdict: "SenseNova wins this one: over the shoulder, face wrapped and in shadow, a real charcoal stick on paper, embers lighting the hands. Klein is a close second. Gemini has rich detail but turns his face into profile. MOSS showed his face." },
  { id: "new_walk_mountains", title: "Walking toward the mountains (new scene)", note: "Wide shot, character consistency at a distance.",
    verdict: "Gemini is the crispest and most photographic; Klein and Qwen Lightning are close behind. SenseNova is beautiful but he casts two shadows and is barefoot. MOSS changed his shirt to yellow." },
]

const table = [
  ["FLUX 3 Klein · int8", "Good to very good", "Yes", "Excellent", "~30 s"],
  ["FLUX 3 Klein · bf16", "Identical to int8", "Yes", "Excellent", "~80 s"],
  ["Qwen Edit · Lightning", "Mixed", "Mostly", "Good", "~65 s"],
  ["Qwen Edit · full", "Very photographic", "Yes, turns him toward camera", "Good", "~5.5 min"],
  ["MOSS-Image", "Good lighting", "No (text only)", "OK", "~55 s"],
  ["SenseNova U1.5", "Very good, sometimes over-graded", "Yes, best at hiding the face", "Good, with physics slips", "~6 min"],
  ["Gemini", "The most photographic", "Yes", "Good", "~20 s, ~14-36 / account / day"],
]

function time(key: string) {
  const s = secs[key]
  if (!s) return null
  return s >= 60 ? `${Math.floor(s / 60)} min ${String(s % 60).padStart(2, "0")} s` : `${s} s`
}

export default function ShowdownPage() {
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
            <span className="text-muted-foreground" aria-current="page">image-model-showdown</span>
          </nav>
          <h1 className="text-4xl font-bold md:text-6xl">
            Local <span className="text-gradient">image model</span> showdown
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Six image models that run on an RTX 3070 Ti (8 GB), plus Gemini as the cloud baseline, on the same four
            documentary scenes: the same prompt, seed and character reference image for every model that accepts one.
            Only models whose licence allows commercial use were tested.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["FLUX 3 Klein", "Qwen Image Edit 2511", "MOSS-Image", "SenseNova U1.5", "Gemini", "ComfyUI API"].map((t) => (
              <Badge key={t} variant="outline" className="font-mono">{t}</Badge>
            ))}
          </div>
        </header>

        <section className="mb-10 rounded-3xl border bg-gradient-to-br from-brand/15 via-card to-brand-2/15 p-5 sm:p-8">
          <h2 className="text-2xl font-bold md:text-3xl">The result</h2>
          <p className="mt-4 leading-relaxed">
            <b>FLUX 3 Klein int8</b> is the best all-rounder locally: realistic, keeps the character consistent and
            follows the prompt closely, at about 30 seconds a still. <b>Gemini</b> is still slightly the most
            photographic, so it is used for the shots that get animated, with Klein as the unlimited local fallback.
            The bf16 build of Klein gave identical images for nearly three times the time. <b>SenseNova U1.5</b> produced the single best still (the charcoal note) but is ~10× slower than Klein and made physics slips (kneeling in the water, a double shadow).
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="font-mono text-xs text-muted-foreground uppercase">
                <tr>{["Model", "Realism", "Character consistent?", "Prompt following", "Time per still"].map((h) => <th key={h} className="border-b px-3 py-2">{h}</th>)}</tr>
              </thead>
              <tbody>
                {table.map((r) => (
                  <tr key={r[0]} className="border-b border-border/50">{r.map((c, i) => <td key={i} className={cn("px-3 py-2", i === 0 && "font-semibold")}>{c}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-8 grid items-center gap-6 rounded-3xl border bg-card p-5 sm:p-8 md:grid-cols-[1fr_2fr]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${BASE}/reference.jpg`} alt="Character reference image" className="w-full rounded-xl" />
          <div>
            <p className="mb-1 font-mono text-sm text-brand">reference</p>
            <h2 className="text-2xl font-bold">The character reference</h2>
            <p className="mt-2 text-muted-foreground">
              Every model that supports a reference image got this one, to keep the same man (kit, cloth wrap, backpack)
              across scenes. MOSS has no reference input, so he is described in words instead.
            </p>
          </div>
        </section>

        <div className="space-y-8">
          {scenes.map((sc, i) => (
            <section key={sc.id} className="rounded-3xl border bg-card p-5 sm:p-8">
              <p className="mb-1 font-mono text-sm text-brand">{String(i + 1).padStart(2, "0")} / scene</p>
              <h2 className="text-2xl font-bold md:text-3xl">{sc.title}</h2>
              <p className="mt-1 mb-6 text-muted-foreground">{sc.note}</p>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {models.map((m) => {
                  const key = `${m.id}__${sc.id}`
                  const missing = false
                  const geminiNew = m.id === "gemini" && sc.id.startsWith("new_")
                  return (
                    <figure key={m.id} className="m-0">
                      {missing ? null : (
                        <a href={`${BASE}/${key}.jpg`} target="_blank" rel="noreferrer">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={`${BASE}/${key}.jpg`} alt={`${m.name}: ${sc.title}`} loading="lazy" className="block aspect-video w-full rounded-xl bg-black object-cover" />
                        </a>
                      )}
                      <figcaption className="mt-2 text-sm">
                        <span className="font-semibold">{m.name}</span>
                        <span className="font-mono text-xs text-muted-foreground"> · {m.sub}{time(key) ? ` · ${time(key)}` : ""}</span>
                        <p className="text-xs text-muted-foreground">
                          {m.license}
                          {geminiNew && " · same scene and reference, made with the video's Gemini prompt wording"}
                        </p>
                      </figcaption>
                    </figure>
                  )
                })}
              </div>
              <div className="mt-6 rounded-r-lg border-l-4 border-brand bg-muted/50 px-4 py-3 text-sm leading-relaxed">{sc.verdict}</div>
              {prompts[sc.id] && (
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm text-muted-foreground">Prompt</summary>
                  <pre className="mt-3 overflow-x-auto rounded-xl bg-muted/60 p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap">{prompts[sc.id]}</pre>
                </details>
              )}
            </section>
          ))}
        </div>

        <p className="mt-10 text-sm text-muted-foreground">
          Not tested: Qwen Image 2.1 (non-commercial research licence) and SDXL (outdated). SenseNova U1.5 also has its own{" "}
          <Link href="/lab/sensenova-study" className="text-brand hover:underline">settings study</Link>.
        </p>
      </main>
      <SiteFooter />
    </>
  )
}

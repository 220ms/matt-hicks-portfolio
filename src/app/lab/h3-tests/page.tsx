import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { SiteFooter } from "@/components/site-footer"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { profile } from "@/data/portfolio"
import { cn } from "@/lib/utils"
import data from "./data.json"

// Unlisted lab page: reachable by link only, kept out of search engines.
export const metadata: Metadata = {
  title: `Tuning MiniMax H3 on an 8 GB GPU — ${profile.name}`,
  description: "Side-by-side test renders from tuning the MiniMax H3 image-to-video model locally on an RTX 3070 Ti.",
  robots: { index: false, follow: false },
}

const BASE = "/lab/h3-tests"

type Shot = "storm" | "bats" | "flag"
type Clip = { id: string; label: string; note?: string; pick?: boolean; fail?: string }

const secs = data.secs as Record<string, number>

function duration(id: string) {
  const s = secs[id]
  if (!s) return null
  const m = Math.floor(s / 60)
  return `${m} min ${String(s % 60).padStart(2, "0")} s`
}

function ClipCard({ clip }: { clip: Clip }) {
  const time = duration(clip.id)
  return (
    <figure className="m-0">
      {clip.fail ? (
        <div className="flex aspect-[1344/768] items-center justify-center rounded-xl border border-dashed border-destructive/60 bg-muted/40 p-4 text-center font-mono text-sm text-destructive">
          {clip.fail}
        </div>
      ) : (
        <video
          className="block aspect-[1344/768] w-full rounded-xl bg-black"
          src={`${BASE}/${clip.id}.mp4`}
          poster={`${BASE}/${clip.id}.jpg`}
          controls
          muted
          loop
          playsInline
          preload="none"
        />
      )}
      <figcaption className="mt-2 text-sm">
        <span className="font-semibold">{clip.label}</span>
        {time && <span className="font-mono text-xs text-muted-foreground"> · {time}</span>}
        {clip.pick && <span className="ml-2 font-mono text-xs text-brand">✓ pick</span>}
        {clip.note && <p className="mt-0.5 text-muted-foreground">{clip.note}</p>}
      </figcaption>
    </figure>
  )
}

function Section({
  index,
  title,
  what,
  clips,
  verdict,
  cols = 3,
}: {
  index: string
  title: string
  what: string
  clips: Clip[]
  verdict?: React.ReactNode
  cols?: 2 | 3 | 4
}) {
  return (
    <section className="rounded-3xl border bg-card p-5 sm:p-8">
      <p className="mb-1 font-mono text-sm text-brand">{index}</p>
      <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
      <p className="mt-1 mb-6 text-muted-foreground">{what}</p>
      <div
        className={cn(
          "grid gap-5 sm:grid-cols-2",
          cols === 3 && "lg:grid-cols-3",
          cols === 4 && "lg:grid-cols-4"
        )}
      >
        {clips.map((c) => (
          <ClipCard key={c.id} clip={c} />
        ))}
      </div>
      {verdict && (
        <div className="mt-6 rounded-r-lg border-l-4 border-brand bg-muted/50 px-4 py-3 text-sm leading-relaxed">
          {verdict}
        </div>
      )}
    </section>
  )
}

const shotNames: Record<Shot, string> = {
  storm: "Sandstorm (scene 7)",
  bats: "Inside the shrine with bats (scene 14)",
  flag: "Flag on the shrine (scene 15)",
}

function Prompt({ text, highlight }: { text: string; highlight?: string }) {
  const parts = highlight ? text.split(highlight) : [text]
  return (
    <pre className="overflow-x-auto rounded-xl bg-muted/60 p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap">
      {parts[0]}
      {highlight && parts.length > 1 && (
        <>
          <mark className="rounded bg-brand/25 px-0.5 text-foreground">{highlight}</mark>
          {parts[1]}
        </>
      )}
    </pre>
  )
}

const stats = [
  { label: "GPU", value: "RTX 3070 Ti · 8 GB" },
  { label: "Output", value: "1344 × 768 · 24 fps" },
  { label: "Test clips", value: "21" },
  { label: "Cost", value: "$0 (local)" },
]

export default function H3TestsPage() {
  const prompts = data.prompts as Record<Shot, { image: string; full: string; motion: string; action: string | null }>

  return (
    <>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 md:py-16">
        <Link href="/" className={cn(buttonVariants({ variant: "ghost" }), "-ml-3 mb-8")}>
          <ArrowLeft /> Back to portfolio
        </Link>

        <header className="mb-12">
          <p className="mb-3 font-mono text-sm text-brand">
            lab <span className="text-muted-foreground">/ documentary pipeline</span>
          </p>
          <h1 className="text-4xl font-bold md:text-6xl">
            Tuning <span className="text-gradient">MiniMax H3</span> on an 8 GB GPU
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Test renders for an AI documentary pipeline. The open-weights MiniMax H3 image-to-video model runs
            locally in ComfyUI, driven by a Python script through its API. Each comparison uses the same still image and
            the same seed (30000); only one setting changes, so the differences are the setting&apos;s doing.
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
            {["MiniMax H3", "ComfyUI API", "Python", "ffmpeg", "PSNR / motion metrics"].map((t) => (
              <Badge key={t} variant="outline" className="font-mono">
                {t}
              </Badge>
            ))}
          </div>
        </header>

        <section className="mb-10 rounded-3xl border bg-gradient-to-br from-brand/15 via-card to-brand-2/15 p-5 sm:p-8">
          <h2 className="text-2xl font-bold md:text-3xl">The result</h2>
          <ul className="mt-4 space-y-2 leading-relaxed">
            <li>
              <b>Full model at 20 steps</b> beats the turbo LoRA on detail (sharper hair, straps, fabric) for about 1.9× the
              render time. 30 steps adds nothing visible.
            </li>
            <li>
              <b>5 seconds is the clip limit</b> on 8 GB at 1344×768: 10 s runs out of GPU memory on the first sampling
              step.
            </li>
            <li>
              <b>Settings don&apos;t fix stillness; wording does.</b> Sigma shift and a generic &quot;make it move&quot;
              line barely changed the clip. Describing specific events (&quot;a dozen bats drop and swirl through the
              beams&quot;) raised measured motion by 75%.
            </li>
          </ul>
          <p className="mt-4 font-mono text-sm text-muted-foreground">
            Production preset: full model · 20 steps · res_multistep / simple · shift 12 (default) · 5 s · action prompts
          </p>
        </section>

        <div className="space-y-8">
          <Section
            index="01 / detail"
            title="Turbo LoRA vs full model"
            what="Sandstorm shot: a moving person, the hardest test for detail and identity consistency."
            clips={[
              { id: "storm_A_base8", label: "Turbo LoRA · 8 steps", note: "Softer, slightly waxy skin and fabric." },
              { id: "storm_Z_full20", label: "Full model · 20 steps", pick: true, note: "Sharper hair, straps, buckles and face-wrap texture." },
              { id: "storm_Z_full30", label: "Full model · 30 steps", note: "Practically identical to 20 steps for +50% time." },
            ]}
            verdict="He jogs toward camera in all three: that's the prompt, not the settings."
          />

          <Section
            index="02 / low light"
            title="Dark interior with small moving subjects"
            what="Inside the shrine: light beams, dust, bats."
            cols={2}
            clips={[
              { id: "bats_A_base8", label: "Turbo LoRA · 8 steps", note: "More life: bats peel off and fly through the beams." },
              { id: "bats_Z_full20", label: "Full model · 20 steps", note: "Cleaner and steadier, but the bats barely move." },
            ]}
            verdict="Turbo wins on motion here, which set up the motion experiments below."
          />

          <Section
            index="03 / exterior"
            title="Wind, fabric and a bright sky"
            what="Flag on the shrine dome."
            cols={2}
            clips={[
              { id: "flag_A_base8", label: "Turbo LoRA · 8 steps", note: "Good flutter; one hazy veil passes over the dome mid-clip." },
              { id: "flag_Z_full20", label: "Full model · 20 steps", pick: true, note: "Clean all the way through, similar flutter." },
            ]}
          />

          <Section
            index="04 / hardware"
            title="How long can one clip be?"
            what="Full model, 20 steps, same storm image."
            cols={2}
            clips={[
              { id: "storm_L_5s", label: "5 seconds", pick: true, note: "Same man and kit start to finish, no drift." },
              { id: "storm_L_10s", label: "10 seconds", fail: "✕ Out of GPU memory on the first sampling step", note: "The 8 GB limit is between 5 and 10 s at this size. Longer shots get chained with the continuation workflow." },
            ]}
          />

          <Section
            index="05 / motion"
            title="Can settings add motion to the full model?"
            what="Sigma shift moves the step budget between big-picture motion (high noise) and fine detail (low noise). H3's default is 12."
            clips={(["bats", "flag", "storm"] as Shot[]).flatMap((s) => [
              { id: `${s}_M_shift8`, label: `${s[0].toUpperCase()}${s.slice(1)} · shift 8` },
              { id: `${s}_M_shift16`, label: `${s[0].toUpperCase()}${s.slice(1)} · shift 16` },
              { id: `${s}_M_motion`, label: `${s[0].toUpperCase()}${s.slice(1)} · generic motion line` },
            ])}
            verdict="None of the nine moved meaningfully more than the default. Similarity to the default clip stayed high (PSNR 28–42 dB; turbo vs full is 24 dB for scale)."
          />

          <section className="rounded-3xl border bg-card p-5 sm:p-8">
            <p className="mb-1 font-mono text-sm text-brand">05b / proof</p>
            <h2 className="text-2xl font-bold md:text-3xl">What sigma shift actually changes</h2>
            <p className="mt-1 mb-6 text-muted-foreground">
              Difference maps of one mid-clip frame against the default (black = identical, white = changed, amplified).
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${BASE}/diff_bats.png`} alt="Difference heat maps: shift 8, shift 16 and turbo against the default" className="w-full rounded-xl" />
            <div className="mt-6 rounded-r-lg border-l-4 border-brand bg-muted/50 px-4 py-3 text-sm leading-relaxed">
              Shift 8 and 16 only change fine texture: wall grain and edges. Turbo changes whole regions (light beams,
              posture, brightness), which is real change in content and motion.
            </div>
          </section>

          <Section
            index="06 / motion, again"
            title="Turbo + full model in one render, and specific wording"
            what="One shared 20-step schedule split with SplitSigmas: the turbo LoRA plans motion in the first N steps, the full model finishes the detail. Motion = mean frame-to-frame change."
            cols={4}
            clips={[
              { id: "bats_X_mix4", label: "Turbo 4 + full 16", note: "Motion 3.29: light and dust shift, bats barely move." },
              { id: "bats_X_mix8", label: "Turbo 8 + full 12", note: "Motion 1.71: static." },
              { id: "bats_X_action", label: "Full + action prompt", pick: true, note: "Motion 3.24: the bats swarm through the beams." },
              { id: "bats_X_mix4act", label: "Mix 4 + action prompt", note: "Motion 3.26: almost identical to action alone." },
            ]}
            verdict={
              <>
                For reference: full model with the default prompt = 1.85, turbo = 2.91. <b>Specific events in the prompt fixed
                the stillness; mixing in turbo added little.</b> Still to fix: the bats come out oversized and smeary.
              </>
            }
          />

          <section className="rounded-3xl border bg-card p-5 sm:p-8">
            <p className="mb-1 font-mono text-sm text-brand">07 / prompts</p>
            <h2 className="text-2xl font-bold md:text-3xl">Prompts used</h2>
            <p className="mt-1 mb-6 text-muted-foreground">
              Structure: style → location → scene, then SHOT 1 (motion, camera, &quot;stays exactly as in image 1&quot;),
              then audio. H3 generates its own soundtrack with each clip.
            </p>
            <div className="divide-y">
              {(Object.keys(prompts) as Shot[]).map((s) => (
                <details key={s} className="py-3">
                  <summary className="cursor-pointer font-semibold">
                    {shotNames[s]} <span className="font-mono text-xs font-normal text-muted-foreground">· {prompts[s].image}</span>
                  </summary>
                  <div className="mt-3 space-y-3">
                    <p className="text-sm text-muted-foreground">Base prompt (turbo, full model, shift and length tests):</p>
                    <Prompt text={prompts[s].full} />
                    <p className="text-sm text-muted-foreground">Generic motion line (section 05):</p>
                    <Prompt text={prompts[s].motion} highlight={data.motionLine} />
                    {prompts[s].action && (
                      <>
                        <p className="text-sm text-muted-foreground">Specific action prompt (section 06):</p>
                        <Prompt text={prompts[s].action} />
                      </>
                    )}
                  </div>
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

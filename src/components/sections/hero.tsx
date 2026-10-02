import { ArrowDownRight, Download, MapPin } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { GithubIcon, LinkedinIcon } from "@/components/icons"
import { about, profile } from "@/data/portfolio"
import { cn } from "@/lib/utils"

export function Hero() {
  const [first, ...rest] = profile.name.split(" ")

  return (
    <section id="top" className="relative flex min-h-svh items-center overflow-hidden pt-16">
      {/* Background: grid + glowing blobs, faded out toward the bottom edge */}
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_60%,transparent)]">
        <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
        <div className="animate-float absolute -top-24 -left-24 size-[28rem] rounded-full bg-brand/25 blur-[120px]" />
        <div className="animate-float absolute right-[-10rem] bottom-0 size-[32rem] rounded-full bg-brand-2/30 blur-[140px] [animation-delay:-7s]" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_auto]">
        <div>
          {profile.available && (
            <div className="mb-8 inline-flex animate-in items-center gap-2 rounded-full border bg-background/60 px-4 py-1.5 text-sm backdrop-blur duration-700 fade-in slide-in-from-bottom-4">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-brand" />
              </span>
              Open to new opportunities
            </div>
          )}

          <h1 className="animate-in text-6xl leading-[0.9] font-bold duration-700 fade-in slide-in-from-bottom-6 sm:text-8xl lg:text-[9rem]">
            {first}
            <br />
            <span className="text-gradient">{rest.join(" ")}</span>
          </h1>

          <p className="mt-8 max-w-2xl animate-in text-xl text-muted-foreground duration-1000 fade-in slide-in-from-bottom-8 sm:text-2xl">
            <span className="font-semibold text-foreground">
              {profile.role} <span className="text-brand">·</span> {profile.focus}.
            </span>{" "}
            {profile.tagline}
          </p>

          <div className="mt-4 flex items-center gap-2 font-mono text-sm text-muted-foreground">
            <MapPin className="size-4" /> {profile.location}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href="#projects" className={cn(buttonVariants({ size: "lg" }), "h-12 rounded-full px-6 text-base")}>
              View my work <ArrowDownRight />
            </a>
            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-12 rounded-full px-6 text-base")}
              >
                <Download /> Résumé
              </a>
            )}
            <div className="ml-1 flex gap-1">
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className={cn(buttonVariants({ variant: "ghost", size: "icon-lg" }), "rounded-full")}
              >
                <GithubIcon className="size-5" />
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className={cn(buttonVariants({ variant: "ghost", size: "icon-lg" }), "rounded-full")}
              >
                <LinkedinIcon className="size-5" />
              </a>
            </div>
          </div>
        </div>

        <CodeCard />
      </div>
    </section>
  )
}

function CodeCard() {
  const str = (value: string) => <span className="text-brand">&quot;{value}&quot;</span>
  const lines: React.ReactNode[] = [
    <>
      <span className="text-brand-2">const</span> developer = {"{"}
    </>,
    <>  name: {str(profile.name)},</>,
    <>  role: {str(profile.role)},</>,
    <>  focus: {str(profile.focus)},</>,
    <>  stack: [</>,
    ...about.skills.slice(0, 3).map((skill) => <>    {str(skill)},</>),
    <>  ],</>,
    <>  fuel: {str("hot choc")},</>,
    <>
      {"  "}tabsOpen: <span className="text-brand-2">Infinity</span>,
    </>,
    <>
      {"}"}
      <span className="ml-0.5 inline-block h-5 w-2 translate-y-1 animate-pulse bg-brand" />
    </>,
  ]

  return (
    <div className="hidden w-[360px] rotate-2 animate-in rounded-2xl border bg-card/80 font-mono text-sm shadow-2xl shadow-brand/10 backdrop-blur-xl delay-300 duration-1000 fill-mode-both fade-in slide-in-from-right-8 lg:block">
      <div className="flex items-center gap-1.5 border-b px-4 py-3">
        <span className="size-3 rounded-full bg-red-400/80" />
        <span className="size-3 rounded-full bg-yellow-400/80" />
        <span className="size-3 rounded-full bg-green-400/80" />
        <span className="ml-3 text-xs text-muted-foreground">developer.ts</span>
      </div>
      <pre className="overflow-hidden p-5 leading-7">
        {lines.map((line, i) => (
          <div key={i} className="whitespace-pre">
            {line}
          </div>
        ))}
      </pre>
    </div>
  )
}

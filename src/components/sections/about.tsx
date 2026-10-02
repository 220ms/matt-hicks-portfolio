import { GraduationCap } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { about } from "@/data/portfolio"

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-24 sm:px-6 md:py-32">
      <SectionHeading index="01" kicker="about" title="A bit about me" />

      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <Reveal className="space-y-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
          {about.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>

        <Reveal delay={150} className="space-y-3 self-start">
          <div className="grid grid-cols-3 gap-3">
            {about.stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border bg-card p-5">
                <div className="text-gradient font-heading text-4xl font-bold">{stat.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
          {about.education.map((edu) => (
            <div key={edu.school} className="flex items-center gap-4 rounded-2xl border bg-card p-5">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand">
                <GraduationCap className="size-5" />
              </div>
              <div>
                <div className="font-semibold">{edu.degree}</div>
                <div className="text-sm text-muted-foreground">
                  {edu.school} · {edu.start} – {edu.end}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{edu.detail}</div>
              </div>
            </div>
          ))}
        </Reveal>
      </div>

      <Reveal delay={100} className="mt-16">
        <h3 className="mb-5 font-mono text-sm tracking-widest text-muted-foreground uppercase">Toolbox</h3>
        <div className="flex flex-wrap gap-2.5">
          {about.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-brand hover:text-brand"
            >
              {skill}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

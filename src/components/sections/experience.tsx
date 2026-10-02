import { Badge } from "@/components/ui/badge"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { experience } from "@/data/portfolio"

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-16 border-y bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32">
        <SectionHeading index="02" kicker="experience" title="Where I've worked" />

        <ol className="relative space-y-12 border-l pl-8 md:pl-12">
          {experience.map((job, i) => (
            <li key={`${job.company}-${job.start}`} className="relative">
              <span className="absolute top-2 -left-[calc(2rem+5px)] size-2.5 rounded-full bg-brand ring-4 ring-background md:-left-[calc(3rem+5px)]" />
              <Reveal delay={i * 100} className="grid gap-4 md:grid-cols-[180px_1fr] md:gap-10">
                <div className="font-mono text-sm text-muted-foreground">
                  {job.start} — {job.end}
                  {job.location && <div className="mt-1">{job.location}</div>}
                </div>
                <div>
                  <h3 className="text-2xl font-bold md:text-3xl">{job.role}</h3>
                  <p className="mt-1 text-lg font-medium text-brand">
                    {job.companyUrl ? (
                      <a
                        href={job.companyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="underline-offset-4 hover:underline"
                      >
                        {job.company}
                      </a>
                    ) : (
                      job.company
                    )}
                  </p>
                  {job.highlights.length > 0 && (
                    <ul className="mt-5 space-y-2.5 text-muted-foreground">
                      {job.highlights.map((h) => (
                        <li key={h} className="flex gap-3">
                          <span className="mt-3 h-px w-4 shrink-0 bg-brand" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                  {job.tech.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {job.tech.map((t) => (
                        <Badge key={t} variant="secondary" className="font-mono">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

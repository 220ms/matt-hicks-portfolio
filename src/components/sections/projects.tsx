import { ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { GithubIcon } from "@/components/icons"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { projects } from "@/data/portfolio"
import { cn } from "@/lib/utils"

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-24 sm:px-6 md:py-32">
      <SectionHeading index="03" kicker="projects" title="Things I've built" />

      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={(i % 2) * 120}>
            <Card
              className={cn(
                "group h-full gap-6 rounded-3xl py-8 transition-all duration-300 hover:-translate-y-1 hover:ring-brand/60",
                i === 0 && "bg-gradient-to-br from-brand/15 via-card to-brand-2/15"
              )}
            >
              <CardHeader className="px-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-2 font-mono text-xs tracking-wider text-brand uppercase">{project.meta}</p>
                    <CardTitle className="text-2xl font-bold md:text-3xl">
                      {project.title}
                    </CardTitle>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${project.title} source code`}
                        className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        <GithubIcon className="size-5" />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${project.title} live site`}
                        className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-brand"
                      >
                        <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-8">
                <p className="leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-1 font-medium text-brand underline-offset-4 hover:underline"
                  >
                    Visit {new URL(project.live).hostname.replace(/^www\./, "")}
                    <ArrowUpRight className="size-4" />
                  </a>
                )}
              </CardContent>
              <CardFooter className="mt-auto flex-wrap gap-2 border-0 bg-transparent px-8">
                {project.tech.map((t) => (
                  <Badge key={t} variant="outline" className="font-mono">
                    {t}
                  </Badge>
                ))}
              </CardFooter>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

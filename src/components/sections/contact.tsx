import { ArrowUpRight, Mail } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { GithubIcon, LinkedinIcon } from "@/components/icons"
import { Reveal } from "@/components/reveal"
import { profile } from "@/data/portfolio"
import { cn } from "@/lib/utils"

const channels = [
  { label: "GitHub", href: profile.socials.github, icon: GithubIcon },
  { label: "LinkedIn", href: profile.socials.linkedin, icon: LinkedinIcon },
]

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-16 overflow-hidden border-t">
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-brand/15 to-transparent" />
      <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-40">
        <Reveal>
          <p className="mb-3 font-mono text-sm text-brand">
            04 <span className="text-muted-foreground">/ contact</span>
          </p>
          <h2 className="max-w-4xl text-5xl leading-[0.95] font-bold md:text-8xl">
            Let&apos;s build <span className="text-gradient">something great.</span>
          </h2>
          <p className="mt-8 max-w-xl text-lg text-muted-foreground md:text-xl">
            {profile.available
              ? "I'm open to full-time roles and interesting projects. Email is the quickest way to reach me."
              : "Want to talk tech, data or adtech? Email is the quickest way to reach me."}
          </p>
        </Reveal>

        <Reveal delay={150} className="mt-12 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href={`mailto:${profile.email}`}
            className={cn(buttonVariants({ size: "lg" }), "h-14 rounded-full px-8 text-base")}
          >
            <Mail /> Email me
          </a>
          <div className="flex gap-3">
            {channels.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "group h-14 flex-1 rounded-full px-6 text-base sm:flex-none"
                )}
              >
                <Icon className="size-5" /> {label}
                <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

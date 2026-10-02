import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { about, experience, profile, resume } from "@/data/portfolio"
import { cn } from "@/lib/utils"
import { PrintButton } from "./print-button"

export const metadata: Metadata = {
  title: `${profile.name} — Résumé`,
  description: `Résumé of ${profile.name}, ${profile.role} (${profile.focus}) in ${profile.location}.`,
}

const stripProtocol = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-2.5 border-b border-zinc-200 pb-1 font-heading text-[11px] font-bold tracking-[0.18em] text-violet-700 uppercase">
      {children}
    </h2>
  )
}

export default function ResumePage() {
  const contacts = [
    { label: profile.email, href: `mailto:${profile.email}` },
    { label: stripProtocol(profile.socials.linkedin), href: profile.socials.linkedin },
    { label: stripProtocol(profile.socials.github), href: profile.socials.github },
  ]

  return (
    <div className="min-h-full bg-zinc-100 py-8 print:bg-white print:py-0">
      {/* Toolbar — hidden when printing */}
      <div className="mx-auto mb-6 flex max-w-[210mm] items-center justify-between px-4 print:hidden">
        <Link href="/" className={cn(buttonVariants({ variant: "ghost" }), "text-zinc-700 hover:bg-zinc-200")}>
          <ArrowLeft /> Back to portfolio
        </Link>
        <PrintButton />
      </div>

      {/* A4 sheet */}
      <article className="mx-auto min-h-[297mm] max-w-[210mm] bg-white px-[14mm] py-[11mm] text-[12.5px] leading-[1.45] text-zinc-800 shadow-xl print:min-h-0 print:shadow-none">
        <header className="mb-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b-2 border-zinc-900 pb-4">
          <div>
            <h1 className="font-heading text-[32px] leading-none font-bold tracking-tight text-zinc-950">
              {profile.name}
            </h1>
            <p className="mt-1.5 text-[15px] font-medium text-violet-700">
              {profile.role} · {profile.focus}
            </p>
            <p className="mt-0.5 text-[12px] text-zinc-500">{profile.location}
            </p>
          </div>
          <ul className="space-y-0.5 text-right text-[11.5px] text-zinc-600">
            {contacts.map((c) => (
              <li key={c.href}>
                <a href={c.href} className="hover:text-violet-700">
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </header>

        <section className="mb-5">
          <SectionTitle>Summary</SectionTitle>
          <p>{resume.summary}</p>
        </section>

        <section className="mb-5">
          <SectionTitle>Experience</SectionTitle>
          <div className="space-y-3.5">
            {experience.map((job) => (
              <div key={`${job.company}-${job.start}`} className="break-inside-avoid">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="text-[14px] font-bold text-zinc-950">
                    {job.role} <span className="font-medium text-zinc-500">·</span>{" "}
                    {job.companyUrl ? (
                      <a href={job.companyUrl} className="text-violet-700 hover:underline">
                        {job.company}
                      </a>
                    ) : (
                      <span className="text-violet-700">{job.company}</span>
                    )}
                  </h3>
                  <span className="text-[11.5px] text-zinc-500 tabular-nums">
                    {job.start} – {job.end}
                    {job.location && ` · ${job.location}`}
                  </span>
                </div>
                <ul className="mt-1 list-disc space-y-0.5 pl-4 marker:text-zinc-400">
                  {job.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-5">
          <SectionTitle>Projects</SectionTitle>
          <div className="space-y-3">
            {resume.projects.map((project) => (
              <div key={project.title} className="break-inside-avoid">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="text-[14px] font-bold text-zinc-950">
                    {project.title} <span className="text-[11.5px] font-medium text-zinc-500">· {project.meta}</span>
                  </h3>
                  {project.link && (
                    <a href={`https://${project.link}`} className="text-[11.5px] text-violet-700">
                      {project.link}
                    </a>
                  )}
                </div>
                {project.tech && <p className="text-[11.5px] text-zinc-500 italic">{project.tech}</p>}
                <ul className="mt-1 list-disc space-y-0.5 pl-4 marker:text-zinc-400">
                  {project.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <div className="grid gap-5 sm:grid-cols-[1.5fr_1fr] print:grid-cols-[1.5fr_1fr]">
          <section>
            <SectionTitle>Skills</SectionTitle>
            <dl className="space-y-1">
              {resume.skillGroups.map((group) => (
                <div key={group.label} className="flex gap-2">
                  <dt className="w-[88px] shrink-0 font-semibold text-zinc-950">{group.label}</dt>
                  <dd>{group.items.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section>
            <SectionTitle>Education</SectionTitle>
            {about.education.map((edu) => (
              <div key={edu.school}>
                <h3 className="font-bold text-zinc-950">{edu.degree}</h3>
                <p>
                  {edu.school} · {edu.start} – {edu.end}
                </p>
                <p className="text-[11.5px] text-zinc-500">{edu.detail}</p>
              </div>
            ))}
          </section>
        </div>
      </article>
    </div>
  )
}

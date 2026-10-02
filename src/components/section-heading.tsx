import { Reveal } from "@/components/reveal"

export function SectionHeading({ index, title, kicker }: { index: string; title: string; kicker: string }) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <p className="mb-3 font-mono text-sm text-brand">
        {index} <span className="text-muted-foreground">/ {kicker}</span>
      </p>
      <h2 className="text-4xl font-bold md:text-6xl">{title}</h2>
    </Reveal>
  )
}

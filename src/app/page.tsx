import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { About } from "@/components/sections/about"
import { Contact } from "@/components/sections/contact"
import { Experience } from "@/components/sections/experience"
import { Hero } from "@/components/sections/hero"
import { Projects } from "@/components/sections/projects"

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}

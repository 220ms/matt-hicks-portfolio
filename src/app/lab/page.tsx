import type { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, FileCode, FileImage, FileText, Film, Folder, FolderOpen, HardDrive } from "lucide-react"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { lab, labFolders, type LabEntry } from "@/data/lab"
import { profile } from "@/data/portfolio"

export const metadata: Metadata = {
  title: `Lab — ${profile.name}`,
  description: "Experiments and work in progress: AI video, local models and pipelines.",
}

const kindIcon = { video: Film, doc: FileText, code: FileCode, image: FileImage }
const kindLabel = { video: "Video tests", doc: "Write-up", code: "Code", image: "Image tests" }

function FileRow({ entry }: { entry: LabEntry }) {
  const Icon = kindIcon[entry.kind]
  return (
    <Link
      href={`/lab/${entry.slug}`}
      className="group grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 rounded-lg px-3 py-3 transition-colors hover:bg-brand/10 focus-visible:bg-brand/10 focus-visible:outline-none sm:grid-cols-[minmax(0,1fr)_8rem_7rem_6rem]"
    >
      <span className="flex min-w-0 items-center gap-3">
        <Icon className="size-5 shrink-0 text-brand" />
        <span className="min-w-0">
          <span className="block truncate font-mono text-sm font-medium group-hover:text-brand">{entry.slug}</span>
          <span className="block truncate text-xs text-muted-foreground">{entry.title}</span>
        </span>
      </span>
      <span className="hidden font-mono text-xs text-muted-foreground sm:block">{kindLabel[entry.kind]}</span>
      <span className="hidden font-mono text-xs text-muted-foreground sm:block">{entry.size}</span>
      <span className="text-right font-mono text-xs text-muted-foreground">{entry.date}</span>
    </Link>
  )
}

export default function LabPage() {
  const folders = Object.keys(labFolders)
  const total = lab.length

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pt-28 pb-24 sm:px-6 md:pt-36">
        <p className="mb-3 font-mono text-sm text-brand">
          lab <span className="text-muted-foreground">/ experiments</span>
        </p>
        <h1 className="text-4xl font-bold md:text-6xl">
          Things I&apos;m <span className="text-gradient">testing</span>
        </h1>
        <p className="mt-5 mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Work in progress, written up as I go: what I tried, what the numbers said and what I&apos;d do next.
        </p>

        {/* File-explorer window */}
        <div className="overflow-hidden rounded-2xl border bg-card shadow-2xl shadow-black/20">
          {/* Title bar */}
          <div className="flex items-center gap-3 border-b bg-muted/50 px-4 py-2.5">
            <div className="flex gap-1.5" aria-hidden>
              <span className="size-3 rounded-full bg-red-400/80" />
              <span className="size-3 rounded-full bg-yellow-400/80" />
              <span className="size-3 rounded-full bg-green-400/80" />
            </div>
            <p className="flex-1 truncate text-center font-mono text-xs text-muted-foreground">~/matt/lab — Explorer</p>
            <span className="w-12" aria-hidden />
          </div>

          {/* Address bar */}
          <div className="flex items-center gap-1 border-b px-4 py-2 font-mono text-xs">
            <HardDrive className="size-3.5 text-muted-foreground" />
            <span className="text-muted-foreground">matthicks.com.au</span>
            <ChevronRight className="size-3.5 text-muted-foreground" />
            <span className="text-foreground">lab</span>
          </div>

          <div className="grid md:grid-cols-[15rem_1fr]">
            {/* Sidebar tree */}
            <nav aria-label="Lab folders" className="border-b p-3 font-mono text-sm md:border-r md:border-b-0">
              <p className="px-2 pb-2 text-[11px] tracking-widest text-muted-foreground uppercase">Folders</p>
              <div className="flex items-center gap-2 rounded-md px-2 py-1.5 text-foreground">
                <FolderOpen className="size-4 text-brand" /> lab
              </div>
              <ul className="ml-4 border-l pl-2">
                {folders.map((f) => (
                  <li key={f}>
                   <details open className="group">
                    <summary className="flex cursor-pointer list-none items-center gap-1.5 rounded-md px-1 py-1.5 text-muted-foreground select-none hover:bg-muted hover:text-foreground [&::-webkit-details-marker]:hidden">
                      <ChevronRight className="size-3.5 shrink-0 transition-transform group-open:rotate-90" />
                      <Folder className="size-4 shrink-0 text-brand/80 group-open:hidden" />
                      <FolderOpen className="hidden size-4 shrink-0 text-brand group-open:block" />
                      <span className="truncate">{f}</span>
                    </summary>
                    <ul className="ml-4 border-l pl-2">
                      {lab.filter((e) => e.folder === f).map((e) => {
                        const Icon = kindIcon[e.kind]
                        return (
                          <li key={e.slug}>
                            <Link href={`/lab/${e.slug}`} className="flex items-center gap-2 rounded-md px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-brand">
                              <Icon className="size-4 shrink-0" />
                              <span className="truncate">{e.slug}</span>
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                   </details>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Main pane */}
            <div className="min-w-0 p-3">
              <div className="hidden grid-cols-[minmax(0,1fr)_8rem_7rem_6rem] gap-x-4 border-b px-3 pb-2 font-mono text-[11px] tracking-widest text-muted-foreground uppercase sm:grid">
                <span>Name</span>
                <span>Type</span>
                <span>Size</span>
                <span className="text-right">Modified</span>
              </div>
              {folders.map((f) => (
                <details key={f} id={f} open className="group scroll-mt-24 pt-3">
                  <summary className="flex cursor-pointer list-none flex-col rounded-lg px-3 py-1.5 select-none hover:bg-muted [&::-webkit-details-marker]:hidden">
                    <span className="flex items-center gap-2">
                      <ChevronRight className="size-3.5 shrink-0 text-muted-foreground transition-transform group-open:rotate-90" />
                      <Folder className="size-4 text-brand/80 group-open:hidden" />
                      <FolderOpen className="hidden size-4 text-brand group-open:block" />
                      <span className="font-mono text-sm font-semibold">{f}/</span>
                      <span className="font-mono text-xs text-muted-foreground">
                        ({lab.filter((e) => e.folder === f).length})
                      </span>
                    </span>
                    <span className="pt-0.5 pl-[3.25rem] text-xs text-muted-foreground">{labFolders[f]}</span>
                  </summary>
                  <div className="pt-1 pl-6">
                    {lab.filter((e) => e.folder === f).map((e) => (
                      <FileRow key={e.slug} entry={e} />
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* Status bar */}
          <div className="flex justify-between border-t bg-muted/50 px-4 py-1.5 font-mono text-[11px] text-muted-foreground">
            <span>
              {folders.length} folder{folders.length === 1 ? "" : "s"} · {total} item{total === 1 ? "" : "s"}
            </span>
            <span>more coming</span>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}

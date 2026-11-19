// Experiments listed on /lab (shown as a file explorer), newest first.
export const labFolders: Record<string, string> = {
  "documentary-pipeline": "AI documentary pipeline: local video, images and narration",
}

export type LabEntry = {
  slug: string
  folder: string // folder in the explorer tree
  kind: "video" | "doc" | "code" | "image"
  size: string // e.g. "21 clips"
  title: string
  date: string // shown as-is
  summary: string
  tags: string[]
  status: "ongoing" | "done"
}

export const lab: LabEntry[] = [
  {
    slug: "h3-tests",
    folder: "documentary-pipeline",
    kind: "video",
    size: "21 clips",
    title: "Tuning MiniMax H3 on an 8 GB GPU",
    date: "Nov 2026",
    summary:
      "Side-by-side test renders for an AI documentary pipeline: turbo LoRA vs full model, clip-length limits, sigma shift, and why specific action wording beats every setting for motion. All rendered locally on an RTX 3070 Ti.",
    tags: ["MiniMax H3", "ComfyUI", "Python", "ffmpeg"],
    status: "ongoing",
  },
]

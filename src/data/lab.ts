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
    slug: "image-model-showdown",
    folder: "documentary-pipeline",
    kind: "image",
    size: "23 images",
    title: "Local image model showdown",
    date: "Nov 2026",
    summary:
      "FLUX 3 Klein (int8 and bf16), Qwen Image Edit 2511 (Lightning and full), MOSS-Image and Gemini, head to head on four documentary scenes with the same prompt, seed and character reference.",
    tags: ["FLUX 3 Klein", "Qwen Image Edit", "MOSS-Image", "Gemini"],
    status: "done",
  },
  {
    slug: "sensenova-study",
    folder: "documentary-pipeline",
    kind: "image",
    size: "30 renders",
    title: "Tuning SenseNova U1.5 on an 8 GB GPU",
    date: "Nov 2026",
    summary:
      "A one-factor-at-a-time study of the SenseNova U1.5 image model: quantisation, steps, guidance, reference strength, thinking mode, seeds and resolution, with FLUX 3 Klein as the bar to beat.",
    tags: ["SenseNova U1.5", "ComfyUI", "Python"],
    status: "done",
  },
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

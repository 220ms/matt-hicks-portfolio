import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"

// Hex equivalents of the dark-theme tokens in globals.css (ImageResponse can't read CSS variables)
const BACKGROUND = "#0c0b13"
const FOREGROUND = "#f4f3f8"
const BRAND = "#b6f24a"

// Renders the "MH." logo from the site header as a square PNG.
export async function brandIcon(size: number, { rounded }: { rounded: boolean }) {
  const font = await readFile(join(process.cwd(), "src/assets/SpaceGrotesk-Bold.ttf"))

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: BACKGROUND,
          borderRadius: rounded ? size * 0.22 : 0,
          color: FOREGROUND,
          fontFamily: "Space Grotesk",
          fontSize: size * 0.5,
          letterSpacing: -size * 0.03,
          // Optically centre: the trailing dot makes the word look left-heavy
          paddingLeft: size * 0.04,
        }}
      >
        MH<span style={{ color: BRAND }}>.</span>
      </div>
    ),
    {
      width: size,
      height: size,
      fonts: [{ name: "Space Grotesk", data: font, weight: 700, style: "normal" }],
    }
  )
}

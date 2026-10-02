import type { Metadata } from "next"
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { profile } from "@/data/portfolio"
import "./globals.css"

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] })
const grotesk = Space_Grotesk({ variable: "--font-grotesk", subsets: ["latin"] })
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] })

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}, ${profile.focus}`,
  description: profile.tagline,
  openGraph: {
    title: `${profile.name} — ${profile.role}, ${profile.focus}`,
    description: profile.tagline,
    type: "website",
  },
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-AU"
      suppressHydrationWarning
      className={`${inter.variable} ${grotesk.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

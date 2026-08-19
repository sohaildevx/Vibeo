import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export default function Home() {
  return (
    <>
      <div className="relative flex flex-1 flex-col items-center justify-center gap-10 px-6 py-20">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
            Code in the{" "}
            <span className="underline decoration-[3px] underline-offset-[6px] text-[#8B5CF6]">
              vibe
            </span>
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            A modern code editor built for developers who love clean aesthetics and fluid workflows.
            Write, preview, and ship — all in one place.
          </p>
        </div>

        <div className="flex w-full max-w-md items-center justify-center overflow-hidden rounded-xl border bg-card/50 shadow-lg backdrop-blur-sm">
          <img
            src="/homeSVG.svg"
            alt="Vibeo Preview"
            className="h-auto w-full max-h-64 object-contain p-4"
          />
        </div>

        <Link
          href="/dashboard"
          className="inline-flex h-11 items-center gap-2 rounded-lg bg-black px-6 text-sm font-bold text-white shadow-md transition-all hover:opacity-90 hover:shadow-lg dark:bg-white dark:text-black"
        >
          Get Started
          <ArrowUpRight className="size-4" />
        </Link>
      </div>
    </>
  )
}

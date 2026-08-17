import { Separator } from "@/components/ui/separator"

export default function Footer() {
  return (
    <footer className="relative z-10 border-t bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="Vibeo" className="h-6 w-auto" />
            <span className="text-sm font-semibold">Vibeo</span>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
            <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
            <a href="#" className="hover:text-foreground transition-colors">Discord</a>
          </div>
        </div>

        <Separator />

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <p>Built for vibeCoders.</p>
          <p>&copy; {new Date().getFullYear()} Vibeo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

"use client"

import { useSession } from "next-auth/react"
import UserBtn from "@/modules/auth/components/User-btn"
import Link from "next/link"

export default function Header() {
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="Vibeo" className="h-8 w-auto" />
          <span className="text-lg font-semibold tracking-tight">Vibeo</span>
        </Link>

        <div className="flex items-center gap-4">
          {session?.user && <UserBtn />}
        </div>
      </div>
    </header>
  )
}

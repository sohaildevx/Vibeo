"use client"

import { useSession, signOut } from "next-auth/react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { LogOut, User } from "lucide-react"
import { useState } from "react"

export default function UserBtn() {
  const { data: session } = useSession()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  if (!session?.user) return null

  const { user } = session

  const handleLogout = async () => {
    setIsLoggingOut(true)
    await signOut()
  }

  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer outline-none rounded-full">
        <Avatar size="lg">
          {user.image ? (
            <AvatarImage src={user.image} alt={user.name || "User"} />
          ) : null}
          <AvatarFallback>
            {user.name?.charAt(0)?.toUpperCase() || <User className="size-4" />}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={8} className="w-64">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Avatar>
              {user.image ? (
                <AvatarImage src={user.image} alt={user.name || "User"} />
              ) : null}
              <AvatarFallback>
                {user.name?.charAt(0)?.toUpperCase() || <User className="size-4" />}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              {user.name && <span className="font-medium text-sm">{user.name}</span>}
              {user.email && (
                <span className="text-xs text-muted-foreground truncate max-w-[180px]">
                  {user.email}
                </span>
              )}
            </div>
          </div>
          <div className="h-px bg-border" />
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-2 w-full px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LogOut className={`size-4 ${isLoggingOut ? "animate-spin" : ""}`} />
            {isLoggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

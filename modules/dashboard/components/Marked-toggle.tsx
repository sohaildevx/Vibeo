"use client"

import {Button} from "@/components/ui/button"
import {Star, StarOff} from "lucide-react"
import type React from "react"
import {useState, useEffect, forwardRef} from "react"
import {toast} from "sonner"
import {toggleStarMarked} from "@/modules/dashboard/actions/index"

interface MarkedToggleButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {
    markedForRevision: boolean
    id: string
}

const MarkedToggleButton = forwardRef<HTMLButtonElement, MarkedToggleButtonProps>(({markedForRevision, id, className, children, ...props}, ref) => {

  const [isMarked, setIsMarked] = useState(markedForRevision)

  useEffect(()=>{
    setIsMarked(markedForRevision)
  },[markedForRevision])

  const handleToggle = async()=>{
    const newMarkedState = !isMarked
    setIsMarked(newMarkedState)

    try {
      const res = await toggleStarMarked(id, newMarkedState)
      const {success, error, isMarked: marked} = res;

      if(marked && !error && success){
        toast.success("Added to Favorites successfully")
      }else{
        toast.success("Removed from Favorites")
      }

    } catch (error) {
      setIsMarked(isMarked)
    }
  }
  return (
    <Button 
    ref={ref}
    variant="ghost"
    className={`flex items-center justify-center w-full px-2 py-1.5 text-sm rounded-md cursor-pointer ${className}`}
    onClick={handleToggle}
    {...props}
    >
      {isMarked ? <StarOff className="h-4 w-4 mr-2" /> : <Star className="h-4 w-4 mr-2" />}
      {isMarked ? "Unstar" : "Star"}
    </Button>
  )
})

MarkedToggleButton.displayName = "MarkedToggleButton"

export default MarkedToggleButton

export interface PlaygroundData {
  id: string
  name: string
  icon: string
  starred: boolean
}


export interface User {
  id:string
  name:string | null
  email:string
  image:string | null
  role:string
  createdAt:Date
  updatedAt:Date
}

export interface Project {
  id:string
  title:string
  description: string | null
  template: PlaygroundTemplate
  createdAt: Date
  updatedAt: Date
  userId: string
  user: User
  Starmark: {isMarked: boolean}[]
}

export type PlaygroundTemplate =
  | "REACT"
  | "NEXTJS"
  | "EXPRESS"
  | "VUE"
  | "HONO"
  | "ANGULAR"

export interface CreatePlaygroundInput {
  title: string
  template: PlaygroundTemplate
  description?: string
}
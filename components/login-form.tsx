import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { FaGithub, FaGoogle } from "react-icons/fa"
import { signInWithGithub, signInWithGoogle } from "@/modules/auth/actions"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-blue-800">Welcome back</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Sign in to your account to continue
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email" className="text-blue-800 font-bold">Email</FieldLabel>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </Field>
        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="password" className="text-blue-800 font-bold">Password</FieldLabel>
            <a
              href="#"
              className="text-sm underline-offset-4 hover:underline text-blue-800 font-bold"
            >
              Forgot password?
            </a>
          </div>
          <Input id="password" type="password" required placeholder="Enter Password"/>
        </Field>
        <Field>
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </Field>
        <FieldSeparator>or continue with</FieldSeparator>
        <Field>
          <div className="grid grid-cols-2 gap-3">
            <form action={signInWithGithub}>
              <Button variant="outline" type="submit" className="w-full">
                <FaGithub className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </form>
            <form action={signInWithGoogle}>
              <Button variant="outline" type="submit" className="w-full">
                <FaGoogle className="mr-2 h-4 w-4" />
                Google
              </Button>
            </form>
          </div>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <a href="#" className="font-medium text-foreground underline underline-offset-4">
              Sign up
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </div>
  )
}

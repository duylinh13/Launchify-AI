'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { login } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'

const initialState = {
  error: null as string | null,
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button className="w-full h-12 rounded-full text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 border-0" type="submit" disabled={pending}>
      {pending ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
      {pending ? 'Logging in...' : 'Log in'}
    </Button>
  )
}

export function LoginForm() {
  const [state, formAction] = useFormState(login, initialState)

  return (
    <Card className="w-full max-w-[450px] mx-4 sm:mx-0 shadow-2xl border-border/50 bg-background/60 backdrop-blur-xl rounded-3xl overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple-600"></div>
      <CardHeader className="space-y-2 pb-8 pt-10">
        <CardTitle className="text-3xl font-extrabold text-center tracking-tight">Welcome back</CardTitle>
        <CardDescription className="text-center text-base">
          Enter your email and password to log in
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-6 px-8">
          <div className="space-y-3">
            <Label htmlFor="email" className="text-sm font-semibold">Email</Label>
            <Input id="email" name="email" type="email" placeholder="m@example.com" required className="h-12 rounded-xl bg-background/50 focus-visible:ring-primary/50 text-base px-4" />
          </div>
          <div className="space-y-3">
            <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
            <Input id="password" name="password" type="password" required className="h-12 rounded-xl bg-background/50 focus-visible:ring-primary/50 text-base px-4" />
          </div>
          {state?.error && (
            <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-lg text-center font-medium border border-destructive/20">
              {state.error}
            </div>
          )}
          <SubmitButton />
        </CardContent>
        <CardFooter className="flex justify-center pb-10 pt-4">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-semibold text-primary hover:underline hover:text-purple-500 transition-colors">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}

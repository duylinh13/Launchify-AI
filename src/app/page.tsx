import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
        Welcome to Launchify AI
      </h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
        The AI-powered Website & Landing Page Builder. Generate, edit, and publish stunning business websites in seconds.
      </p>
      <div className="flex gap-4">
        <Button asChild size="lg">
          <Link href="/signup">Get Started</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/login">Log In</Link>
        </Button>
      </div>
    </div>
  )
}

'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Global Error caught:', error)
  }, [error])

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background text-center p-4">
      <h2 className="text-2xl font-bold text-destructive mb-4">Something went wrong!</h2>
      <p className="text-muted-foreground mb-8 max-w-md">{error.message || "An unexpected error occurred."}</p>
      <Button onClick={() => reset()} className="rounded-full">
        Try again
      </Button>
    </div>
  )
}

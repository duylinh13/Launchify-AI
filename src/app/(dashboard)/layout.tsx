import { logout } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Sparkles, LogOut } from 'lucide-react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-x-hidden">
      {/* Premium Light Mode Mesh Gradient */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 animate-blob" />
        <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 animate-blob animation-delay-4000" />
      </div>

      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40">
        <div className="container flex h-16 items-center justify-between py-4 mx-auto px-4 md:px-8">
          <div className="flex items-center gap-2 text-primary">
            <Sparkles className="w-6 h-6" />
            <span className="text-xl font-extrabold tracking-tight text-foreground">Launchify AI</span>
          </div>
          <form action={logout}>
            <Button variant="ghost" type="submit" className="gap-2 rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Log out</span>
            </Button>
          </form>
        </div>
      </header>
      <main className="flex-1 w-full p-4 md:p-8 pt-6 container mx-auto relative z-10">{children}</main>
    </div>
  )
}

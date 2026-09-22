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
      {/* Global Mesh Gradient Background for VIP Pro Look */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/20 blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[150px] mix-blend-screen" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-blue-500/10 blur-[100px] mix-blend-screen" />
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

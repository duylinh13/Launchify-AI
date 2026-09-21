import { logout } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <span className="text-xl font-bold">Launchify AI</span>
          </div>
          <form action={logout}>
            <Button variant="outline" type="submit">
              Log out
            </Button>
          </form>
        </div>
      </header>
      <main className="flex-1 space-y-4 p-4 md:p-8 md:pt-6 container mx-auto">{children}</main>
    </div>
  )
}

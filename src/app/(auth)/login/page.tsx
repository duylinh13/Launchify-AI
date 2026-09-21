import { LoginForm } from '@/components/auth/login-form'

export const metadata = {
  title: 'Login - Launchify AI',
  description: 'Log in to your Launchify AI account',
}

export default function LoginPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-muted/40">
      <LoginForm />
    </div>
  )
}

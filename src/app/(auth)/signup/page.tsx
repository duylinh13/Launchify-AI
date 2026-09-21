import { SignupForm } from '@/components/auth/signup-form'

export const metadata = {
  title: 'Sign Up - Launchify AI',
  description: 'Create a new Launchify AI account',
}

export default function SignupPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-muted/40">
      <SignupForm />
    </div>
  )
}

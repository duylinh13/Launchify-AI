import { GenerateForm } from '@/components/website/GenerateForm'

export const metadata = {
  title: 'AI Generator - Launchify AI',
}

export default function GeneratePage() {
  return (
    <div className="w-full h-full">
      <GenerateForm />
    </div>
  )
}

import { GenerateForm } from '@/components/website/GenerateForm'

export const metadata = {
  title: 'AI Generator - Launchify AI',
}

export default function GeneratePage() {
  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold tracking-tight mb-6">AI Website Generator</h2>
      <GenerateForm />
    </div>
  )
}

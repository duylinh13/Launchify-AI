'use client'

import React, { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface DebouncedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  initialValue: string
  onDebounceChange: (value: string) => void
  debounceMs?: number
}

export function DebouncedInput({ 
  label, 
  initialValue, 
  onDebounceChange, 
  debounceMs = 300,
  ...props 
}: DebouncedInputProps) {
  const [value, setValue] = useState(initialValue)

  // Sync internal state if external initialValue changes (e.g. user clicked a different section)
  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timer = setTimeout(() => {
      // Only trigger update if value actually changed
      if (value !== initialValue) {
        onDebounceChange(value)
      }
    }, debounceMs)

    return () => clearTimeout(timer)
  }, [value, initialValue, debounceMs, onDebounceChange])

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input 
        value={value} 
        onChange={(e) => setValue(e.target.value)} 
        {...props} 
      />
    </div>
  )
}

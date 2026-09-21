import { describe, it, expect } from 'vitest'
import { GenerateWebsiteParamsSchema } from './generate'

describe('GenerateWebsiteParamsSchema Validation', () => {
  it('TC-08: Should reject payload missing critical business context', () => {
    const invalidPayload = {
      businessName: '', // empty string should fail min(1)
      businessType: 'Store',
      audience: 'Everyone',
      goal: 'Sell',
      tone: 'Fun',
      style: 'Minimal',
      primaryColor: '#000000',
    }
    const result = GenerateWebsiteParamsSchema.safeParse(invalidPayload)
    expect(result.success).toBe(false)
  })

  it('TC-09: Should reject invalid hex colors', () => {
    const invalidPayload = {
      businessName: 'My Store',
      businessType: 'Store',
      audience: 'Everyone',
      goal: 'Sell',
      tone: 'Fun',
      style: 'Minimal',
      primaryColor: 'red', // Not a hex
    }
    const result = GenerateWebsiteParamsSchema.safeParse(invalidPayload)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Must be a valid hex color')
    }
  })

  it('Should parse a perfectly valid API request', () => {
    const validPayload = {
      businessName: 'My Store',
      businessType: 'Store',
      audience: 'Everyone',
      goal: 'Sell',
      tone: 'Fun',
      style: 'Minimal',
      primaryColor: '#ff0000',
    }
    const result = GenerateWebsiteParamsSchema.safeParse(validPayload)
    expect(result.success).toBe(true)
  })
})

import { getMaterialById, getRecipeByProductId } from '@/data/mock-production'
import { useMemo } from 'react'

export interface MaterialRequirement {
  materialId: string
  materialName: string
  required: number
  available: number
  unit: string
  hasShortage: boolean
  shortageAmount: number
}

export interface BOMCalculationResult {
  materialRequirements: MaterialRequirement[]
  hasShortage: boolean
  canProceed: boolean
}

export const useBOMCalculator = (productId: string | null, quantity: number): BOMCalculationResult => {
  return useMemo(() => {
    // Default empty result
    if (!productId || quantity <= 0) {
      return {
        materialRequirements: [],
        hasShortage: false,
        canProceed: false
      }
    }

    // Get recipe for the selected product
    const recipe = getRecipeByProductId(productId)
    if (!recipe) {
      return {
        materialRequirements: [],
        hasShortage: false,
        canProceed: false
      }
    }

    // Calculate requirements for each ingredient
    const requirements: MaterialRequirement[] = recipe.ingredients.map((ingredient) => {
      const material = getMaterialById(ingredient.materialId)
      const required = ingredient.qtyPerBatch * quantity
      const available = material?.stock || 0
      const hasShortage = required > available
      const shortageAmount = hasShortage ? required - available : 0

      return {
        materialId: ingredient.materialId,
        materialName: ingredient.materialName,
        required,
        available,
        unit: ingredient.unit,
        hasShortage,
        shortageAmount
      }
    })

    // Check if there's any shortage
    const hasShortage = requirements.some((req) => req.hasShortage)
    const canProceed = !hasShortage

    return {
      materialRequirements: requirements,
      hasShortage,
      canProceed
    }
  }, [productId, quantity])
}

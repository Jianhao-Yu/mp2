export interface Ingredient {
  name: string
  measure: string
}

export interface DishMeta {
  chapter: string
  flavors: string[]
}

export interface Meal {
  id: string
  name: string
  category: string
  area: string
  image: string
  instructions: string
  ingredients: Ingredient[]
  tags: string[]
  youtube: string
  source: string
  chapter: string
  flavors: string[]
}

export interface PageProps {
  meals: Meal[]
  loading: boolean
  error: string
  onRetry: () => void
}

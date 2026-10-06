import axios from 'axios'
import { dishMeta } from '../data/dishMeta'
import type { Ingredient, Meal } from '../types'

interface ApiMeal {
  idMeal: string
  strMeal: string
  strCategory: string | null
  strArea: string | null
  strMealThumb: string
  strInstructions: string | null
  strTags: string | null
  strYoutube: string | null
  strSource: string | null
  [key: string]: string | null
}

interface MealResponse {
  meals: ApiMeal[] | null
}

const mealApi = axios.create({
  baseURL: 'https://www.themealdb.com/api/json/v1/1',
})

function getIngredients(meal: ApiMeal) {
  const ingredients: Ingredient[] = []

  for (let number = 1; number <= 20; number += 1) {
    const name = meal[`strIngredient${number}`]?.trim()
    const measure = meal[`strMeasure${number}`]?.trim()

    if (name) {
      ingredients.push({
        name,
        measure: measure || '',
      })
    }
  }

  return ingredients
}

function formatMeal(meal: ApiMeal): Meal {
  const meta = dishMeta[meal.strMeal] || {
    chapter: 'Home Cooking',
    flavors: ['Savory'],
  }

  return {
    id: meal.idMeal,
    name: meal.strMeal,
    category: meal.strCategory || 'Miscellaneous',
    area: meal.strArea || 'Chinese',
    image: meal.strMealThumb,
    instructions: meal.strInstructions || 'No instructions are available.',
    ingredients: getIngredients(meal),
    tags: meal.strTags ? meal.strTags.split(',') : [],
    youtube: meal.strYoutube || '',
    source: meal.strSource || '',
    chapter: meta.chapter,
    flavors: meta.flavors,
  }
}

export async function getChineseMeals() {
  const listResponse = await mealApi.get<MealResponse>('/filter.php?a=Chinese')
  const mealList = listResponse.data.meals || []

  const detailRequests = mealList.map((meal) =>
    mealApi.get<MealResponse>(`/lookup.php?i=${meal.idMeal}`),
  )
  const detailResponses = await Promise.all(detailRequests)

  return detailResponses
    .map((response) => response.data.meals?.[0])
    .filter((meal): meal is ApiMeal => Boolean(meal))
    .map(formatMeal)
}

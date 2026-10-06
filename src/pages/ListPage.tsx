import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import StatusMessage from '../components/StatusMessage'
import type { Meal, PageProps } from '../types'

type SortKey = 'name' | 'category' | 'ingredients'
type SortOrder = 'ascending' | 'descending'

function ListPage({ meals, loading, error, onRetry }: PageProps) {
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('name')
  const [sortOrder, setSortOrder] = useState<SortOrder>('ascending')

  const visibleMeals = useMemo(() => {
    const query = search.trim().toLowerCase()
    const filteredMeals = meals.filter((meal) => {
      const ingredientNames = meal.ingredients
        .map((ingredient) => ingredient.name)
        .join(' ')
        .toLowerCase()

      return meal.name.toLowerCase().includes(query) || ingredientNames.includes(query)
    })

    return [...filteredMeals].sort((firstMeal, secondMeal) => {
      const result =
        sortKey === 'ingredients'
          ? firstMeal.ingredients.length - secondMeal.ingredients.length
          : firstMeal[sortKey].localeCompare(secondMeal[sortKey])

      return sortOrder === 'ascending' ? result : -result
    })
  }, [meals, search, sortKey, sortOrder])

  const featuredMeal = meals.find((meal) => meal.id === '52947') || meals[0]

  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">CHINESE FOOD COLLECTION</p>
          <h1>Discover the Taste of China</h1>
          <p className="hero-description">
            Search a collection of Chinese meals, browse food images, and learn how each dish is made.
          </p>
          <Link className="primary-link" to="/gallery">
            View Gallery
          </Link>
        </div>

        <div className="hero-visual">
          {featuredMeal ? (
            <img src={featuredMeal.image} alt={featuredMeal.name} />
          ) : (
            <div className="hero-placeholder" />
          )}
        </div>
      </section>

      <section className="list-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">SEARCH AND SORT</p>
            <h2>Meal List</h2>
          </div>
          <p>Search by meal or ingredient. Use the menus to change how the results are sorted.</p>
        </div>

        <div className="control-panel">
          <label className="search-field">
            <span>Search meals</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Try chicken, tofu, or soup"
            />
          </label>

          <label>
            <span>Sort by</span>
            <select
              value={sortKey}
              onChange={(event) => setSortKey(event.target.value as SortKey)}
            >
              <option value="name">Meal name</option>
              <option value="category">Category</option>
              <option value="ingredients">Ingredient count</option>
            </select>
          </label>

          <label>
            <span>Order</span>
            <select
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value as SortOrder)}
            >
              <option value="ascending">Ascending</option>
              <option value="descending">Descending</option>
            </select>
          </label>
        </div>

        <StatusMessage loading={loading} error={error} onRetry={onRetry} />

        {!loading && !error && (
          <div className="results-block">
            <p className="result-count">{visibleMeals.length} meals found</p>

            {visibleMeals.length > 0 ? (
              <div className="meal-list">
                {visibleMeals.map((meal) => (
                  <MealListItem key={meal.id} meal={meal} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <h3>No meals found</h3>
                <p>Try a different meal name or ingredient.</p>
              </div>
            )}
          </div>
        )}
      </section>
    </>
  )
}

interface MealListItemProps {
  meal: Meal
}

function MealListItem({ meal }: MealListItemProps) {
  return (
    <Link className="meal-row" to={`/dish/${meal.id}`}>
      <img src={`${meal.image}/small`} alt={meal.name} loading="lazy" />
      <span className="meal-title">
        <strong>{meal.name}</strong>
        <small>{meal.chapter}</small>
      </span>
      <span className="meal-category">{meal.category}</span>
      <span className="meal-ingredients">{meal.ingredients.length} ingredients</span>
      <span className="row-arrow" aria-hidden="true">→</span>
    </Link>
  )
}

export default ListPage

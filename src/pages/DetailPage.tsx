import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import StatusMessage from '../components/StatusMessage'
import { chapterDescriptions } from '../data/dishMeta'
import type { PageProps } from '../types'

function DetailPage({ meals, loading, error, onRetry }: PageProps) {
  const { mealId } = useParams()
  const mealIndex = meals.findIndex((meal) => meal.id === mealId)
  const meal = meals[mealIndex]
  const previousMeal = meals[(mealIndex - 1 + meals.length) % meals.length]
  const nextMeal = meals[(mealIndex + 1) % meals.length]

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [mealId])

  if (loading || error) {
    return (
      <section className="detail-status">
        <StatusMessage loading={loading} error={error} onRetry={onRetry} />
      </section>
    )
  }

  if (!meal) {
    return (
      <section className="not-found">
        <h1>Meal not found</h1>
        <Link className="primary-link" to="/">
          Return to Meal List
        </Link>
      </section>
    )
  }

  return (
    <article className="detail-page">
      <Link className="back-link" to="/gallery">← Back to Gallery</Link>

      <header className="detail-hero">
        <img src={`${meal.image}/large`} alt={meal.name} />

        <div className="detail-heading">
          <p className="eyebrow">{meal.chapter}</p>
          <h1>{meal.name}</h1>
          <div className="flavor-tags">
            {meal.flavors.map((flavor) => (
              <span key={flavor}>{flavor}</span>
            ))}
          </div>
          <p className="meal-description">
            {chapterDescriptions[meal.chapter] || chapterDescriptions['Home Cooking']}
          </p>
          <dl className="quick-facts">
            <div>
              <dt>Category</dt>
              <dd>{meal.category}</dd>
            </div>
            <div>
              <dt>Area</dt>
              <dd>{meal.area}</dd>
            </div>
            <div>
              <dt>Ingredients</dt>
              <dd>{meal.ingredients.length}</dd>
            </div>
          </dl>
        </div>
      </header>

      <div className="recipe-content">
        <section className="ingredients-section">
          <h2>Ingredients</h2>
          <ul>
            {meal.ingredients.map((ingredient, index) => (
              <li key={`${ingredient.name}-${index}`}>
                <span>{ingredient.name}</span>
                <strong>{ingredient.measure || 'As needed'}</strong>
              </li>
            ))}
          </ul>
        </section>

        <section className="method-section">
          <h2>Instructions</h2>
          <p className="instructions">{meal.instructions}</p>
          <div className="source-links">
            {meal.source && (
              <a href={meal.source} target="_blank" rel="noreferrer">
                Original Recipe
              </a>
            )}
            {meal.youtube && (
              <a href={meal.youtube} target="_blank" rel="noreferrer">
                Watch Video
              </a>
            )}
          </div>
        </section>
      </div>

      <nav className="detail-pagination" aria-label="Meal navigation">
        <Link to={`/dish/${previousMeal.id}`}>
          <span>← Previous</span>
          <strong>{previousMeal.name}</strong>
        </Link>
        <Link to={`/dish/${nextMeal.id}`}>
          <span>Next →</span>
          <strong>{nextMeal.name}</strong>
        </Link>
      </nav>
    </article>
  )
}

export default DetailPage

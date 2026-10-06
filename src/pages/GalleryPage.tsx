import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import StatusMessage from '../components/StatusMessage'
import type { PageProps } from '../types'

function GalleryPage({ meals, loading, error, onRetry }: PageProps) {
  const [selectedChapters, setSelectedChapters] = useState<string[]>([])

  const chapters = useMemo(
    () => [...new Set(meals.map((meal) => meal.chapter))].sort(),
    [meals],
  )

  const visibleMeals = useMemo(() => {
    if (selectedChapters.length === 0) {
      return meals
    }

    return meals.filter((meal) => selectedChapters.includes(meal.chapter))
  }, [meals, selectedChapters])

  function toggleChapter(chapter: string) {
    if (selectedChapters.includes(chapter)) {
      setSelectedChapters(
        selectedChapters.filter((selected) => selected !== chapter),
      )
    } else {
      setSelectedChapters([...selectedChapters, chapter])
    }
  }

  return (
    <section className="gallery-page">
      <div className="page-heading">
        <p className="eyebrow">IMAGE COLLECTION</p>
        <h1>Meal Gallery</h1>
        <p>Select one or more categories to filter the gallery.</p>
      </div>

      <div className="filter-area">
        <div className="filter-buttons">
          {chapters.map((chapter) => (
            <button
              type="button"
              key={chapter}
              className={selectedChapters.includes(chapter) ? 'selected' : ''}
              onClick={() => toggleChapter(chapter)}
              aria-pressed={selectedChapters.includes(chapter)}
            >
              {chapter}
            </button>
          ))}
          {selectedChapters.length > 0 && (
            <button
              className="clear-filter"
              type="button"
              onClick={() => setSelectedChapters([])}
            >
              Clear Filters
            </button>
          )}
        </div>
        <p>{visibleMeals.length} meals shown</p>
      </div>

      <StatusMessage loading={loading} error={error} onRetry={onRetry} />

      {!loading && !error && (
        <div className="gallery-grid">
          {visibleMeals.map((meal) => (
            <Link className="gallery-card" to={`/dish/${meal.id}`} key={meal.id}>
              <img src={`${meal.image}/medium`} alt={meal.name} loading="lazy" />
              <div className="gallery-card-copy">
                <span>{meal.chapter}</span>
                <h2>{meal.name}</h2>
                <p>{meal.flavors.join(', ')}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}

export default GalleryPage

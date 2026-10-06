import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { getChineseMeals } from './services/mealApi'
import DetailPage from './pages/DetailPage'
import GalleryPage from './pages/GalleryPage'
import ListPage from './pages/ListPage'
import type { Meal } from './types'
import './App.css'

function App() {
  const [meals, setMeals] = useState<Meal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function loadMeals() {
    setLoading(true)
    setError('')

    try {
      const mealData = await getChineseMeals()
      setMeals(mealData)
    } catch {
      setError('The meal data could not be loaded. Please check your connection.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getChineseMeals()
      .then((mealData) => setMeals(mealData))
      .catch(() =>
        setError('The meal data could not be loaded. Please check your connection.'),
      )
      .finally(() => setLoading(false))
  }, [])

  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={
            <ListPage
              meals={meals}
              loading={loading}
              error={error}
              onRetry={loadMeals}
            />
          }
        />
        <Route
          path="/gallery"
          element={
            <GalleryPage
              meals={meals}
              loading={loading}
              error={error}
              onRetry={loadMeals}
            />
          }
        />
        <Route
          path="/dish/:mealId"
          element={
            <DetailPage
              meals={meals}
              loading={loading}
              error={error}
              onRetry={loadMeals}
            />
          }
        />
        <Route
          path="*"
          element={
            <ListPage
              meals={meals}
              loading={loading}
              error={error}
              onRetry={loadMeals}
            />
          }
        />
      </Routes>
    </Layout>
  )
}

export default App

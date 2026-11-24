import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './BackButton.css'

function BackButton({ className = '' }) {
  const navigate = useNavigate()
  const location = useLocation()
  const historyKey = 'machmind360-internal-history'

  useEffect(() => {
    try {
      const saved = JSON.parse(window.sessionStorage.getItem(historyKey) || '[]')
      const stack = Array.isArray(saved) ? saved : []
      if (stack[stack.length - 1] !== location.pathname) {
        stack.push(location.pathname)
        window.sessionStorage.setItem(historyKey, JSON.stringify(stack.slice(-20)))
      }
    } catch {
      window.sessionStorage.setItem(historyKey, JSON.stringify([location.pathname]))
    }
  }, [location.pathname])

  const handleBack = () => {
    const historyIndex = window.history.state?.idx
    let stack = []

    try {
      const saved = JSON.parse(window.sessionStorage.getItem(historyKey) || '[]')
      if (Array.isArray(saved)) stack = saved
    } catch {
      stack = []
    }

    if (Number.isInteger(historyIndex) && historyIndex > 0 && stack.length > 1) {
      stack.pop()
      window.sessionStorage.setItem(historyKey, JSON.stringify(stack))
      navigate(-1)
      return
    }

    navigate('/', { replace: true })
  }

  if (location.pathname === '/') return null

  return (
    <button
      type="button"
      className={`back-button ${className}`.trim()}
      onClick={handleBack}
      aria-label="Go back"
    >
      <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none">
        <path d="M19 12H5M11 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>Back</span>
    </button>
  )
}

export default BackButton

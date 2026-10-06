interface StatusMessageProps {
  loading: boolean
  error: string
  onRetry: () => void
}

function StatusMessage({ loading, error, onRetry }: StatusMessageProps) {
  if (loading) {
    return (
      <div className="status-card" role="status">
        <span className="loading-bowl">...</span>
        <h2>Loading meals</h2>
        <p>Please wait while the recipes are loading.</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="status-card" role="alert">
        <span className="status-symbol">!</span>
        <h2>Unable to load meals</h2>
        <p>{error}</p>
        <button className="primary-button" type="button" onClick={onRetry}>
          Try Again
        </button>
      </div>
    )
  }

  return null
}

export default StatusMessage

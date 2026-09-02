import { ErrorBoundary } from '@/app/ErrorBoundary'
import { AppRouter } from '@/app/router'

export default function App() {
  return (
    <ErrorBoundary>
      <AppRouter />
    </ErrorBoundary>
  )
}

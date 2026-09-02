import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    if (import.meta.env.DEV) {
      console.error(error, info)
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-over-night px-6 text-center">
          <p className="font-display text-2xl text-over-yellow">OverKom 360</p>
          <p className="max-w-md text-over-muted">
            Un souci d’affichage est survenu. Rechargez la page, ou contactez-nous
            directement.
          </p>
          <a className="over-btn" href="/">
            Revenir à l’accueil
          </a>
        </div>
      )
    }
    return this.props.children
  }
}

import { Component, ErrorInfo, ReactNode, ReactElement } from 'react'

interface Props {
  children: ReactElement;
  fallback?: ReactElement | ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state = {
    hasError: false
  };

  public static getDerivedStateFromError(): State {
    return {
      hasError: true
    };
  }

  /* Оставлен для отладки */
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Ошибка:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <p>Что-то пошло не так...</p>;
    }

    return this.props.children;
  }
}

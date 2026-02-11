import React from "react";

type Props = {
  fallbackMessage: string;
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
};

// Shared error boundary for React islands.
class AppErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: React.ErrorInfo) {
    console.error("[AppErrorBoundary] render error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <div className="p-4 rounded-xl border border-rose-200 bg-rose-50 text-rose-700">{this.props.fallbackMessage}</div>;
    }
    return this.props.children;
  }
}

export default AppErrorBoundary;

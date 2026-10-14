import ActionErrorNotice from "./ActionErrorNotice.tsx";
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
      return <ActionErrorNotice error={this.props.fallbackMessage} />;
    }
    return this.props.children;
  }
}

export default AppErrorBoundary;

import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg shadow-sm">
          <div className="flex items-center mb-4">
            <svg className="w-6 h-6 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="text-lg font-semibold text-red-700">Something went wrong</h3>
          </div>
          
          <p className="text-gray-600 mb-4">
            {this.props.fallbackMessage || 'An error occurred while loading this component.'}
          </p>
          
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <div className="mt-4 p-4 bg-gray-100 rounded text-sm overflow-auto max-h-40">
              <pre className="text-red-600">{this.state.error.toString()}</pre>
              {this.state.errorInfo && (
                <pre className="mt-2 text-gray-500 text-xs">{this.state.errorInfo.componentStack}</pre>
              )}
            </div>
          )}
          
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 
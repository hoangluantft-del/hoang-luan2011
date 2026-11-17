import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  message: string;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Application Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFF8FA] px-4">
          <div className="max-w-md w-full bg-white border border-[#FBCFE8] rounded-xl p-8 text-center">
            <h2 className="font-serif text-2xl font-semibold text-[#2E1021]">
              Đã có sự cố nhỏ xảy ra
            </h2>
            <p className="mt-3 text-sm text-[#6B4C5B] leading-relaxed">
              Trang tri ân tạm thời gặp gián đoạn khi đồng bộ dữ liệu. Vui lòng tải lại trang để
              tiếp tục.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-6 px-5 py-2.5 text-sm font-medium text-white bg-[#BE185D] hover:bg-[#9D174D] rounded-md transition-colors cursor-pointer"
            >
              Tải lại trang
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

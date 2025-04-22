// Add Google Analytics types to the global Window interface
interface Window {
  gtag?: (
    command: string,
    targetId: string,
    config?: {
      page_path?: string
      [key: string]: any
    },
  ) => void
  dataLayer?: any[]
}

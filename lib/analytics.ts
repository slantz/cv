// Helper functions for Google Analytics

// Log a page view
export const pageview = (GA_MEASUREMENT_ID: string, url: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }
}

// Log a specific event
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label: string
  value?: number
}) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Check if analytics consent has been given
export const hasAnalyticsConsent = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("analytics-consent") === "true"
  }
  return false
}

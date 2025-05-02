import {event} from "@/lib/analytics";

export const useTracking = () => {
  return {
    trackButtonClick: (buttonName: string) => {
      event({
        action: "button_click",
        category: "user_interaction",
        label: buttonName,
      })
    }
  }
}

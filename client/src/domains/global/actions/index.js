export const NOTIFICATION_POPUP = "NOTIFICATION_POPUP";
export const NOTIFICATION_POPUP_RESET = "NOTIFICATION_POPUP_RESET";

export const notificationPopup = info  => ({ type: NOTIFICATION_POPUP, info})
export const notificationPopupReset = () =>({ type:NOTIFICATION_POPUP_RESET });
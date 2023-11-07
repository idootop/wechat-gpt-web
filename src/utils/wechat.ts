export function isWechat() {
  return /MicroMessenger/i.test(window.navigator.userAgent);
}

export function waitForRouting(callback: () => void) {
  new Promise(requestAnimationFrame).then(callback);
}

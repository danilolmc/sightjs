export class HookHandler {
  private _callbacks = [];

  protected add(callback: () => void) {
    this._callbacks.push(callback);
  }

  executeCallbacks() {
    this._callbacks.forEach((callback) => callback());
  }
}

export class DependencyCycleError extends Error {
  constructor() {
    super('Cycle detected! Effects have circular dependencies.');
    this.name = 'DependencyCycleError';
  }
}

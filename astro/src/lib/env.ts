/**
 * Reads an environment variable at request time.
 * import.meta.env is inlined at build time, so process.env takes precedence
 * to pick up the values the container is started with.
 */
export function env(name: string): string | undefined {
  return process.env[name] || import.meta.env[name];
}

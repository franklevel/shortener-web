/**
 * Combines class names, filtering out falsy values
 */
export function classNames(...classes: (string | undefined | boolean | null)[]) {
  return classes.filter(Boolean).join(' ')
}

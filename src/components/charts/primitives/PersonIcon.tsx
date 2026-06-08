/** Glifo de persona usado en los badges del funnel. */
export function PersonIcon({ color = '#41464E' }: { color?: string }) {
  return (
    <svg
      width="11"
      height="12"
      viewBox="0 0 11 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ marginRight: 4, flexShrink: 0 }}
      aria-hidden="true"
    >
      <circle cx="5.5" cy="3.5" r="2.5" fill={color} />
      <path d="M1.5 11 A4 4 0 0 1 9.5 11 Z" fill={color} />
    </svg>
  )
}

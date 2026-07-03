// Aqua-style SVG icons for desktop / dock / window title bars.
// All icons share a 32x32 viewBox and scale via the `size` prop.

export interface IconProps {
  size?: number
}

export function DocumentIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <linearGradient id="hddi-doc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#e6e6ec" />
        </linearGradient>
      </defs>
      <path
        d="M8 2.5h11.4l6.1 6.1V28c0 .8-.7 1.5-1.5 1.5H8c-.8 0-1.5-.7-1.5-1.5V4c0-.8.7-1.5 1.5-1.5z"
        fill="url(#hddi-doc)"
        stroke="#b4b4bc"
      />
      <path
        d="M19.4 2.5v4.6c0 .8.7 1.5 1.5 1.5h4.6z"
        fill="#d8d8de"
        stroke="#b4b4bc"
        strokeLinejoin="round"
      />
      <g fill="#a6a6b0">
        <rect x="10" y="13" width="12" height="1.6" rx="0.8" />
        <rect x="10" y="17" width="12" height="1.6" rx="0.8" />
        <rect x="10" y="21" width="8" height="1.6" rx="0.8" />
      </g>
    </svg>
  )
}

export function FolderIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <linearGradient id="hddi-folder" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#84bdf8" />
          <stop offset="1" stopColor="#2b6fd4" />
        </linearGradient>
        <linearGradient id="hddi-folder-gloss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M3 9c0-1.1.9-2 2-2h6.3c.6 0 1.2.3 1.6.8l1.7 2.2H27c1.1 0 2 .9 2 2v11c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V9z"
        fill="url(#hddi-folder)"
        stroke="#1d5cb0"
      />
      <path d="M3.8 11h24.4v4.2c-8.5 2.4-15.9 2.4-24.4 0V11z" fill="url(#hddi-folder-gloss)" />
    </svg>
  )
}

export function MovieIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <linearGradient id="hddi-movie" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9b8cf9" />
          <stop offset="1" stopColor="#5b3fd4" />
        </linearGradient>
        <linearGradient id="hddi-movie-gloss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="4" y="6" width="24" height="20" rx="3.5" fill="url(#hddi-movie)" stroke="#43289f" />
      <rect x="5" y="7" width="22" height="8.5" rx="2.6" fill="url(#hddi-movie-gloss)" />
      <path
        d="M13.5 11.6v8.8c0 .8.9 1.3 1.6.9l7-4.4c.6-.4.6-1.4 0-1.8l-7-4.4c-.7-.4-1.6.1-1.6.9z"
        fill="#ffffff"
        opacity="0.95"
      />
    </svg>
  )
}

export function MailIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <linearGradient id="hddi-mail" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fdfdfe" />
          <stop offset="1" stopColor="#e0e0e8" />
        </linearGradient>
      </defs>
      <rect x="3" y="8" width="26" height="17" rx="2" fill="url(#hddi-mail)" stroke="#9a9aa4" />
      <path
        d="M4.5 10l10.2 7.4c.8.55 1.8.55 2.6 0L27.5 10"
        fill="none"
        stroke="#9a9aa4"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M4.5 23.5l7.7-6.3M27.5 23.5l-7.7-6.3"
        fill="none"
        stroke="#c2c2cc"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function PdfIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <linearGradient id="hddi-pdf-page" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#e6e6ec" />
        </linearGradient>
        <linearGradient id="hddi-pdf-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff5a5f" />
          <stop offset="1" stopColor="#d70015" />
        </linearGradient>
      </defs>
      <path
        d="M8 2.5h11.4l6.1 6.1V28c0 .8-.7 1.5-1.5 1.5H8c-.8 0-1.5-.7-1.5-1.5V4c0-.8.7-1.5 1.5-1.5z"
        fill="url(#hddi-pdf-page)"
        stroke="#b4b4bc"
      />
      <path
        d="M19.4 2.5v4.6c0 .8.7 1.5 1.5 1.5h4.6z"
        fill="#d8d8de"
        stroke="#b4b4bc"
        strokeLinejoin="round"
      />
      <rect x="6" y="15" width="20" height="9" rx="2" fill="url(#hddi-pdf-red)" stroke="#a30010" strokeWidth="0.8" />
      <text
        x="16"
        y="21.7"
        textAnchor="middle"
        fontSize="6.2"
        fontWeight="700"
        letterSpacing="0.5"
        fill="#ffffff"
        fontFamily="var(--font-ui)"
      >
        PDF
      </text>
    </svg>
  )
}

export function TerminalIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <linearGradient id="hddi-term" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#45454b" />
          <stop offset="1" stopColor="#17171a" />
        </linearGradient>
      </defs>
      <rect x="4" y="5" width="24" height="22" rx="3" fill="url(#hddi-term)" stroke="rgba(0,0,0,0.5)" />
      <rect x="5.2" y="6.2" width="21.6" height="1.4" rx="0.7" fill="rgba(255,255,255,0.18)" />
      <path
        d="M9 13l4.2 3.5L9 20"
        fill="none"
        stroke="#29ff6a"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="15.5" y="18.6" width="5.5" height="1.9" rx="0.5" fill="#29ff6a" />
    </svg>
  )
}

export function TrashIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <linearGradient id="hddi-trash" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#e8e8ec" />
          <stop offset="0.5" stopColor="#b9b9c0" />
          <stop offset="1" stopColor="#e0e0e5" />
        </linearGradient>
      </defs>
      <rect x="13" y="3.5" width="6" height="3" rx="1.5" fill="#c9c9cf" stroke="#93939b" strokeWidth="0.8" />
      <rect x="7.5" y="6" width="17" height="3" rx="1.5" fill="url(#hddi-trash)" stroke="#93939b" strokeWidth="0.8" />
      <path
        d="M9.5 10.5h13l-1.1 15.2c-.08 1.05-.95 1.8-2 1.8h-6.8c-1.05 0-1.92-.75-2-1.8L9.5 10.5z"
        fill="url(#hddi-trash)"
        stroke="#93939b"
        strokeWidth="0.8"
      />
      <g stroke="#9a9aa2" strokeLinecap="round">
        <path d="M13 13.5v11" />
        <path d="M16 13.5v11.5" />
        <path d="M19 13.5v11" />
      </g>
    </svg>
  )
}

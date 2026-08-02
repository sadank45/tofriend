export const Lantern = ({ size = 80, className = "", style = {} }) => (
  <svg
    width={size}
    height={size * 1.35}
    viewBox="0 0 80 108"
    fill="none"
    className={`lantern-shadow ${className}`}
    style={style}
    aria-hidden="true"
  >
    <defs>
      <radialGradient id="lg-body" cx="50%" cy="45%" r="65%">
        <stop offset="0%" stopColor="#FFEAA7" />
        <stop offset="45%" stopColor="#FFB84D" />
        <stop offset="100%" stopColor="#C67B1E" />
      </radialGradient>
      <linearGradient id="lg-cap" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#8A5A1A" />
        <stop offset="100%" stopColor="#5C3A0E" />
      </linearGradient>
    </defs>
    <line x1="40" y1="0" x2="40" y2="14" stroke="#5C3A0E" strokeWidth="1.5" />
    <rect x="30" y="14" width="20" height="6" rx="2" fill="url(#lg-cap)" />
    <path
      d="M40 20 C18 20 12 40 12 58 C12 78 24 92 40 92 C56 92 68 78 68 58 C68 40 62 20 40 20 Z"
      fill="url(#lg-body)"
    />
    <path
      d="M40 22 C30 30 28 46 28 58 C28 70 32 84 40 90"
      stroke="rgba(138,90,26,0.35)"
      strokeWidth="1"
      fill="none"
    />
    <path
      d="M40 22 C50 30 52 46 52 58 C52 70 48 84 40 90"
      stroke="rgba(138,90,26,0.35)"
      strokeWidth="1"
      fill="none"
    />
    <ellipse cx="40" cy="55" rx="10" ry="16" fill="rgba(255,255,235,0.5)" />
    <rect x="32" y="92" width="16" height="5" rx="2" fill="url(#lg-cap)" />
    <line x1="40" y1="97" x2="40" y2="106" stroke="#8A5A1A" strokeWidth="1.2" />
    <circle cx="40" cy="107" r="2" fill="#FFB84D" />
  </svg>
);

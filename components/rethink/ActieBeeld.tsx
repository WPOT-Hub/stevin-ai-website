// W-861: eigen illustratie voor de spelcomputer-actie. Bewust geen Sony-, PlayStation-,
// Rockstar- of GTA-logo's, geen nagemaakte spelhoes en niet de vorm van een
// bestaand product: een algemene witte spelcomputer met controller. De Digital
// Edition heeft geen schijfstation, dus een hoes zou ook een verkeerde belofte zijn.
export default function ActieBeeld({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 520"
      role="img"
      aria-label="Illustratie van een witte spelcomputer met controller voor een stad bij zonsondergang"
      className={className}
    >
      <defs>
        <linearGradient id="actie-lucht" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2b1b5e" />
          <stop offset="0.45" stopColor="#8a3fa8" />
          <stop offset="0.75" stopColor="#ff6f91" />
          <stop offset="1" stopColor="#ffb36b" />
        </linearGradient>
        <linearGradient id="actie-console" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#dfe6f2" />
        </linearGradient>
        <radialGradient id="actie-gloed" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#3D8EFF" stopOpacity="0.55" />
          <stop offset="1" stopColor="#3D8EFF" stopOpacity="0" />
        </radialGradient>
        <clipPath id="actie-kader">
          <rect width="640" height="520" rx="28" />
        </clipPath>
      </defs>
      <g clipPath="url(#actie-kader)">
        <rect width="640" height="520" fill="url(#actie-lucht)" />
        <circle cx="470" cy="300" r="70" fill="#ffd9a0" opacity="0.9" />
        {/* stad */}
        <g fill="#1a1140" opacity="0.85">
          <rect x="30" y="300" width="46" height="170" />
          <rect x="84" y="250" width="38" height="220" />
          <rect x="130" y="320" width="52" height="150" />
          <rect x="400" y="270" width="40" height="200" />
          <rect x="448" y="330" width="56" height="140" />
          <rect x="512" y="230" width="44" height="240" />
          <rect x="564" y="300" width="60" height="170" />
        </g>
        {/* palmen */}
        <g stroke="#150c33" strokeWidth="6" strokeLinecap="round" fill="none">
          <path d="M40 520 C50 420 60 360 78 300" />
          <path d="M78 300 C40 290 20 300 6 330" />
          <path d="M78 300 C95 270 125 262 150 272" />
          <path d="M78 300 C70 270 50 255 25 255" />
          <path d="M600 520 C590 440 585 380 570 330" />
          <path d="M570 330 C600 310 625 315 640 335" />
          <path d="M570 330 C555 300 530 292 505 302" />
        </g>
        {/* vloer */}
        <rect y="430" width="640" height="90" fill="#150c33" opacity="0.55" />
        <ellipse cx="270" cy="445" rx="190" ry="22" fill="#000" opacity="0.35" />
        {/* gloed achter de spelcomputer */}
        <ellipse cx="250" cy="300" rx="190" ry="210" fill="url(#actie-gloed)" />
        {/* spelcomputer: algemene staande witte plaat met donkere kern */}
        <g>
          <rect x="190" y="110" width="150" height="330" rx="34" fill="#1c2030" />
          <path d="M205 120 C150 160 150 380 205 430 L225 430 C185 380 185 170 225 120 Z" fill="url(#actie-console)" />
          <path d="M325 120 C380 160 380 380 325 430 L305 430 C345 380 345 170 305 120 Z" fill="url(#actie-console)" />
          <rect x="258" y="130" width="14" height="300" rx="7" fill="#3D8EFF" opacity="0.85" />
          <ellipse cx="265" cy="440" rx="80" ry="10" fill="#c7d0e2" />
        </g>
        {/* controller */}
        <g transform="translate(40 340) rotate(-8)">
          <path
            d="M60 20 C20 20 0 60 6 110 C10 140 30 150 52 128 L74 104 L156 104 L178 128 C200 150 220 140 224 110 C230 60 210 20 170 20 Z"
            fill="#ffffff"
          />
          <path d="M60 20 L170 20 L160 52 L70 52 Z" fill="#1c2030" opacity="0.9" />
          <rect x="108" y="64" width="14" height="30" rx="7" fill="#3D8EFF" opacity="0.8" />
          <circle cx="84" cy="88" r="14" fill="#1c2030" />
          <circle cx="146" cy="88" r="14" fill="#1c2030" />
          <g stroke="#9aa6bd" strokeWidth="5" strokeLinecap="round">
            <path d="M38 60 h24 M50 48 v24" />
          </g>
          <g fill="#c7d0e2">
            <circle cx="186" cy="48" r="6" />
            <circle cx="202" cy="62" r="6" />
            <circle cx="170" cy="62" r="6" />
            <circle cx="186" cy="76" r="6" />
          </g>
        </g>
      </g>
    </svg>
  )
}

export function BlossomFlower({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <g>
        <ellipse cx="32" cy="14" rx="9" ry="12" fill="#F9A8D4" fillOpacity="0.9" />
        <ellipse
          cx="49"
          cy="26"
          rx="9"
          ry="12"
          transform="rotate(72 49 26)"
          fill="#F472B6"
          fillOpacity="0.88"
        />
        <ellipse
          cx="43"
          cy="47"
          rx="9"
          ry="12"
          transform="rotate(144 43 47)"
          fill="#F9A8D4"
          fillOpacity="0.92"
        />
        <ellipse
          cx="21"
          cy="47"
          rx="9"
          ry="12"
          transform="rotate(-144 21 47)"
          fill="#F472B6"
          fillOpacity="0.88"
        />
        <ellipse
          cx="15"
          cy="26"
          rx="9"
          ry="12"
          transform="rotate(-72 15 26)"
          fill="#F9A8D4"
          fillOpacity="0.9"
        />
        <circle cx="32" cy="32" r="6.5" fill="#FDE68A" />
        <circle cx="32" cy="32" r="3" fill="#BE185D" />
      </g>
    </svg>
  );
}

export function BlossomSprig({ className = 'w-28 h-20' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 140 90"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M8 74C34 56 64 42 126 24"
        stroke="#FBCFE8"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M52 50C58 34 72 28 80 26"
        stroke="#FBCFE8"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* Leaves */}
      <path
        d="M28 64C22 54 32 45 42 52C38 62 32 66 28 64Z"
        fill="#A7F3D0"
        fillOpacity="0.8"
      />
      <path
        d="M96 34C102 22 115 24 116 34C108 42 100 39 96 34Z"
        fill="#A7F3D0"
        fillOpacity="0.8"
      />
      {/* Blossoms */}
      <g transform="translate(56 26) scale(0.45)">
        <ellipse cx="32" cy="14" rx="9" ry="12" fill="#FCE7F3" />
        <ellipse cx="49" cy="26" rx="9" ry="12" transform="rotate(72 49 26)" fill="#F9A8D4" />
        <ellipse cx="43" cy="47" rx="9" ry="12" transform="rotate(144 43 47)" fill="#FCE7F3" />
        <ellipse cx="21" cy="47" rx="9" ry="12" transform="rotate(-144 21 47)" fill="#F9A8D4" />
        <ellipse cx="15" cy="26" rx="9" ry="12" transform="rotate(-72 15 26)" fill="#FCE7F3" />
        <circle cx="32" cy="32" r="6" fill="#FDE68A" />
      </g>
      <g transform="translate(96 8) scale(0.55)">
        <ellipse cx="32" cy="14" rx="9" ry="12" fill="#FBCFE8" />
        <ellipse cx="49" cy="26" rx="9" ry="12" transform="rotate(72 49 26)" fill="#F472B6" />
        <ellipse cx="43" cy="47" rx="9" ry="12" transform="rotate(144 43 47)" fill="#FBCFE8" />
        <ellipse cx="21" cy="47" rx="9" ry="12" transform="rotate(-144 21 47)" fill="#F472B6" />
        <ellipse cx="15" cy="26" rx="9" ry="12" transform="rotate(-72 15 26)" fill="#FBCFE8" />
        <circle cx="32" cy="32" r="6" fill="#FDE68A" />
      </g>
    </svg>
  );
}

const PETALS = [
  { left: '8%', delay: '0s', duration: '11s', size: 12 },
  { left: '22%', delay: '2.5s', duration: '13s', size: 10 },
  { left: '38%', delay: '1.2s', duration: '10.5s', size: 14 },
  { left: '56%', delay: '4s', duration: '12.5s', size: 11 },
  { left: '74%', delay: '0.8s', duration: '11.5s', size: 13 },
  { left: '89%', delay: '3.2s', duration: '13.5s', size: 10 },
];

export function DriftingPetals() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {PETALS.map((petal, idx) => (
        <span
          key={idx}
          className="animate-petal absolute -top-6 block rounded-full bg-gradient-to-br from-[#FCE7F3] to-[#F472B6] opacity-70"
          style={{
            left: petal.left,
            width: `${petal.size}px`,
            height: `${Math.round(petal.size * 0.72)}px`,
            borderRadius: '60% 40% 60% 40%',
            animationDelay: petal.delay,
            animationDuration: petal.duration,
          }}
        />
      ))}
    </div>
  );
}

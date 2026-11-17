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

const GLOBAL_ROSE_PETALS = [
  { left: '4%', delay: '0s', duration: '12s', size: 14, variant: 'petal-a', color: '#F472B6' },
  { left: '11%', delay: '3.4s', duration: '14.5s', size: 16, variant: 'blossom-b', color: '#FB7185' },
  { left: '19%', delay: '1.6s', duration: '11.5s', size: 12, variant: 'petal-b', color: '#F9A8D4' },
  { left: '27%', delay: '5.2s', duration: '13.5s', size: 15, variant: 'petal-a', color: '#EC4899' },
  { left: '35%', delay: '2.1s', duration: '15s', size: 17, variant: 'blossom-a', color: '#F472B6' },
  { left: '44%', delay: '6.8s', duration: '12.5s', size: 12, variant: 'petal-b', color: '#FDA4AF' },
  { left: '53%', delay: '0.9s', duration: '14s', size: 14, variant: 'petal-a', color: '#F472B6' },
  { left: '62%', delay: '4.5s', duration: '11.8s', size: 16, variant: 'blossom-b', color: '#F9A8D4' },
  { left: '70%', delay: '2.9s', duration: '13.2s', size: 13, variant: 'petal-b', color: '#FB7185' },
  { left: '79%', delay: '7.4s', duration: '15.2s', size: 15, variant: 'petal-a', color: '#F472B6' },
  { left: '87%', delay: '1.3s', duration: '12.8s', size: 17, variant: 'blossom-a', color: '#EC4899' },
  { left: '94%', delay: '5.8s', duration: '14.2s', size: 12, variant: 'petal-b', color: '#F9A8D4' },
];

const ROSE_FIREWORK_BURSTS = [
  { top: '14%', left: '12%', delay: '0.5s', duration: '7.5s', size: 112 },
  { top: '20%', left: '84%', delay: '2.8s', duration: '8.2s', size: 124 },
  { top: '54%', left: '8%', delay: '4.4s', duration: '8.8s', size: 104 },
  { top: '66%', left: '88%', delay: '1.6s', duration: '7.8s', size: 116 },
];

const BURST_ANGLES = [0, 36, 72, 108, 144, 180, 216, 252, 288, 324];

export function RoseFireworksOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
    >
      {/* Gentle periodic rose firework blooms */}
      {ROSE_FIREWORK_BURSTS.map((burst, bIdx) => (
        <div
          key={`burst-${bIdx}`}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{
            top: burst.top,
            left: burst.left,
            width: `${burst.size}px`,
            height: `${burst.size}px`,
          }}
        >
          <div
            className="animate-rose-core absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-radial from-[#FDE68A] via-[#F9A8D4]/70 to-transparent"
            style={{
              animationDelay: burst.delay,
              animationDuration: burst.duration,
            }}
          />
          <div
            className="animate-rose-firework relative w-full h-full"
            style={{
              animationDelay: burst.delay,
              animationDuration: burst.duration,
            }}
          >
            {BURST_ANGLES.map((deg, pIdx) => (
              <span
                key={pIdx}
                className="absolute left-1/2 top-1/2 block origin-bottom"
                style={{
                  transform: `translate(-50%, -100%) rotate(${deg}deg)`,
                  height: `${Math.round(burst.size * 0.44)}px`,
                }}
              >
                <span
                  className="block rounded-full shadow-[0_0_6px_rgba(244,114,182,0.5)]"
                  style={{
                    width: pIdx % 2 === 0 ? '7px' : '5px',
                    height: pIdx % 2 === 0 ? '11px' : '8px',
                    borderRadius: '65% 35% 65% 35%',
                    background:
                      pIdx % 2 === 0
                        ? 'linear-gradient(135deg, #FCE7F3, #F472B6)'
                        : 'linear-gradient(135deg, #FDE68A, #FB7185)',
                  }}
                />
              </span>
            ))}
          </div>
        </div>
      ))}

      {/* Gently falling rose petals & miniature blossoms across the full page */}
      {GLOBAL_ROSE_PETALS.map((item, idx) => {
        const isBlossom = item.variant.startsWith('blossom');
        const animClass = item.variant.endsWith('a')
          ? 'animate-rose-fall-a'
          : 'animate-rose-fall-b';

        if (isBlossom) {
          return (
            <div
              key={`fall-${idx}`}
              className={`${animClass} absolute -top-8`}
              style={{
                left: item.left,
                width: `${item.size}px`,
                height: `${item.size}px`,
                animationDelay: item.delay,
                animationDuration: item.duration,
              }}
            >
              <BlossomFlower className="w-full h-full opacity-75 drop-shadow-[0_1px_2px_rgba(190,24,93,0.18)]" />
            </div>
          );
        }

        return (
          <span
            key={`fall-${idx}`}
            className={`${animClass} absolute -top-8 block`}
            style={{
              left: item.left,
              width: `${item.size}px`,
              height: `${Math.round(item.size * 0.72)}px`,
              borderRadius: '65% 35% 65% 35%',
              background: `linear-gradient(135deg, #FCE7F3 0%, ${item.color} 100%)`,
              boxShadow: '0 1px 4px rgba(190, 24, 93, 0.16)',
              animationDelay: item.delay,
              animationDuration: item.duration,
            }}
          />
        );
      })}
    </div>
  );
}

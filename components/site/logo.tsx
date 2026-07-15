/**
 * Lane's laptop-with-code logo. The fills are intentionally hardcoded
 * (screen #fff, laptop body #333, code-line strokes #707070) so the logo
 * always renders its light-mode colors regardless of the active theme.
 */
interface LogoProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

export const Logo = ({ className, width, height }: LogoProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 489.346 368.551"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g transform="translate(-138.776 -131.193)">
        <g transform="translate(138.776 131.193)">
          <g>
            <rect
              width="358"
              height="251"
              transform="translate(66.224 27.807)"
              fill="#fff"
            />
            <path
              d="M477.112,318.94H291.726c-.276,7.4-16.985,8.781-24.057,8.781-61.6-2.51-72.711,2.359-72.52-8.781H12.234A12.286,12.286,0,0,0,0,331.207v12.267c0,26.987,22.021,25.046,48.935,25.046H440.411c26.914,0,48.935,1.941,48.935-25.046V331.207A12.286,12.286,0,0,0,477.112,318.94ZM440.411,36.8A36.859,36.859,0,0,0,403.71,0H85.636a36.859,36.859,0,0,0-36.7,36.8V311.638H440.411ZM423.3,279.169H66.045V28Z"
              fill="#333"
            />
          </g>
        </g>
        <g transform="translate(162.327 234.563)">
          {[102.735, 81.105, 59.474, 37.844, 16.213].map((y) => (
            <path
              key={y}
              d="M407.17,11.764l-85.68,53.1L170.54-16.213,124.114,26.519,0,1.091"
              transform={`translate(0 ${y})`}
              fill="none"
              stroke="#707070"
              strokeWidth="4"
            />
          ))}
        </g>
        <g transform="translate(162.327 223.691)">
          {[101.654, 80.023, 58.933, 37.844, 16.213].map((y) => (
            <path
              key={y}
              d="M407.17,11.764l-85.68,53.1L170.54-16.213,124.114,26.519,0,1.091"
              transform={`translate(0 ${y})`}
              fill="none"
              stroke="#707070"
              strokeWidth="4"
            />
          ))}
        </g>
      </g>
    </svg>
  );
};

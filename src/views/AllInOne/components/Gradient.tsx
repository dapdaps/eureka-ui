export const Gradient: React.FC<{
  bgColor: string;
  classname?: string;
  width: number;
  height: number;
  rx: number;
  ry: number;
  opacity?: number;
}> = ({ bgColor, width, height, classname, rx, ry, opacity = 0.5 }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={classname}
  >
    <g opacity={opacity} filter="url(#filter0_f_510_1870)">
      <ellipse cx={width * 0.5} cy={height * 0.5} rx={rx} ry={ry} fill={bgColor} />
    </g>
    <defs>
      <filter
        id="filter0_f_510_1870"
        x="0"
        y="0"
        width={width}
        height={height}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="40" result="effect1_foregroundBlur_510_1870" />
      </filter>
    </defs>
  </svg>
);

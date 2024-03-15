const ElipseScreen = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 1294 1021"
      fill={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        style="mix-blend-mode:screen"
        opacity="0.6"
        filter="url(#filter0_f_870_2237)"
      >
        <ellipse cx="647" cy="510.5" rx="287" ry="150.5" fill={className} />
      </g>
      <defs>
        <filter
          id="filter0_f_870_2237"
          x="0"
          y="0"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="180"
            result="effect1_foregroundBlur_870_2237"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default ElipseScreen;

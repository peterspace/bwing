const Elipse = ({ className }) => {
  return (
    <svg
      viewBox="0 0 1294 1109"
      fill={className}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.6" filter="url(#filter0_f_868_2236)">
        <ellipse cx="647" cy="554.5" rx="287" ry="194.5" fill={className} />
      </g>
      <defs>
        <filter
          id="filter0_f_868_2236"
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
            result="effect1_foregroundBlur_868_2236"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default Elipse;

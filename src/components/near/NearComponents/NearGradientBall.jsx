const NearGradientBall = ({ gradients = ['#CFFF96', '#16FFE1'], className }) => {
  const id = `${gradients?.[0]}${gradients?.[1]}`;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      className={className}
    >
      <circle cx="5.5" cy="5.5" r="5" fill="#1E202F" stroke={`url(#${id})`} />
      <defs>
        <linearGradient id={id} x1="1.29921" y1="5.5" x2="11" y2="5.5" gradientUnits="userSpaceOnUse">
          <stop stopColor={gradients?.[0]} />
          <stop offset="1" stopColor={gradients?.[1]} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default NearGradientBall;

const ArrowIcon = (props: Props) => {
  const { size = 18, color, className } = props;

  return (
    <div style={{ color: color }} className={className}>
      <svg
        width={size}
        height={size * 1.25}
        viewBox="0 0 8 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.5 4.13397C8.16667 4.51887 8.16667 5.48113 7.5 5.86603L1.5 9.33013C0.833334 9.71503 -4.47338e-07 9.2339 -4.13689e-07 8.4641L-1.10848e-07 1.5359C-7.71986e-08 0.766098 0.833333 0.284973 1.5 0.669873L7.5 4.13397Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
};

export default ArrowIcon;

interface Props {
  size?: number;
  color?: string;
  className?: string;
}

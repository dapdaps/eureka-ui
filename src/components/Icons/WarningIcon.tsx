export default function WarningIcon(props: any) {
  const { color = '#FF9D97', ...rest } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" {...rest}>
      <circle cx="10" cy="10" r="9.5" fill={color} />
      <line x1="10" y1="5" x2="10" y2="12" stroke="black" strokeWidth="2" />
      <line x1="10" y1="14" x2="10" y2="16" stroke="black" strokeWidth="2" />
    </svg>
  );
}

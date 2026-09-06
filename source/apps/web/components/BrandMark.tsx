export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      role="img"
      aria-label="SamkhyaAcademy"
    >
      <path
        d="M27.8 6.8a7.2 7.2 0 0 0-10.2 0l-8.8 8.8a7.2 7.2 0 0 0 10.2 10.2l4.4-4.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="4.2"
        strokeLinecap="round"
      />
      <path
        d="M12.2 33.2a7.2 7.2 0 0 0 10.2 0l8.8-8.8A7.2 7.2 0 0 0 21 14.2l-4.4 4.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="4.2"
        strokeLinecap="round"
      />
      <path
        d="m14.8 25.2 10.4-10.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="4.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Placeholder for photography the company has not supplied yet. Keeps the
 * design's framing so swapping in a real <Image> later cannot shift the layout.
 */
export function ImageSlot({
  label,
  dark = false,
}: {
  label: string;
  dark?: boolean;
}) {
  return (
    <div className={dark ? "imgslot imgslot--dark" : "imgslot"} aria-hidden="true">
      <span>{label}</span>
    </div>
  );
}

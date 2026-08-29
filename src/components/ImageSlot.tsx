import Image from "next/image";

/**
 * A framed image area. When the backend has a photo for the slot it is drawn
 * here; until then the design's dashed placeholder keeps the same footprint, so
 * uploading a photo cannot shift the layout.
 */
export function ImageSlot({
  label,
  dark = false,
  src,
  alt,
  sizes = "(max-width: 900px) 100vw, 400px",
  priority = false,
}: {
  /** Placeholder caption, used as the alt text when the photo has none. */
  label: string;
  dark?: boolean;
  /** Absolute URL from the API. Omit to render the placeholder. */
  src?: string;
  alt?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (src) {
    return (
      <Image
        className="imgslot__img"
        src={src}
        alt={alt || label}
        fill
        sizes={sizes}
        priority={priority}
      />
    );
  }

  return (
    <div className={dark ? "imgslot imgslot--dark" : "imgslot"} aria-hidden="true">
      <span>{label}</span>
    </div>
  );
}

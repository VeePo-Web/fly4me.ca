import divider from "@/assets/divider-mountain-pass.jpg";

export default function Divider() {
  return (
    <section
      className="relative w-full h-[60vh] md:h-[85vh] overflow-hidden bg-secondary"
      aria-label="Cinematic divider"
    >
      <img
        src={divider}
        alt=""
        loading="lazy"
        decoding="async"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </section>
  );
}

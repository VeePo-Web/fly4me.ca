/**
 * GlassTexture — reusable grain + light refraction overlay
 * that simulates the surface quality of hand-made stained glass.
 * Place inside a `position: relative` container with `overflow-hidden`.
 */
const GlassTexture = () => (
  <div className="absolute inset-0 pointer-events-none z-[5]" aria-hidden="true">
    {/* Grain / noise texture — simulates hand-blown glass irregularity */}
    <div
      className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundSize: "180px 180px",
      }}
    />
    {/* Light refraction — simulates sun streaming through cathedral glass */}
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 70% 50% at 25% 15%, rgba(255,255,255,0.09), transparent 65%)",
      }}
    />
    {/* Secondary warm refraction at bottom-right */}
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 50% 40% at 80% 85%, rgba(255,200,100,0.04), transparent 60%)",
      }}
    />
  </div>
);

export default GlassTexture;

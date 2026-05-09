/** Compact centerpiece — Great Commandment + Psalm 133 for side column */

const HOVER_TRANSITION = "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]";

const FooterCenterpiece = () => {
  return (
    <div className="group cursor-default relative z-10 flex flex-col items-center md:items-end text-center md:text-right my-auto">
      <div className="animate-fade-in">
        <blockquote className="max-w-sm">
          <p
            className={`font-serif italic text-base md:text-lg font-light leading-snug text-background/90 group-hover:text-background tracking-[-0.02em] ${HOVER_TRANSITION}`}
            style={{ fontFeatureSettings: '"liga" 1, "dlig" 1' }}
          >
            <span>Love the Lord your God with all your heart and with all your soul and with all your mind…</span>
            <span className={`block mt-1 text-background/85 group-hover:text-background/95 ${HOVER_TRANSITION}`}>
              and love your neighbor as yourself.
            </span>
          </p>
          <cite className={`block font-serif not-italic text-xs text-background/70 group-hover:text-background/85 mt-2 ${HOVER_TRANSITION}`}>
            — Jesus &middot; Matthew 22 : 37–39 <span className={`text-background/45 group-hover:text-background/60 ${HOVER_TRANSITION}`}>&middot; NIV</span>
          </cite>
          <div
            className="md:ml-auto h-px w-1/3 scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] mt-2"
            style={{ background: "linear-gradient(90deg, transparent, hsl(var(--gold-warm) / 0.25), transparent)" }}
            aria-hidden="true"
          />
        </blockquote>
      </div>

      <div className="relative mt-3 mb-1 md:ml-auto" aria-hidden="true">
        <div
          className={`h-px w-16 group-hover:w-24 ${HOVER_TRANSITION}`}
          style={{
            background: "linear-gradient(90deg, transparent, hsl(var(--gold-warm) / 0.35), transparent)",
          }}
        />
      </div>

      <div className="animate-fade-in max-w-sm" style={{ animationDelay: "0.3s" }}>
        <p
          className={`font-serif italic text-sm md:text-base text-background/70 group-hover:text-background/90 leading-relaxed ${HOVER_TRANSITION}`}
          style={{ fontFeatureSettings: '"liga" 1, "dlig" 1' }}
        >
          &ldquo;How good and pleasant it is when God&rsquo;s people live together in unity!&rdquo;
        </p>
        <span className={`block text-[10px] font-sans uppercase tracking-[0.25em] text-background/60 group-hover:text-background/75 mt-1 ${HOVER_TRANSITION}`} style={{ fontFeatureSettings: '"cv02"' }}>
          Psalm 133 : 1 <span className={`text-background/30 group-hover:text-background/50 ${HOVER_TRANSITION}`}>&middot; NIV</span>
        </span>
        <div
          className="md:ml-auto h-px w-1/3 scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] mt-2"
          style={{ background: "linear-gradient(90deg, transparent, hsl(var(--gold-warm) / 0.25), transparent)" }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default FooterCenterpiece;

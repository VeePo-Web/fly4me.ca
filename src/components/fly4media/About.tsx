import { useReveal } from "./useReveal";
import about from "@/assets/about-mountains.jpg";

export default function About() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="about" className="bg-background py-24 md:py-40">
      <div className="container-x">
        <div ref={ref} className="reveal grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-end">
          <div className="md:col-span-7 order-2 md:order-1">
            <div className="overflow-hidden aspect-[4/5] md:aspect-[5/6] bg-secondary">
              <img
                src={about}
                alt="Aerial view of the Canadian Rockies"
                loading="lazy"
                decoding="async"
                width={1600}
                height={1200}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="md:col-span-5 order-1 md:order-2">
            <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-6">
              About — Studio
            </p>
            <h2 className="text-4xl md:text-5xl font-medium tracking-[-0.035em] leading-[1.05] text-balance mb-8">
              We&rsquo;re more than drone pilots.
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6 text-pretty">
              We&rsquo;re visual storytellers. Based in Alberta, we combine
              technical precision with creative direction to deliver content
              that connects — and lasts.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-pretty">
              From wide cinematic landscapes to intimate FPV chase shots, every
              frame is composed with the patience of an editor and the eye of a
              cinematographer.
            </p>

            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group mt-10 inline-flex items-center gap-2 text-sm font-medium"
            >
              What we do
              <span className="transition-transform group-hover:translate-x-0.5">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

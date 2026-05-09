interface SectionNumberProps {
  number: string;
}

const SectionNumber = ({ number }: SectionNumberProps) => (
  <span
    className="hidden md:block font-serif text-[7rem] leading-none text-foreground/[0.06] select-none absolute -top-8 -left-6 pointer-events-none"
    aria-hidden="true"
  >
    {number}
  </span>
);

export default SectionNumber;

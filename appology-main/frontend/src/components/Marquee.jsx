import { Star } from "lucide-react";

const ITEMS = [
  "forgive me",
  "a thousand apologies",
  "a thousand stars",
  "one wish tonight",
];

const Row = () => (
  <div className="flex items-center shrink-0">
    {ITEMS.map((item, i) => (
      <div key={i} className="flex items-center shrink-0">
        <span className="font-display italic font-light text-2xl sm:text-4xl lg:text-5xl text-[#F2E8CF]/70 px-8 whitespace-nowrap">
          {item}
        </span>
        <Star size={14} className="text-[#D4AF37]/60 shrink-0" fill="currentColor" />
      </div>
    ))}
  </div>
);

export const Marquee = () => (
  <div
    data-testid="editorial-marquee"
    className="relative z-10 py-16 sm:py-24 overflow-hidden border-y border-[#D4AF37]/10"
  >
    <div className="marquee-track">
      <Row />
      <Row />
      <Row />
      <Row />
    </div>
  </div>
);

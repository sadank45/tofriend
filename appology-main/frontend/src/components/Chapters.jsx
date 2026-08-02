import { FadeUp } from "./KineticText";

const CHAPTERS = [
  {
    num: "01",
    title: "The silence I caused",
    body: "Somewhere between my words and my pride, I let a quiet fall between us. It was never yours to carry, and I have felt its weight every day since. The night sky has too many stars to count, yet none of them shine the way our laughter used to.",
    align: "left",
  },
  {
    num: "02",
    title: "What I should have said",
    body: "I should have listened longer. I should have chosen kindness over being right. I should have remembered that you, of all people, deserved my softest words and not my sharpest ones. I am not asking you to forget. I am asking you to let me do better.",
    align: "right",
  },
  {
    num: "03",
    title: "What you mean to me",
    body: "You are the constant in my sky. The friend who turned ordinary evenings into memories I still hold like lanterns. Losing your trust would be the one regret I could never outrun, so I am standing here, heart open, hoping you will meet me halfway.",
    align: "left",
  },
];

export const Chapters = () => (
  <section
    data-testid="manifesto-chapters"
    className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 py-32 sm:py-48 space-y-40 sm:space-y-56"
  >
    {CHAPTERS.map((ch) => (
      <FadeUp key={ch.num}>
        <article
          data-testid={`chapter-${ch.num}`}
          className={`flex flex-col ${
            ch.align === "right" ? "items-end text-right" : "items-start text-left"
          }`}
        >
          <span className="font-display font-light text-7xl sm:text-9xl leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#D4AF37]/70 to-[#D4AF37]/10 select-none">
            {ch.num}
          </span>
          <h2 className="font-display italic font-light text-3xl sm:text-5xl lg:text-6xl text-[#F8F5EE] mt-4 max-w-xl">
            {ch.title}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg font-light tracking-wide leading-relaxed text-[#A3A8B7] mt-8 max-w-md">
            {ch.body}
          </p>
          <div
            className={`mt-10 h-px w-24 bg-gradient-to-r from-[#D4AF37]/60 to-transparent ${
              ch.align === "right" ? "rotate-180" : ""
            }`}
          />
        </article>
      </FadeUp>
    ))}
  </section>
);

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { MaskedLine } from "./KineticText";
import { Lantern } from "./Lantern";

const EASE = [0.22, 1, 0.36, 1];

const Float = ({ children, duration = 6, delay = 0, distance = 14 }) => (
  <motion.div
    animate={{ y: [0, -distance, 0] }}
    transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

export const Hero = () => {
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 800], [0, 220]);
  const opacityText = useTransform(scrollY, [0, 500], [1, 0]);
  const yL1 = useTransform(scrollY, [0, 1000], [0, -260]);
  const yL2 = useTransform(scrollY, [0, 1000], [0, -420]);
  const yL3 = useTransform(scrollY, [0, 1000], [0, -180]);
  const yL4 = useTransform(scrollY, [0, 1000], [0, -340]);

  return (
    <section
      data-testid="hero-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* parallax lanterns */}
      <motion.div style={{ y: yL1 }} className="absolute left-[8%] top-[18%] z-[5] opacity-80">
        <Float duration={7}><Lantern size={64} /></Float>
      </motion.div>
      <motion.div style={{ y: yL2 }} className="absolute right-[10%] top-[12%] z-[5]">
        <Float duration={8.5} delay={1.2} distance={20}><Lantern size={96} /></Float>
      </motion.div>
      <motion.div style={{ y: yL3 }} className="absolute left-[16%] bottom-[16%] z-[5] opacity-60">
        <Float duration={9} delay={0.6} distance={10}><Lantern size={44} /></Float>
      </motion.div>
      <motion.div style={{ y: yL4 }} className="absolute right-[18%] bottom-[24%] z-[5] opacity-70">
        <Float duration={6.5} delay={2} distance={16}><Lantern size={56} /></Float>
      </motion.div>

      {/* glow aura behind text */}
      <div className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none">
        <div className="lantern-aura w-[80vmin] h-[80vmin] rounded-full opacity-60" />
      </div>

      {/* headline */}
      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="relative z-10 text-center px-6"
      >
        <motion.p
          data-testid="hero-overline"
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          animate={{ opacity: 1, letterSpacing: "0.5em" }}
          transition={{ duration: 1.6, delay: 0.2, ease: EASE }}
          className="text-[10px] sm:text-xs uppercase text-[#A3A8B7] mb-8 font-light"
        >
          a letter written in starlight
        </motion.p>

        <h1 className="font-display font-light tracking-tight leading-[0.9] text-[#F8F5EE]">
          <MaskedLine delay={0.5} className="text-6xl sm:text-8xl lg:text-[11rem]">
            <span className="italic">I&rsquo;m</span>
          </MaskedLine>
          <MaskedLine delay={0.75} className="text-7xl sm:text-9xl lg:text-[13rem]">
            <span className="gold-glow text-[#F2E8CF]">Sorry</span>
          </MaskedLine>
        </h1>

        <div className="mt-8">
          <MaskedLine delay={1.15}>
            <span
              data-testid="hero-script-line"
              className="font-script text-3xl sm:text-5xl lg:text-6xl text-[#D4AF37]"
            >
              dearest Pratishtha
            </span>
          </MaskedLine>
        </div>
      </motion.div>

      {/* scroll indicator */}
      <motion.div
        data-testid="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] text-[#A3A8B7] font-light">
          begin
        </span>
        <div className="scroll-hint">
          <ArrowDown size={16} className="text-[#D4AF37]" strokeWidth={1.5} />
        </div>
        <div className="w-px h-12 bg-gradient-to-b from-[#D4AF37]/60 to-transparent" />
      </motion.div>
    </section>
  );
};

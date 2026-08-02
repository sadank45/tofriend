import { motion } from "framer-motion";
import { Feather } from "lucide-react";
import { FadeUp } from "./KineticText";

export const Letter = () => (
  <section data-testid="letter-section" className="relative z-10 paper-texture py-32 sm:py-48">
    <div className="max-w-3xl mx-auto px-6 sm:px-12">
      <FadeUp>
        <div className="flex items-center gap-4 mb-16 justify-center">
          <div className="h-px w-16 bg-[#1A1A1A]/20" />
          <Feather size={18} className="text-[#1A1A1A]/50" strokeWidth={1.5} />
          <div className="h-px w-16 bg-[#1A1A1A]/20" />
        </div>
      </FadeUp>

      <FadeUp delay={0.15}>
        <motion.div
          whileHover={{ rotate: 0, scale: 1.01 }}
          className="paper-edge bg-[#FBF7F0] rounded-sm p-10 sm:p-16 lg:p-20 -rotate-1 transition-transform duration-700"
        >
          <p className="font-script text-4xl sm:text-5xl text-[#1A1A1A] leading-relaxed">
            Dear Pratishtha,
          </p>
          <div className="mt-10 space-y-8 font-script text-2xl sm:text-3xl lg:text-4xl text-[#333333] leading-relaxed">
            <p>
              I have started this letter a hundred times in my head, and every
              version begins the same way — with the simple truth that I was
              wrong, and that I am sorry.
            </p>
            <p>
              Not the kind of sorry people say to end a conversation. The kind
              that keeps you awake at night, replaying the moment, wishing you
              could reach back through time and choose gentler words.
            </p>
            <p>
              You matter to me more than my pride ever did. And if I could fold
              this apology into a paper lantern and send it into your sky, I
              would hope it lands softly — right where your heart is.
            </p>
          </div>
          <div className="mt-14 text-right">
            <p className="font-script text-3xl sm:text-4xl text-[#1A1A1A]">
              with all my heart,
            </p>
            <p className="font-script text-4xl sm:text-5xl text-[#8A5A1A] mt-2">
              Sadan
            </p>
          </div>
        </motion.div>
      </FadeUp>
    </div>
  </section>
);

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Send, PenLine } from "lucide-react";
import axios from "axios";
import { FadeUp } from "./KineticText";
import { Lantern } from "./Lantern";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const EASE = [0.22, 1, 0.36, 1];

export const Finale = () => {
  const [forgiven, setForgiven] = useState(false);
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  const sendReply = async () => {
    if (!reply.trim() || sending) return;
    setSending(true);
    setError(false);
    try {
      await axios.post(`${API}/replies`, { message: reply.trim() });
      setSent(true);
    } catch (e) {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  const release = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 80,
        size: 36 + Math.random() * 70,
        delay: Math.random() * 1.6,
        duration: 7 + Math.random() * 5,
        drift: (Math.random() - 0.5) * 120,
      })),
    []
  );

  return (
    <section
      data-testid="finale-section"
      className="relative z-10 min-h-screen flex items-center justify-center overflow-hidden py-40"
    >
      {/* rising lanterns on forgive */}
      <AnimatePresence>
        {forgiven &&
          release.map((l) => (
            <motion.div
              key={l.id}
              className="absolute bottom-[-20vh] z-[5] pointer-events-none"
              style={{ left: `calc(50% + ${l.x}vw * 0.5)` }}
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: "-160vh", x: l.drift, opacity: [0, 1, 1, 0.9] }}
              transition={{ duration: l.duration, delay: l.delay, ease: "easeOut" }}
            >
              <motion.div
                animate={{ rotate: [-3, 3, -3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Lantern size={l.size} />
              </motion.div>
            </motion.div>
          ))}
      </AnimatePresence>

      {/* golden takeover glow */}
      <motion.div
        className="absolute inset-0 z-[1] pointer-events-none flex items-center justify-center"
        animate={forgiven ? { opacity: 1, scale: 1.2 } : { opacity: 0.35, scale: 1 }}
        transition={{ duration: 2.5, ease: EASE }}
      >
        <div className="lantern-aura w-[90vmin] h-[90vmin] rounded-full" />
      </motion.div>

      <div className="relative z-10 text-center px-6 max-w-3xl">
        <AnimatePresence mode="wait">
          {!forgiven ? (
            <motion.div
              key="ask"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <FadeUp>
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.5em] text-[#A3A8B7] mb-10 font-light">
                  one last thing
                </p>
                <h2 className="font-display italic font-light text-5xl sm:text-7xl lg:text-8xl text-[#F8F5EE] leading-tight">
                  Will you
                  <br />
                  <span className="gold-glow text-[#F2E8CF] not-italic">forgive me?</span>
                </h2>
              </FadeUp>

              <FadeUp delay={0.3} className="mt-16">
                <div className="relative inline-block">
                  <div className="pulse-ring absolute inset-0 rounded-full border border-[#FFB84D]/50" />
                  <button
                    data-testid="forgive-me-btn"
                    onClick={() => setForgiven(true)}
                    className="forgive-btn relative rounded-full border border-[#D4AF37]/50 bg-[#0A1128]/60 backdrop-blur-md px-10 sm:px-14 py-5 sm:py-6 font-display italic text-xl sm:text-2xl text-[#F2E8CF] cursor-pointer"
                  >
                    <span className="flex items-center gap-3">
                      <Heart size={20} className="text-[#FFB84D]" fill="currentColor" />
                      I forgive you
                    </span>
                  </button>
                </div>
                <p className="mt-8 text-xs font-light tracking-[0.25em] uppercase text-[#A3A8B7]/70">
                  press it, and watch the sky
                </p>
              </FadeUp>
            </motion.div>
          ) : (
            <motion.div
              key="thanks"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.4, ease: EASE }}
              data-testid="thank-you-message"
            >
              <p className="font-script text-6xl sm:text-8xl lg:text-9xl text-[#F2E8CF] gold-glow leading-tight">
                Thank you, Pratishtha
              </p>
              <p className="mt-10 font-display italic font-light text-xl sm:text-2xl lg:text-3xl text-[#A3A8B7] leading-relaxed max-w-xl mx-auto">
                Every lantern rising tonight carries a promise — to listen more,
                to choose kindness first, and to never let the silence come
                between us again.
              </p>
              <div className="mt-14 flex items-center justify-center gap-4">
                <div className="h-px w-16 bg-[#D4AF37]/40" />
                <Heart size={16} className="text-[#FFB84D]" fill="currentColor" />
                <div className="h-px w-16 bg-[#D4AF37]/40" />
              </div>

              {/* reply to Sadan */}
              <motion.div
                data-testid="reply-section"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 1.6, ease: EASE }}
                className="mt-16 mx-auto max-w-md"
              >
                <AnimatePresence mode="wait">
                  {!sent ? (
                    <motion.div
                      key="form"
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.6, ease: EASE }}
                      className="rounded-2xl border border-[#D4AF37]/25 bg-[#0A1128]/60 backdrop-blur-md p-6 sm:p-8"
                    >
                      <p className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.35em] text-[#A3A8B7] font-light mb-5">
                        <PenLine size={13} className="text-[#D4AF37]" />
                        a note back to Sadan
                      </p>
                      <textarea
                        data-testid="reply-textarea"
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                        rows={3}
                        maxLength={500}
                        placeholder="write anything, even one word…"
                        className="w-full resize-none rounded-xl bg-[#030408]/70 border border-[#D4AF37]/20 px-4 py-3 font-script text-2xl text-[#F2E8CF] placeholder:text-[#A3A8B7]/40 placeholder:text-lg focus:outline-none focus:border-[#D4AF37]/60 transition-colors duration-300"
                      />
                      <button
                        data-testid="reply-send-btn"
                        onClick={sendReply}
                        disabled={!reply.trim() || sending}
                        className="forgive-btn mt-4 w-full rounded-full border border-[#D4AF37]/50 bg-[#030408]/60 px-6 py-3 font-display italic text-lg text-[#F2E8CF] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        <span className="flex items-center justify-center gap-2">
                          <Send size={15} className="text-[#FFB84D]" />
                          {sending ? "sending…" : "send it into the sky"}
                        </span>
                      </button>
                      {error && (
                        <p data-testid="reply-error" className="mt-3 text-xs text-[#FFB84D] tracking-wide">
                          the sky swallowed that one — try once more
                        </p>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="done"
                      data-testid="reply-confirmation"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.9, ease: EASE }}
                      className="text-center"
                    >
                      <Heart size={18} className="mx-auto text-[#FFB84D] mb-4" fill="currentColor" />
                      <p className="font-script text-3xl sm:text-4xl text-[#F2E8CF]">
                        your words are flying to Sadan
                      </p>
                      <p className="mt-3 text-xs uppercase tracking-[0.3em] text-[#A3A8B7]/70 font-light">
                        carried by the last lantern of the night
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

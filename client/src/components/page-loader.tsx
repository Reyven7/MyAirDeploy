import { motion } from "framer-motion";

const PageLoader = () => {
  return (
    <div className="fixed inset-0 w-screen h-screen bg-white flex items-center justify-center z-[999] px-5 overflow-hidden">
      <div className="flex flex-col items-center justify-center -translate-y-[5%]">
        {/* Plane */}
        <motion.img
          src="plane.svg"
          alt="Plane"
          className="w-[160px] max-w-[50vw] mb-1 mt-10 drop-shadow-lg pointer-events-none select-none"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
        />

        {/* MYAIR */}
        <motion.div
          className="flex flex-wrap justify-center text-center font-black uppercase font-sans gap-2 text-[clamp(32px,8vw,100px)] mt-2"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.12,
                delayChildren: 1.0,
              },
            },
          }}
        >
          {["M", "Y", "A", "I", "R"].map((char, i) => (
            <motion.span
              key={i}
              className="bg-gradient-to-r from-black via-neutral-900 to-black bg-[length:300%_300%] bg-clip-text text-transparent animate-pulse"
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.4, ease: "easeOut" },
                },
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>

        {/* Subtitle */}
        <motion.div
          className="mt-4 text-[clamp(14px,2vw,22px)] font-semibold text-gray-800 uppercase tracking-wide text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 1.4 }}
        >
          FLIGHTS & HOTELS
        </motion.div>
      </div>
    </div>
  );
};

export default PageLoader;

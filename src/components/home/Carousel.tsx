import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    img: "/img/main-banner-2.jpg",
    title: "Professional Home Cleaning",
    subtitle: "Trusted • Affordable • On-Time Service",
  },
  {
    img: "/img/main-banner-1.jpg",
    title: "Deep Cleaning Experts",
    subtitle: "Make your home shine again",
  },
  {
    img: "/img/main-banner-3.jpg",
    title: "Hassle-Free Booking",
    subtitle: "Book services in just one click",
  },
];

export default function ImageCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const duration = current === 0 ? 8000 : 4000;
    const timer = setTimeout(
      () => setCurrent((prev) => (prev + 1) % slides.length),
      duration,
    );
    return () => clearTimeout(timer);
  }, [current]);

  return (
    <div className="carousel-wrapper small">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="carousel-slide"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ backgroundImage: `url(${slides[current].img})` }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(_, info) => {
            if (info.offset.x < -80) setCurrent((current + 1) % slides.length);
            if (info.offset.x > 80)
              setCurrent((current - 1 + slides.length) % slides.length);
          }}
        >
          <div className="carousel-overlay compact">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {slides[current].title}
            </motion.h1>

            <motion.p
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {slides[current].subtitle}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="carousel-dots">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`dot ${i === current ? "active" : ""}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </div>
  );
}

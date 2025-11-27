import React, { useEffect, useState, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

export default function CountUp({ to, duration = 2, suffix = '', className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
    duration: duration * 1000
  });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (inView) {
      motionValue.set(to);
    }
  }, [inView, to, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  return (
    <span ref={ref} className={className}>
      {displayValue}{suffix}
    </span>
  );
}

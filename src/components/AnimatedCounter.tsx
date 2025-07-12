import { useState, useEffect } from "react";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
}

export default function AnimatedCounter({
  value,
  duration = 1000,
  suffix = "",
}: AnimatedCounterProps) {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      // Используем easing функцию для плавной анимации
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      const newValue = Math.floor(easeOutQuart * value);

      setCurrentValue(newValue);

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    if (value > 0) {
      animationFrame = requestAnimationFrame(animate);
    } else {
      setCurrentValue(0);
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [value, duration]);

  return (
    <span>
      {currentValue.toLocaleString("ru-RU")}
      {suffix}
    </span>
  );
}

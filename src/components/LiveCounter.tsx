import { useEffect, useState } from 'react';

interface Props {
  min: number;
  max: number;
  interval?: number;
  className?: string;
}

export default function LiveCounter({ min, max, interval = 8000, className = '' }: Props) {
  const [value, setValue] = useState(min + Math.floor(Math.random() * (max - min)));

  useEffect(() => {
    const timer = setInterval(() => {
      setValue(min + Math.floor(Math.random() * (max - min + 1)));
    }, interval + Math.random() * 3000);
    return () => clearInterval(timer);
  }, [min, max, interval]);

  return <span className={className}>{value}</span>;
}

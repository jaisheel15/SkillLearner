import React from 'react';
import { Trophy } from 'lucide-react';
import { useSpring, animated } from 'react-spring';

interface Props {
  title: string;
  description: string;
  icon: string;
  onClose: () => void;
}

export default function AchievementPopup({ title, description, icon, onClose }: Props) {
  const animation = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 300, friction: 20 },
  });

  React.useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <animated.div
      style={animation}
      className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-sm"
    >
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
            <Trophy className="w-6 h-6 text-yellow-500" />
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-lg dark:text-white">{title}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
        </div>
        <div className="text-2xl">{icon}</div>
      </div>
    </animated.div>
  );
}
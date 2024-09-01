import { useEffect, useState } from 'react';
import '../index.css'; // Import the CSS file for animations

interface QuoteProps {
  message: string;
  fontSize: number; // Base font size in pixels
}

export function Quote({ message, fontSize }: QuoteProps) {
  const [displayedText, setDisplayedText] = useState<string[]>([]);
  const [responsiveFontSize, setResponsiveFontSize] = useState<number>(fontSize);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 640) { // Small screens (e.g., mobile)
        setResponsiveFontSize(fontSize * 0.7);
        setIsLargeScreen(false);
      } else if (width < 1024) { // Medium screens (e.g., tablets)
        setResponsiveFontSize(fontSize * 0.85);
        setIsLargeScreen(false);
      } else { // Large screens (e.g., desktops)
        setResponsiveFontSize(fontSize);
        setIsLargeScreen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [fontSize]);

  useEffect(() => {
    const animateText = async () => {
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const segments = message.match(/[^ .,!?]+|[ .,!?]/g) || [];
      let currentTextArray = new Array(segments.length).fill('');

      const animateSegment = async (segment: string, index: number) => {
        let animatedSegment = '';

        for (let i = 0; i < segment.length; i++) {
          const char = segment[i].toUpperCase();

          if (alphabet.includes(char)) {
            for (let j = 0; j <= alphabet.indexOf(char); j++) {
              animatedSegment = animatedSegment.slice(0, i) + alphabet[j] + animatedSegment.slice(i + 1);
              currentTextArray[index] = animatedSegment;
              setDisplayedText([...currentTextArray]);
              await new Promise(resolve => setTimeout(resolve, 100));
            }
          } else {
            animatedSegment += segment[i];
            currentTextArray[index] = animatedSegment;
            setDisplayedText([...currentTextArray]);
          }
        }

        currentTextArray[index] = segment; // Ensure the final segment is correctly set
        setDisplayedText([...currentTextArray]);
      };

      await Promise.all(segments.map((segment, index) => animateSegment(segment, index)));
    };

    animateText();
  }, [message]);

  return (
    <div
      className={`relative flex items-center justify-center ${isLargeScreen ? 'min-h-screen' : 'h-40'} bg-black overflow-hidden p-4 lg:p-16`}
    >
      <div className="relative z-10 text-center">
        <p
          style={{ fontSize: `${responsiveFontSize}px`, whiteSpace: 'normal', wordWrap: 'break-word' }}
          className="font-bold text-white uppercase"
        >
          {displayedText.join('')}
        </p>
      </div>
    </div>
  );
}

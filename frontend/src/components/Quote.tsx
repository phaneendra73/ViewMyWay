import { useEffect, useState } from 'react';
import '../index.css'; // Import the CSS file for animations

interface QuoteProps {
  message: string;
  fontSize: number;
}

export function Quote({ message, fontSize }: QuoteProps) {
  const [displayedText, setDisplayedText] = useState<string[]>([]);

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
              await new Promise(resolve => setTimeout(resolve, 100)); // Delay per letter change
            }
          } else {
            // If it's not a letter, just add it to the animatedSegment
            animatedSegment += segment[i];
            currentTextArray[index] = animatedSegment;
            setDisplayedText([...currentTextArray]);
          }
        }

        currentTextArray[index] = segment; // Ensure the final segment is correctly set
        setDisplayedText([...currentTextArray]);
      };

      // Animate each segment simultaneously
      await Promise.all(segments.map((segment, index) => animateSegment(segment, index)));
    };

    animateText();
  }, [message]);

  return (
    <div className="relative flex items-center justify-center h-screen bg-black overflow-hidden">
      <div className="relative z-10 p-4 bg-transparent text-center">
        <p style={{ fontSize: `${fontSize}px` }} className="font-bold text-white">
          {displayedText.join('')}
        </p>
      </div>
    </div>
  );
}

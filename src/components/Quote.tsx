import { useEffect, useState } from 'react';
import '../index.css'; // Import the CSS file for animations
import Button from './Button';

interface QuoteProps {
  initialMessage: string;
  initialAuthor: string;
  fontSize: number; // Base font size in pixels
}

export function Quote({ initialMessage, initialAuthor, fontSize }: QuoteProps) {
  const [displayedText, setDisplayedText] = useState<string>(initialMessage);
  const [author, setAuthor] = useState<string>(initialAuthor);
  const [animatedAuthor, setAnimatedAuthor] = useState<string>('');
  const [responsiveFontSize, setResponsiveFontSize] = useState<number>(fontSize);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setResponsiveFontSize(fontSize * 0.7);
        setIsLargeScreen(false);
      } else if (width < 1024) {
        setResponsiveFontSize(fontSize * 0.85);
        setIsLargeScreen(false);
      } else {
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

  const animateAuthor = async (author: string) => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const segments = author.split(' '); // Split by space for multi-word authors
    let currentTextArray = new Array(segments.length).fill('');

    const animateSegment = async (segment: string, index: number) => {
      let animatedSegment = '';

      for (let i = 0; i < segment.length; i++) {
        const char = segment[i].toLowerCase();

        if (alphabet.includes(char)) {
          for (let j = 0; j <= alphabet.indexOf(char); j++) {
            animatedSegment = animatedSegment.slice(0, i) + alphabet[j] + animatedSegment.slice(i + 1);
            currentTextArray[index] = animatedSegment;
            setAnimatedAuthor(currentTextArray.join(' ')); // Update animated author
            await new Promise(resolve => setTimeout(resolve, 100));
          }
        } else {
          animatedSegment += segment[i];
          currentTextArray[index] = animatedSegment;
          setAnimatedAuthor(currentTextArray.join(' ')); // Update animated author
        }
      }

      currentTextArray[index] = segment; // Ensure the final segment is correctly set
      setAnimatedAuthor(currentTextArray.join(' ')); // Final update
    };

    await Promise.all(segments.map((segment, index) => animateSegment(segment, index)));
  };

  const fetchNewQuote = async () => {
    const response = await fetch('http://api.quotable.io/random');
    const data = await response.json();
    const newQuote = data.content;
    const newAuthor = data.author;

    setDisplayedText(newQuote); // Update the quote
    setAuthor(newAuthor); // Update author name
    setAnimatedAuthor(''); // Clear previous animation
    await animateAuthor(newAuthor); // Animate the new author name
  };

  return (
    <div className={`relative flex items-center justify-center ${isLargeScreen ? 'min-h-screen' : 'h-40'} bg-black overflow-hidden p-4 lg:p-16`}>
      <div className="relative z-10 text-center fade-in">
        <p
          style={{ fontSize: `${responsiveFontSize}px`, whiteSpace: 'normal', wordWrap: 'break-word' }}
          className="font-bold text-white uppercase text-center"
        >
          “{displayedText}” {/* Display the quote */}
        </p>
        <p className="text-white italic mt-2">
          — {animatedAuthor || author} {/* Show the animated author's name */}
        </p>
        <Button className="mt-4" onClick={fetchNewQuote}>
          Refresh
        </Button>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Shield, KeyRound } from 'lucide-react';
import { PinInput } from './PinAuth/PinInput';
import { ThemeToggle } from './ThemeToggle';

const CORRECT_PIN = '776752';

interface LandingPageProps {
  onAuthSuccess: () => void;
}

export function LandingPage({ onAuthSuccess }: LandingPageProps) {
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  const handlePinComplete = (pin: string) => {
    if (pin === CORRECT_PIN) {
      onAuthSuccess();
    } else {
      setAttempts(prev => prev + 1);
      setError('Incorrect PIN. Please try again.');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center 
                    bg-gradient-to-br from-blue-50 to-indigo-50
                    dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 
                    rounded-2xl shadow-xl transition-colors duration-200">
        <div className="text-center">
          <div className="inline-flex p-3 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
            <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome to Note Diary
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Please enter your 6-digit PIN to continue
          </p>
        </div>

        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-center space-x-2">
            <KeyRound className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Enter your secure PIN
            </span>
          </div>
          
          <PinInput onComplete={handlePinComplete} />
          
          {error && (
            <p className="text-red-500 text-sm animate-shake">
              {error}
            </p>
          )}
          
          {attempts > 2 && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Hint: The correct PIN starts with 77
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
'use client'

import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OTPInputProps {
  length?: number;
  onComplete?: (code: string) => void;
  onResend?: () => Promise<void>;
  loading?: boolean;
  error?: string | null;
  className?: string;
}

export function OTPInput({
  length = 6,
  onComplete,
  onResend,
  loading = false,
  error = null,
  className
}: OTPInputProps) {
  const [code, setCode] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    if (code.every(digit => digit !== '') && onComplete) {
      onComplete(code.join(''));
    }
  }, [code]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, length);
    const newCode = [...code];
    
    pasteData.split('').forEach((char, i) => {
      if (i < length && /^\d*$/.test(char)) {
        newCode[i] = char;
      }
    });

    setCode(newCode);
    inputRefs.current[Math.min(pasteData.length, length - 1)]?.focus();
  };

  const handleResend = async () => {
    if (onResend) {
      await onResend();
      setCode(Array(length).fill('')); // Reset code
      inputRefs.current[0]?.focus(); // Focus on first input
    }
  };

  return (
    <div className={cn('space-y-6', className)}>
      <div className="flex items-center justify-center gap-2">
        {code.map((digit, index) => (
          <Input
            key={index}
            ref={(el) => el && (inputRefs.current[index] = el)}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            type="text"
            inputMode="numeric"
            maxLength={1}
            disabled={loading}
            className={cn(
              'w-12 h-12 text-center text-xl font-semibold',
              'border-2 focus:border-primary focus:ring-0',
              error ? 'border-destructive' : 'border-input',
              loading && 'opacity-50 cursor-not-allowed'
            )}
            dir="rtl" // Ensure left-to-right input
          />
        ))}
      </div>

      {error && (
        <div className="flex items-center justify-center gap-2 text-destructive">
          <XCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>در حال بررسی کد...</span>
        </div>
      )}

      {onResend && (
        <div className="text-center">
          <Button
            type="button"
            variant="link"
            onClick={handleResend}
            disabled={loading}
            className="text-sm text-muted-foreground"
          >
            ارسال مجدد کد
          </Button>
        </div>
      )}
    </div>
  );
}
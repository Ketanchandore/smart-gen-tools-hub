
import React from 'react';
import { Unlock } from 'lucide-react';
import BasicToolImplementation from '@/components/BasicToolImplementation';

const UnlockPdf = () => {
  const unlockPdf = async (input: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return "PDF password protection removed successfully. Document is now accessible without password restrictions.";
  };

  return (
    <BasicToolImplementation
      title="Unlock PDF"
      description="Remove password protection from PDF documents"
      icon={<Unlock className="h-8 w-8 text-primary" />}
      inputPlaceholder="Upload your password-protected PDF file..."
      buttonText="Remove Password"
      processFunction={unlockPdf}
    />
  );
};

export default UnlockPdf;

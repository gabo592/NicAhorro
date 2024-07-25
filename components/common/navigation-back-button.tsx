'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { ChevronLeft } from 'lucide-react';

const NavigationBackButton = () => {
  const router = useRouter();

  return (
    <Button variant="outline" size="icon" onClick={() => router.back()}>
      <ChevronLeft className="h-4 w-4" />
    </Button>
  );
};

export default NavigationBackButton;

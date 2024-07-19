'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <Button size="icon" onClick={handleClick}>
      <ArrowLeft />
    </Button>
  );
};

export default BackButton;

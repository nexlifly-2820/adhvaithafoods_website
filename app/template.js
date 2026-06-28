'use client';
import PageLoader from '@/components/PageLoader';

export default function Template({ children }) {
  return (
    <>
      <PageLoader />
      {children}
    </>
  );
}

'use client';
import PageLoader from '@/components/PageLoader';
import { usePathname } from 'next/navigation';

export default function Template({ children }) {
  const pathname = usePathname();
  
  const hideLoaderRoutes = [
    '/terms-and-conditions',
    '/privacy-policy',
    '/refund-policy',
    '/shipping-policy'
  ];

  const shouldHideLoader = hideLoaderRoutes.includes(pathname);

  return (
    <>
      {!shouldHideLoader && <PageLoader />}
      {children}
    </>
  );
}

import { useEffect } from 'react';

interface SeoProps {
  title: string;
  description: string;
}

export function useSeo({ title, description }: SeoProps) {
  useEffect(() => {
    document.title = title;
    const meta =
      document.querySelector('meta[name="description"]') ??
      document.createElement('meta');
    meta.setAttribute('name', 'description');
    meta.setAttribute('content', description);
    if (!meta.parentElement) {
      document.head.appendChild(meta);
    }
  }, [title, description]);
}

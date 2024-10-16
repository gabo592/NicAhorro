'use client';

import { Input } from '../ui/input';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

interface SearchProps {
  placeholder?: string;
}

export default function Search({ placeholder = 'Buscar...' }: SearchProps) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    router.replace(`${pathName}?${params.toString()}`);
  }, 300);

  return (
    <Input
      type="search"
      placeholder={placeholder}
      className='min-w-40 w-full'
      onChange={(e) => handleSearch(e.target.value)}
      defaultValue={searchParams.get('query')?.toString()}
    />
  );
}

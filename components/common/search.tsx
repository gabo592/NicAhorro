'use client';

import { Input } from '../ui/input';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Skeleton } from '../ui/skeleton';

interface SearchProps {
  placeholder?: string;
}

function Search({ placeholder = 'Buscar...' }: SearchProps) {
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

export default function SearchBar() {
  return (
    <Suspense fallback={<Skeleton className='min-w-40 h-9 rounded-md' />}>
      <Search />
    </Suspense>
  )
}

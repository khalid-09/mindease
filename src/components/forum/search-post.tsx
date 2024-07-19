'use client';

import { Input } from '@/components/ui/input';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

const SearchPost = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, push } = useRouter();

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    const currentQuery = searchParams.get('query') || '';
    if (value !== currentQuery) {
      params.set('page', '1');
    }

    if (value) {
      params.set('query', value);
    } else {
      params.delete('query');
    }

    // replace(`${pathname}?${params.toString()}`);
    const newQuery = params.toString();
    push(`${pathname}?${newQuery}`, undefined);
  }, 300);

  return (
    <div className="relative">
      <Input
        className="md:w-48 w-full px-7"
        placeholder="Search.."
        defaultValue={searchParams.get('query')?.toString()}
        onChange={e => {
          handleSearch(e.target.value);
        }}
      />
      <span>
        <MagnifyingGlassIcon className="absolute top-[10px] left-2 " />
      </span>
    </div>
  );
};

export default SearchPost;

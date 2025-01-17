'use client';

import { useState } from 'react';
import { SearchIcon, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import qs from 'query-string';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Search = () => {
    const router = useRouter();
    const [value, setValue] = useState('');

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!value) {
            const url = qs.stringifyUrl(
                {
                    url: '/search',
                },
                { skipEmptyString: true }
            );

            router.push(url);
        } else {
            const url = qs.stringifyUrl(
                {
                    url: '/search',
                    query: { keyword: value },
                },
                { skipEmptyString: true }
            );

            router.push(url);
        }
    };

    const onClear = () => {
        setValue('');
    };
    return (
        <form
            onSubmit={onSubmit}
            className="relative flex w-full items-center"
        >
            <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Search"
                className="mr-[1px] rounded-r-none bg-background focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
            />
            {value && (
                <X
                    onClick={onClear}
                    className="absolute right-14 top-2.5 h-5 w-5 cursor-pointer text-muted-foreground transition hover:opacity-75"
                />
            )}
            <Button
                type="submit"
                size="sm"
                variant="secondary"
                className="rounded-l-none"
            >
                <SearchIcon className="h-5 w-5 text-muted-foreground" />
            </Button>
        </form>
    );
};

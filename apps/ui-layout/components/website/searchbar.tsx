'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import {
  Component,
  LaptopIcon,
  MoonIcon,
  SearchIcon,
  SunIcon,
} from 'lucide-react';
import { Command } from 'cmdk';
import { Dialog, DialogContent } from '@/components/website/ui/dialog';
import { ScrollArea } from '@/components/website/ui//scroll-area';
import { cn } from '@/lib/utils';
import { basePath } from './sidebar';
import { MainComponents, SpecialComponents } from '@/configs/docs';

export type SearchItem = {
  href: string;
  name: string;
  tags?: string[];
  icon?: React.ReactNode;
  new?: boolean;
  updated?: boolean;
  component?: string;
};

export function SearchDialog({
  classname,
  searchBar = false,
}: {
  classname?: string;
  searchBar?: boolean;
}) {
  const router = useRouter();
  const { setTheme } = useTheme();
  const searchbardata: SearchItem[] = [
    ...basePath,
    ...SpecialComponents,
    ...MainComponents,
  ];

  const [searchOpen, setSearchOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setSearchOpen((searchOpen) => !searchOpen);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setSearchOpen(false);
    command();
  }, []);

  return (
    <>
      <button
        className={cn(
          'relative inline-flex w-full items-center justify-start gap-2 whitespace-nowrap rounded-[0.5rem] border border-input bg-white px-4 py-2 text-sm font-normal text-muted-foreground shadow-none transition-colors hover:border-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 dark:bg-black sm:pr-12',
          classname
        )}
        onClick={() => setSearchOpen(true)}
      >
        <SearchIcon className='shrink-0' size={20} />
        {!searchBar && (
          <>
            <span className='hidden sm:inline-flex'>Search...</span>
            <kbd className='pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-7 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex'>
              <span className='text-xs'>⌘</span>K
            </kbd>
          </>
        )}
      </button>

      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className='w-[90%] rounded-md border p-0 lg:w-[500px] pb-2  max-w-2xl  xl:w-full'>
          <Command className='[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-14 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5'>
            <Command.Input
              placeholder='Type a command or search...'
              className='w-full rounded-tl-lg rounded-tr-lg border-b px-4  outline-none dark:bg-[#010309]'
            />

            <Command.List className='border-none'>
              <ScrollArea className='h-[60vh]'>
                <Command.Empty className=' p-4'>
                  No results found.
                </Command.Empty>
                <Command.Group className='py-2'>
                  <span className='block p-2 text-xs font-semibold'>
                    Follow for more updates
                  </span>
                  <a
                    href='https://x.com/naymur_dev'
                    target='_blank'
                    className='flex w-full items-center gap-2 rounded-md bg-blue-500/20 p-3'
                  >
                    <svg
                      width='120'
                      height='109'
                      viewBox='0 0 120 109'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-4 fill-primary'
                    >
                      <path d='M94.5068 0H112.907L72.7076 46.172L120 109H82.9692L53.9674 70.8942L20.7818 109H2.3693L45.3666 59.6147L0 0H37.9685L64.1848 34.8292L94.5068 0ZM88.0484 97.9318H98.2448L32.4288 10.4872H21.4882L88.0484 97.9318Z' />
                    </svg>{' '}
                    @naymur_dev
                  </a>
                </Command.Group>
                <Command.Group className='py-2 h-full space-y-2'>
                  <span className='block p-2 pl-0 text-xs font-semibold'>
                    Getting Started
                  </span>
                  {searchbardata.map((category, categoryIndex) => (
                    <React.Fragment key={categoryIndex}>
                      <Command.Item
                        className='relative flex  select-none  rounded-lg flex-col  px-2 py-1.5 text-sm outline-none cursor-pointer aria-selected:bg-accent/80 aria-selected:text-accent-foreground aria-selected:border   border mb-2'
                        value={`${category.name} ${
                          category?.tags?.join(' ') || ''
                        }`}
                        onSelect={() => {
                          runCommand(() =>
                            router.push(category.href as string)
                          );
                        }}
                      >
                        <div className='flex items-center'>
                          <Component className='mr-2 h-4 w-4' />
                          <div className='flex flex-col'>
                            <span>{category.name}</span>
                            <span className='text-xs text-muted-foreground'>
                              {category.href}
                            </span>
                          </div>
                        </div>
                        {category?.tags && category?.tags.length > 0 && (
                          <div className='mt-1 flex flex-wrap gap-1 text-xs text-primary'>
                            {category?.tags
                              ?.slice(0, 7)
                              .map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className='inline-block rounded border bg-gray-100 px-2 py-1 dark:bg-gray-800'
                                >
                                  {tag}
                                </span>
                              ))}
                          </div>
                        )}
                      </Command.Item>
                    </React.Fragment>
                  ))}
                </Command.Group>

                <Command.Separator />
                <Command.Group className='rounded-xl py-2 dark:bg-[#010309]'>
                  <span className='block p-1 py-2'>Theme</span>
                  <Command.Item
                    className='relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:opacity-75'
                    onSelect={() => runCommand(() => setTheme('light'))}
                  >
                    <SunIcon className='mr-2 h-4 w-4' />
                    Light
                  </Command.Item>
                  <Command.Item
                    className='relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:opacity-75'
                    onSelect={() => runCommand(() => setTheme('dark'))}
                  >
                    <MoonIcon className='mr-2 h-4 w-4' />
                    Dark
                  </Command.Item>
                  <Command.Item
                    className='relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:opacity-75'
                    onSelect={() => runCommand(() => setTheme('system'))}
                  >
                    <LaptopIcon className='mr-2 h-4 w-4' />
                    System
                  </Command.Item>
                </Command.Group>
              </ScrollArea>
            </Command.List>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}

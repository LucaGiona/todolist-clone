'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { CheckSquare, Tag, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import type { Tag as TagType } from '@/db/schema';

interface SidebarProps {
  tags: TagType[];
}

export function Sidebar({ tags }: SidebarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTag = searchParams.get('tag');

  return (
    <aside className="flex w-64 flex-col border-r bg-muted/30 px-3 py-4">
      <div className="mb-6 flex items-center gap-2 px-2">
        <CheckSquare className="h-6 w-6 text-primary" />
        <span className="text-lg font-semibold">Todoist Clone</span>
      </div>

      <nav className="space-y-1">
        <Link
          href="/"
          className={cn(
            'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent',
            pathname === '/' && !activeTag ? 'bg-accent text-accent-foreground' : 'text-foreground/70'
          )}
        >
          <Home className="h-4 w-4" />
          All Tasks
        </Link>

        <Link
          href="/tags"
          className={cn(
            'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent',
            pathname === '/tags' ? 'bg-accent text-accent-foreground' : 'text-foreground/70'
          )}
        >
          <Tag className="h-4 w-4" />
          Manage Tags
        </Link>
      </nav>

      {tags.length > 0 && (
        <>
          <Separator className="my-4" />
          <p className="mb-2 px-3 text-xs font-semibold uppercase text-muted-foreground">Tags</p>
          <nav className="space-y-1">
            {tags.map((tag) => (
              <Link
                key={tag.id}
                href={`/?tag=${tag.id}`}
                className={cn(
                  'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent',
                  activeTag === tag.id
                    ? 'bg-accent text-accent-foreground'
                    : 'text-foreground/70'
                )}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: tag.color }}
                />
                {tag.name}
              </Link>
            ))}
          </nav>
        </>
      )}
    </aside>
  );
}

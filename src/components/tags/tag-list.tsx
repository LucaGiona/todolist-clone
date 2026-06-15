'use client';

import { TagItem } from './tag-item';
import type { Tag } from '@/db/schema';
import { Tag as TagIcon } from 'lucide-react';

interface TagListProps {
  tags: Tag[];
}

export function TagList({ tags }: TagListProps) {
  if (tags.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <TagIcon className="mb-4 h-12 w-12 text-muted-foreground/40" />
        <p className="text-lg font-medium text-muted-foreground">No tags yet</p>
        <p className="text-sm text-muted-foreground/70">Create tags to organize your tasks</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {tags.map((tag) => (
        <TagItem key={tag.id} tag={tag} />
      ))}
    </div>
  );
}

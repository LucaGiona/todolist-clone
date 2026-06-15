'use client';

import { useState } from 'react';
import { deleteTag } from '@/actions/tags';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { EditTagDialog } from './edit-tag-dialog';
import { Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import type { Tag } from '@/db/schema';

interface TagItemProps {
  tag: Tag;
}

export function TagItem({ tag }: TagItemProps) {
  const [editOpen, setEditOpen] = useState(false);

  async function handleDelete() {
    await deleteTag(tag.id);
    toast.success('Tag deleted');
  }

  return (
    <>
      <Card className="group flex items-center gap-3 p-4">
        <span
          className="h-4 w-4 shrink-0 rounded-full"
          style={{ backgroundColor: tag.color }}
        />
        <span className="flex-1 text-sm font-medium">{tag.name}</span>
        <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setEditOpen(true)}
            aria-label="Edit tag"
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-destructive hover:text-destructive"
            onClick={handleDelete}
            aria-label="Delete tag"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </Card>

      <EditTagDialog tag={tag} open={editOpen} onOpenChange={setEditOpen} />
    </>
  );
}

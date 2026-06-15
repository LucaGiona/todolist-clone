'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import type { Tag, TodoWithTags } from '@/db/schema';

interface TodoFormFieldsProps {
  tags: Tag[];
  defaultValues?: Partial<TodoWithTags>;
}

export function TodoFormFields({ tags, defaultValues }: TodoFormFieldsProps) {
  const selectedTagIds = defaultValues?.tags?.map((t) => t.id) ?? [];

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          name="title"
          placeholder="What needs to be done?"
          defaultValue={defaultValues?.title}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Add details..."
          rows={3}
          defaultValue={defaultValues?.description ?? ''}
        />
      </div>
      {tags.length > 0 && (
        <div className="space-y-2">
          <Label>Tags</Label>
          <div className="flex flex-wrap gap-3">
            {tags.map((tag) => (
              <label key={tag.id} className="flex cursor-pointer items-center gap-2">
                <Checkbox
                  name="tagIds"
                  value={tag.id}
                  defaultChecked={selectedTagIds.includes(tag.id)}
                />
                <span
                  className="inline-flex items-center gap-1 text-sm"
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: tag.color }}
                  />
                  {tag.name}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

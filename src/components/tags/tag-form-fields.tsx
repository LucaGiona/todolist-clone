'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Tag } from '@/db/schema';

const PRESET_COLORS = [
  '#6366f1', // indigo
  '#ec4899', // pink
  '#f97316', // orange
  '#22c55e', // green
  '#3b82f6', // blue
  '#a855f7', // purple
  '#ef4444', // red
  '#eab308', // yellow
  '#14b8a6', // teal
  '#64748b', // slate
];

interface TagFormFieldsProps {
  defaultValues?: Partial<Tag>;
}

export function TagFormFields({ defaultValues }: TagFormFieldsProps) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="tag-name">Name *</Label>
        <Input
          id="tag-name"
          name="name"
          placeholder="e.g. Work, Personal, Fun"
          defaultValue={defaultValues?.name}
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Color</Label>
        <div className="flex flex-wrap gap-2">
          {PRESET_COLORS.map((color) => (
            <label key={color} className="cursor-pointer">
              <input
                type="radio"
                name="color"
                value={color}
                defaultChecked={(defaultValues?.color ?? '#6366f1') === color}
                className="sr-only"
              />
              <span
                className="block h-7 w-7 rounded-full ring-offset-2 transition-all hover:scale-110 peer-checked:ring-2"
                style={{ backgroundColor: color }}
                title={color}
              />
            </label>
          ))}
        </div>
      </div>
    </>
  );
}

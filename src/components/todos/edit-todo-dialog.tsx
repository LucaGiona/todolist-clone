'use client';

import { useState } from 'react';
import { updateTodo } from '@/actions/todos';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { TodoFormFields } from './todo-form-fields';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import type { Tag, TodoWithTags } from '@/db/schema';

interface EditTodoDialogProps {
  todo: TodoWithTags;
  tags: Tag[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditTodoDialog({ todo, tags, open, onOpenChange }: EditTodoDialogProps) {
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    try {
      const result = await updateTodo(todo.id, new FormData(e.currentTarget));
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success('Task updated');
        onOpenChange(false);
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TodoFormFields tags={tags} defaultValues={todo} />
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={pending}>
              {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

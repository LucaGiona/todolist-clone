'use client';

import { useState } from 'react';
import { toggleTodo, deleteTodo } from '@/actions/todos';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { EditTodoDialog } from './edit-todo-dialog';
import { Pencil, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import type { Tag, TodoWithTags } from '@/db/schema';

interface TodoItemProps {
  todo: TodoWithTags;
  tags: Tag[];
}

export function TodoItem({ todo, tags }: TodoItemProps) {
  const [editOpen, setEditOpen] = useState(false);

  async function handleToggle() {
    await toggleTodo(todo.id);
  }

  async function handleDelete() {
    await deleteTodo(todo.id);
    toast.success('Task deleted');
  }

  return (
    <>
      <Card className="group flex items-start gap-3 p-4 transition-shadow hover:shadow-md">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={handleToggle}
          className="mt-0.5 shrink-0"
          aria-label={`Mark "${todo.title}" as ${todo.completed ? 'incomplete' : 'complete'}`}
        />
        <div className="min-w-0 flex-1">
          <p
            className={cn(
              'text-sm font-medium leading-snug',
              todo.completed && 'text-muted-foreground line-through'
            )}
          >
            {todo.title}
          </p>
          {todo.description && (
            <p className="mt-1 text-xs text-muted-foreground">{todo.description}</p>
          )}
          {todo.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {todo.tags.map((tag) => (
                <Badge
                  key={tag.id}
                  variant="secondary"
                  className="px-1.5 py-0 text-xs"
                  style={{ backgroundColor: `${tag.color}20`, color: tag.color }}
                >
                  {tag.name}
                </Badge>
              ))}
            </div>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setEditOpen(true)}
            aria-label="Edit task"
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-destructive hover:text-destructive"
            onClick={handleDelete}
            aria-label="Delete task"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </Card>

      <EditTodoDialog
        todo={todo}
        tags={tags}
        open={editOpen}
        onOpenChange={setEditOpen}
      />
    </>
  );
}

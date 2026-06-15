'use client';

import { TodoItem } from './todo-item';
import type { Tag, TodoWithTags } from '@/db/schema';
import { CheckSquare } from 'lucide-react';

interface TodoListProps {
  todos: TodoWithTags[];
  tags: Tag[];
}

export function TodoList({ todos, tags }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <CheckSquare className="mb-4 h-12 w-12 text-muted-foreground/40" />
        <p className="text-lg font-medium text-muted-foreground">No tasks yet</p>
        <p className="text-sm text-muted-foreground/70">Create your first task to get started</p>
      </div>
    );
  }

  const pending = todos.filter((t) => !t.completed);
  const done = todos.filter((t) => t.completed);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        {pending.map((todo) => (
          <TodoItem key={todo.id} todo={todo} tags={tags} />
        ))}
      </div>

      {done.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-medium text-muted-foreground">
            Completed ({done.length})
          </p>
          <div className="space-y-2 opacity-60">
            {done.map((todo) => (
              <TodoItem key={todo.id} todo={todo} tags={tags} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

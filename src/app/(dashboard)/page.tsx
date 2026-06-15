import { getTodos } from '@/actions/todos';
import { getTags } from '@/actions/tags';
import { TodoList } from '@/components/todos/todo-list';
import { CreateTodoButton } from '@/components/todos/create-todo-button';

export const dynamic = 'force-dynamic';

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag: tagId } = await searchParams;
  const [todos, tags] = await Promise.all([getTodos(), getTags()]);

  const filtered = tagId ? todos.filter((t) => t.tags.some((tg) => tg.id === tagId)) : todos;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          {tagId ? `Tag: ${tags.find((t) => t.id === tagId)?.name ?? 'Unknown'}` : 'All Tasks'}
        </h1>
        <CreateTodoButton tags={tags} />
      </div>
      <TodoList todos={filtered} tags={tags} />
    </div>
  );
}

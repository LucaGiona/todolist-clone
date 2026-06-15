import { getTags } from '@/actions/tags';
import { TagList } from '@/components/tags/tag-list';
import { CreateTagButton } from '@/components/tags/create-tag-button';

export const dynamic = 'force-dynamic';

export default async function TagsPage() {
  const tags = await getTags();

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Tags</h1>
        <CreateTagButton />
      </div>
      <TagList tags={tags} />
    </div>
  );
}

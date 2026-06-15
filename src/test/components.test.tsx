import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TodoList } from '@/components/todos/todo-list';
import { TagList } from '@/components/tags/tag-list';
import type { Tag, TodoWithTags } from '@/db/schema';

const mockTags: Tag[] = [
  { id: '1', userId: 'user1', name: 'Work', color: '#6366f1', createdAt: new Date() },
  { id: '2', userId: 'user1', name: 'Personal', color: '#ec4899', createdAt: new Date() },
];

const mockTodos: TodoWithTags[] = [
  {
    id: '1',
    userId: 'user1',
    title: 'Buy groceries',
    description: null,
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: [mockTags[0]],
  },
  {
    id: '2',
    userId: 'user1',
    title: 'Write tests',
    description: 'Make sure to test all components',
    completed: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: [],
  },
];

describe('TodoList', () => {
  it('renders empty state when no todos', () => {
    render(<TodoList todos={[]} tags={mockTags} />);
    expect(screen.getByText('No tasks yet')).toBeInTheDocument();
  });

  it('renders todo items', () => {
    render(<TodoList todos={mockTodos} tags={mockTags} />);
    expect(screen.getByText('Buy groceries')).toBeInTheDocument();
    expect(screen.getByText('Write tests')).toBeInTheDocument();
  });

  it('shows completed section when todos are done', () => {
    render(<TodoList todos={mockTodos} tags={mockTags} />);
    expect(screen.getByText(/Completed \(1\)/)).toBeInTheDocument();
  });

  it('renders tag badges on todos', () => {
    render(<TodoList todos={mockTodos} tags={mockTags} />);
    expect(screen.getByText('Work')).toBeInTheDocument();
  });

  it('shows todo description when present', () => {
    render(<TodoList todos={mockTodos} tags={mockTags} />);
    expect(screen.getByText('Make sure to test all components')).toBeInTheDocument();
  });
});

describe('TagList', () => {
  it('renders empty state when no tags', () => {
    render(<TagList tags={[]} />);
    expect(screen.getByText('No tags yet')).toBeInTheDocument();
  });

  it('renders tag items', () => {
    render(<TagList tags={mockTags} />);
    expect(screen.getByText('Work')).toBeInTheDocument();
    expect(screen.getByText('Personal')).toBeInTheDocument();
  });
});

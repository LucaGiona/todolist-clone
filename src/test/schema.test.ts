import { describe, it, expect } from 'vitest';
import { todos, tags, todoTags } from '@/db/schema';

describe('Database Schema', () => {
  describe('todos table', () => {
    it('has the expected columns', () => {
      const cols = Object.keys(todos);
      expect(cols).toContain('id');
      expect(cols).toContain('userId');
      expect(cols).toContain('title');
      expect(cols).toContain('description');
      expect(cols).toContain('completed');
      expect(cols).toContain('createdAt');
      expect(cols).toContain('updatedAt');
    });
  });

  describe('tags table', () => {
    it('has the expected columns', () => {
      const cols = Object.keys(tags);
      expect(cols).toContain('id');
      expect(cols).toContain('userId');
      expect(cols).toContain('name');
      expect(cols).toContain('color');
      expect(cols).toContain('createdAt');
    });
  });

  describe('todo_tags table', () => {
    it('has todoId and tagId columns', () => {
      const cols = Object.keys(todoTags);
      expect(cols).toContain('todoId');
      expect(cols).toContain('tagId');
    });
  });
});

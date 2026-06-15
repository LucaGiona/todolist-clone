'use client';

import { signOut } from '@/actions/auth';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut } from 'lucide-react';

interface HeaderProps {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

function getInitials(name?: string | null, email?: string | null): string {
  if (name) {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
  return (email?.[0] ?? 'U').toUpperCase();
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="flex h-14 items-center justify-end border-b bg-background px-6">
      <DropdownMenu>
        {/* Base UI DropdownMenuTrigger renders its own <button> — don't wrap in Button */}
        <DropdownMenuTrigger className="flex h-9 w-9 items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <Avatar className="h-9 w-9 cursor-pointer">
            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
              {getInitials(user.name, user.email)}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              {user.name && <p className="text-sm font-medium leading-none">{user.name}</p>}
              {user.email && (
                <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
              )}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive focus:text-destructive">
            <form action={signOut} className="w-full">
              <button type="submit" className="flex w-full cursor-pointer items-center gap-2">
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

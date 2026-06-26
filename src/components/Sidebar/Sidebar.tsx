'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { cn } from '../../lib/utils'
import {
  Sidebar as SidebarPrimitive,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from '../ui/sidebar'
import { TooltipProvider } from '../ui/tooltip'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NavItem {
  label: string
  href: string
  icon: React.ElementType
}

export interface SidebarUser {
  name: string
  email: string
  avatarInitials: string
}

export interface SidebarProps {
  logo: React.ReactNode
  navItems: NavItem[]
  user: SidebarUser
  onLogout: () => void
  children?: React.ReactNode
  defaultOpen?: boolean
}

// ─── Header ───────────────────────────────────────────────────────────────────

function HeaderContent({ logo }: { logo: React.ReactNode }) {
  const { state } = useSidebar()
  const expanded = state === 'expanded'
  return (
    <div className={cn(
      'flex items-center',
      expanded ? 'flex-row justify-between gap-2 px-1' : 'flex-col gap-2 items-center',
    )}>
      <div className="flex items-center justify-center">{logo}</div>
      <SidebarTrigger className="text-white/70 hover:bg-white/10 hover:text-white" />
    </div>
  )
}

// ─── Nav ──────────────────────────────────────────────────────────────────────

function NavList({ navItems }: { navItems: NavItem[] }) {
  const pathname = usePathname()
  return (
    <SidebarMenu>
      {navItems.map((item) => {
        const Icon = item.icon
        const active = item.href === '/'
          ? pathname === '/'
          : pathname.startsWith(item.href)
        return (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton asChild isActive={active} tooltip={item.label} size="sm">
              <Link href={item.href}>
                <Icon />
                <span>{item.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )
      })}
    </SidebarMenu>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function UserFooter({ user, onLogout }: { user: SidebarUser; onLogout: () => void }) {
  const { state } = useSidebar()
  const expanded = state === 'expanded'

  return (
    <>
      <SidebarSeparator />
      <div className={cn(
        'flex items-center py-1.5',
        expanded ? 'gap-2.5 px-2' : 'justify-center',
      )}>
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-semibold text-white ring-2 ring-white/30">
          {user.avatarInitials}
        </span>
        {expanded && (
          <div className="min-w-0 flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium text-white leading-tight">{user.name}</p>
            <p className="truncate text-xs text-white/70 leading-tight">{user.email}</p>
          </div>
        )}
      </div>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton onClick={onLogout} tooltip="Cerrar sesión" size="sm">
            <LogOut />
            <span>Cerrar sesión</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  )
}

// ─── Inner sidebar (AppSidebar) ───────────────────────────────────────────────

function InnerSidebar({ logo, navItems, user, onLogout }: Omit<SidebarProps, 'children' | 'defaultOpen'>) {
  return (
    <SidebarPrimitive collapsible="icon">
      <SidebarHeader className="p-1">
        <HeaderContent logo={logo} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="p-1">
          <SidebarGroupContent>
            <NavList navItems={navItems} />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <UserFooter user={user} onLogout={onLogout} />
      </SidebarFooter>
    </SidebarPrimitive>
  )
}

// ─── Root (batteries-included wrapper) ────────────────────────────────────────

export default function Sidebar({
  logo,
  navItems,
  user,
  onLogout,
  children,
  defaultOpen = false,
}: SidebarProps) {
  return (
    <TooltipProvider>
      <SidebarProvider
        defaultOpen={defaultOpen}
        style={{ '--sidebar-width-icon': '3rem' } as React.CSSProperties}
      >
        <InnerSidebar logo={logo} navItems={navItems} user={user} onLogout={onLogout} />
        <SidebarInset>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}

// ── Wrapper components (batteries-included) ───────────────────────────────────
export { ImageSlider } from './components/ImageSlider'
export type { ImageSliderProps, ImageSliderImage } from './components/ImageSlider'


export { default as Sidebar } from './components/Sidebar'
export type { SidebarProps, NavItem, SidebarUser } from './components/Sidebar'

export { default as Modal } from './components/Modal'
export type { ModalProps } from './components/Modal'
export { useModal } from './hooks/useModal'

export { default as LoginPage } from './components/LoginPage'
export type { LoginPageProps } from './components/LoginPage'

export { LoginCard } from './components/LoginCard'
export type { LoginCardProps } from './components/LoginCard'

export { Combobox } from './components/Combobox'
export type { ComboboxProps, ComboboxOption } from './components/Combobox'

export { Toaster } from './components/ui/sonner'
export { toast } from 'sonner'

// ── shadcn/ui primitives ──────────────────────────────────────────────────────
export { Alert, AlertTitle, AlertDescription, AlertAction } from './components/ui/alert'
export { Badge, badgeVariants } from './components/ui/badge'
export { Button, buttonVariants } from './components/ui/button'
export {
  Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent,
} from './components/ui/card'
export {
  Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger,
} from './components/ui/dialog'
export {
  DropdownMenu, DropdownMenuPortal, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuGroup, DropdownMenuLabel, DropdownMenuItem, DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator,
  DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent,
} from './components/ui/dropdown-menu'
export { Input } from './components/ui/input'
export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor } from './components/ui/popover'
export {
  Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput,
  CommandItem, CommandList, CommandSeparator, CommandShortcut,
} from './components/ui/command'
export { Separator } from './components/ui/separator'
export {
  Sheet, SheetTrigger, SheetClose, SheetContent, SheetHeader,
  SheetFooter, SheetTitle, SheetDescription,
} from './components/ui/sheet'
export {
  Sidebar as SidebarPrimitive,
  SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction,
  SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInput, SidebarInset,
  SidebarMenu, SidebarMenuAction, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem,
  SidebarMenuSkeleton, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem,
  SidebarProvider, SidebarRail, SidebarSeparator, SidebarTrigger, useSidebar,
} from './components/ui/sidebar'
export { Skeleton } from './components/ui/skeleton'
export {
  Table, TableHeader, TableBody, TableFooter as TableFooterRow, TableHead,
  TableRow, TableCell, TableCaption,
} from './components/ui/table'
export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './components/ui/tooltip'

// ── Utils ─────────────────────────────────────────────────────────────────────
export { cn } from './lib/utils'

// ── Asset paths ───────────────────────────────────────────────────────────────
export const CCE_LOGO       = '/countryclub/cce-logo.png'
export const CCE_LOGO_VERDE = '/countryclub/cce-logo-verde.png'

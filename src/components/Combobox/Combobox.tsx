'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '../ui/command'

export interface ComboboxOption {
  value: string
  label: string
}

export interface ComboboxProps {
  options: ComboboxOption[]
  value?: string | null
  onChange: (value: string | null) => void
  placeholder?: string
  searchPlaceholder?: string
  /** When provided, renders a "clear" entry at the top separated from the list */
  emptyLabel?: string
  emptyMessage?: string
  disabled?: boolean
  className?: string
}

export function Combobox({
  options,
  value,
  onChange,
  placeholder = 'Seleccionar...',
  searchPlaceholder = 'Buscar...',
  emptyLabel,
  emptyMessage = 'Sin resultados.',
  disabled,
  className,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)

  const selected = value ? options.find(o => o.value === value) : null

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn('w-full justify-between font-normal', className)}
        >
          <span className="truncate">{selected?.label ?? placeholder}</span>
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>

            {/* Clear / empty option */}
            {emptyLabel !== undefined && (
              <>
                <CommandGroup>
                  <CommandItem
                    value="__empty__"
                    keywords={[emptyLabel]}
                    onSelect={() => { onChange(null); setOpen(false) }}
                  >
                    <Check className={cn('size-4', value == null ? 'opacity-100' : 'opacity-0')} />
                    <span className="text-muted-foreground">{emptyLabel}</span>
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
              </>
            )}

            <CommandGroup>
              {options.map(option => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  onSelect={(label: string) => {
                    const found = options.find(o => o.label.toLowerCase() === label.toLowerCase())
                    onChange(found ? (found.value === value ? null : found.value) : null)
                    setOpen(false)
                  }}
                >
                  <Check className={cn('size-4', value === option.value ? 'opacity-100' : 'opacity-0')} />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

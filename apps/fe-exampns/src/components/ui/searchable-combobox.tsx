"use client";

import { useMemo, useState } from "react";

import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface SearchableComboboxOption {
  value: string;
  label: string;
  keywords?: string[];
}

export function SearchableCombobox({
  id,
  name,
  value,
  options,
  onValueChange,
  placeholder = "Pilih opsi",
  searchPlaceholder = "Cari opsi...",
  emptyMessage = "Data tidak ditemukan.",
  disabled = false,
  allowEmpty = false,
  emptyOptionLabel = "Kosongkan pilihan",
  className,
  triggerClassName,
  contentClassName,
}: {
  readonly id?: string;
  readonly name?: string;
  readonly value: string;
  readonly options: SearchableComboboxOption[];
  readonly onValueChange: (value: string) => void;
  readonly placeholder?: string;
  readonly searchPlaceholder?: string;
  readonly emptyMessage?: string;
  readonly disabled?: boolean;
  readonly allowEmpty?: boolean;
  readonly emptyOptionLabel?: string;
  readonly className?: string;
  readonly triggerClassName?: string;
  readonly contentClassName?: string;
}) {
  const [open, setOpen] = useState(false);

  const selectedOption = useMemo(() => options.find((option) => option.value === value), [options, value]);
  const displayLabel = selectedOption?.label ?? (allowEmpty && !value ? emptyOptionLabel : placeholder);

  return (
    <div className={cn("w-full", className)}>
      {name ? <input type="hidden" name={name} value={value} /> : null}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            id={id}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className={cn(
              "w-full justify-between rounded-xl border-slate-200 bg-white px-3 font-normal text-slate-900 hover:bg-white",
              !selectedOption && !(allowEmpty && !value) ? "text-slate-500" : "",
              triggerClassName,
            )}
          >
            <span className="truncate">{displayLabel}</span>
            <ChevronsUpDownIcon className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent align="start" className={cn("w-[var(--radix-popover-trigger-width)] p-0", contentClassName)}>
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup>
                {allowEmpty ? (
                  <CommandItem
                    key="__empty__"
                    value="__empty__"
                    onSelect={() => {
                      onValueChange("");
                      setOpen(false);
                    }}
                  >
                    <CheckIcon className={cn("size-4", !value ? "opacity-100" : "opacity-0")} />
                    <span>{emptyOptionLabel}</span>
                  </CommandItem>
                ) : null}

                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    keywords={[option.label, ...(option.keywords ?? [])]}
                    onSelect={() => {
                      onValueChange(option.value);
                      setOpen(false);
                    }}
                  >
                    <CheckIcon className={cn("size-4", option.value === value ? "opacity-100" : "opacity-0")} />
                    <span>{option.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

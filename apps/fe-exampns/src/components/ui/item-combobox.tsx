"use client";

import { useMemo } from "react";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { cn } from "@/lib/utils";

export interface ItemComboboxOption {
  value: string;
  label: string;
}

export function ItemCombobox({
  id,
  name,
  value,
  options,
  onValueChange,
  placeholder,
  emptyMessage = "Data tidak ditemukan.",
  disabled = false,
  required = false,
  inputClassName,
  contentClassName,
  listClassName,
}: {
  readonly id?: string;
  readonly name?: string;
  readonly value: string;
  readonly options: ItemComboboxOption[];
  readonly onValueChange: (value: string) => void;
  readonly placeholder: string;
  readonly emptyMessage?: string;
  readonly disabled?: boolean;
  readonly required?: boolean;
  readonly inputClassName?: string;
  readonly contentClassName?: string;
  readonly listClassName?: string;
}) {
  const selectedItem = useMemo(() => options.find((option) => option.value === value) ?? null, [options, value]);

  return (
    <Combobox
      id={id}
      name={name}
      items={options}
      value={selectedItem}
      required={required}
      disabled={disabled}
      onValueChange={(nextValue) => onValueChange(nextValue?.value ?? "")}
    >
      <ComboboxInput
        placeholder={placeholder}
        className={cn("w-full rounded-xl border-slate-200 bg-white", inputClassName)}
      />
      <ComboboxContent className={cn("p-0", contentClassName)} sideOffset={8}>
        <ComboboxEmpty className="py-3">{emptyMessage}</ComboboxEmpty>
        <ComboboxList className={cn("max-h-80", listClassName)}>
          {(item: ItemComboboxOption) => (
            <ComboboxItem key={item.value} value={item}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

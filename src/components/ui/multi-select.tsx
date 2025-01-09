"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command"
import { cn } from "@/lib/utils"

interface MultiSelectProps<T> {
    items: T[]
    labelKey: keyof T
    valueKey: keyof T
    selected: Array<T[keyof T]>
    onChange: (newValues: Array<T[keyof T]>) => void
    label?: string
}

export function MultiSelect<T extends Record<string, any>>({
    items,
    labelKey,
    valueKey,
    selected,
    onChange,
    label,
}: MultiSelectProps<T>) {
    const [open, setOpen] = React.useState(false)
    const [query, setQuery] = React.useState("")

    function toggleValue(value: T[keyof T]) {
        if (selected.includes(value)) {
            onChange(selected.filter((v) => v !== value))
        } else {
            onChange([...selected, value])
        }
    }

    const selectedLabels: string[] = []
    items.forEach((item) => {
        if (selected.includes(item[valueKey])) {
            selectedLabels.push(String(item[labelKey]))
        }
    })

    const displayValue = selectedLabels.length
        ? selectedLabels.join(", ")
        : label || "Choisir..."

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {displayValue}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="p-0 w-[var(--popover-width,200px)]">
                <Command>
                    <CommandInput
                        placeholder="Filtrer..."
                        value={query}
                        onValueChange={setQuery}
                    />

                    <CommandList>
                        <CommandEmpty>Aucun résultat.</CommandEmpty>
                        <CommandGroup>
                            {items
                                .filter((item) => {
                                    // Filtrage
                                    const labelVal = String(item[labelKey]).toLowerCase()
                                    return labelVal.includes(query.toLowerCase())
                                })
                                .map((item) => {
                                    const v = item[valueKey]
                                    const isSelected = selected.includes(v)
                                    return (
                                        <CommandItem
                                            key={String(v)}
                                            onSelect={() => toggleValue(v)}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    isSelected ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {String(item[labelKey])}
                                        </CommandItem>
                                    )
                                })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

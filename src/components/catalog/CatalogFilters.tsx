"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

interface CatalogFiltersProps {
  availableCategories: string[];
}

export function CatalogFilters({ availableCategories }: CatalogFiltersProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const currentFilter = searchParams.get("category");

  const handleCategory = (category: string | null) => {
    const params = new URLSearchParams(searchParams);

    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="space-y-4 mb-8">
      {/* Search Bar */}
      <div className="relative max-w-md w-full">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, SKU, or specs..."
          className="pl-9 bg-background"
          defaultValue={searchParams.get("q")?.toString()}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          variant={!currentFilter ? "default" : "outline"}
          size="sm"
          onClick={() => handleCategory(null)}
          className="rounded-full"
        >
          All
        </Button>

        {availableCategories.map((cat) => {
          const isActive = currentFilter === cat;
          return (
            <Button
              key={cat}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategory(cat)}
              className="rounded-full capitalize"
            >
              {cat}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

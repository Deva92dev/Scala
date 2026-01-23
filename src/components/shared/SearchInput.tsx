"use client";

import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

const SearchInput = ({
  placeholder = "Search....",
}: {
  placeholder?: string;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // local state for immediate UI feedback
  const initialSearch = searchParams.get("search")?.toString() || "";
  const [term, setTerm] = useState(initialSearch);

  // debounced for 400ms
  useEffect(() => {
    const handler = setTimeout(() => {
      if (term === initialSearch) return;

      const params = new URLSearchParams(searchParams.toString());
      if (term) {
        params.set("search", term);
      } else {
        params.delete("search");
      }

      // Reset to page 1 on new search
      params.set("page", "1");

      replace(`${pathname}?${params.toString()}`);
    }, 400);

    return () => clearTimeout(handler);
  }, [initialSearch, pathname, replace, searchParams, term]);

  const handleClear = () => {
    setTerm("");
    // We don't need to manually trigger URL update, the Effect above will catch 'term' change
  };

  return (
    <div className="relative w-full">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground " />
      <Input
        type="text"
        placeholder={placeholder}
        className="pl-9 pr-8 bg-background"
        onChange={(e) => setTerm(e.target.value)}
        value={term}
      />

      {term && (
        <button
          onClick={handleClear}
          className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SearchInput;

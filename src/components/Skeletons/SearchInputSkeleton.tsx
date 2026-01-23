export const SearchInputSkeleton = () => {
  return (
    <div className="relative w-full">
      <div className="absolute left-2.5 top-2.5 h-4 w-4 bg-muted-foreground/20 rounded animate-pulse z-10" />
      <div className="h-10 w-full rounded-md bg-muted animate-pulse border border-muted-foreground/10" />
    </div>
  );
};

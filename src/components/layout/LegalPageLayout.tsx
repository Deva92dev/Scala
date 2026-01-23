import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";

interface LegalPageProps {
  title: string;
  updatedAt: string;
  children: React.ReactNode;
}

export function LegalPageLayout({
  title,
  updatedAt,
  children,
}: LegalPageProps) {
  return (
    <div className="min-h-screen bg-background py-16 lg:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="border-b pb-8 mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">
            {title}
          </h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Last Updated: {updatedAt}</span>
          </div>
        </div>

        {/* Content (Prose) */}
        <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-p:leading-relaxed prose-li:marker:text-primary">
          {children}
        </article>
      </div>
    </div>
  );
}

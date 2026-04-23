import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface LegalPageProps {
  title: string;
  updatedAt: string;
  children: React.ReactNode;
}

export default function LegalPage({ title, updatedAt, children }: LegalPageProps) {
  return (
    <article className="bg-bg-primary">
      <div className="max-w-3xl mx-auto px-4 py-16 md:py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Retour à l&apos;accueil
        </Link>

        <header className="mb-10 pb-8 border-b border-gray-200">
          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-text-primary mb-3">
            {title}
          </h1>
          <p className="text-sm text-text-muted">
            Dernière mise à jour : {updatedAt}
          </p>
        </header>

        <div className="text-text-primary leading-relaxed space-y-4 [&_h2]:font-playfair [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:font-playfair [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_a]:text-primary [&_a]:underline hover:[&_a]:opacity-80 [&_strong]:font-semibold [&_em]:italic">
          {children}
        </div>
      </div>
    </article>
  );
}

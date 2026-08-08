import CategoryDetailPage from "./category-client";
import taxonomy from "@/lib/mock-api/data/taxonomy.json";

export function generateStaticParams() {
  return taxonomy.map((c) => ({
    slug: c.slug,
  }));
}

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <CategoryDetailPage params={params} />;
}

import ProviderProfilePage from "./provider-client";
import providers from "@/lib/mock-api/data/providers.json";

export function generateStaticParams() {
  return providers.map((p) => ({
    id: p.id,
  }));
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return <ProviderProfilePage params={params} />;
}

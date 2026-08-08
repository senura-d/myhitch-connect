import { useQuery } from "@tanstack/react-query";
import { getTaxonomy, getMainCategoryBySlug } from "@/lib/mock-api/taxonomy";

export function useTaxonomy() {
  return useQuery({ queryKey: ["taxonomy"], queryFn: getTaxonomy });
}

export function useMainCategory(slug: string) {
  return useQuery({
    queryKey: ["taxonomy", "category", slug],
    queryFn: () => getMainCategoryBySlug(slug),
    enabled: !!slug,
  });
}

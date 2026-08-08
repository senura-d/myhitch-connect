import { store, delay, nextId } from "./store";
import type { MainCategory, ComplianceAttribute, RequiredDocument } from "@/types/taxonomy";

export async function getTaxonomy(): Promise<MainCategory[]> {
  return delay(store.taxonomy);
}

export async function getMainCategoryBySlug(slug: string): Promise<MainCategory | undefined> {
  return delay(store.taxonomy.find((c) => c.slug === slug));
}

export interface ResolvedServiceType {
  mainCategory: MainCategory;
  subcategory: MainCategory["subcategories"][number];
  serviceType: MainCategory["subcategories"][number]["serviceTypes"][number];
}

export function resolveServiceType(serviceTypeId: string): ResolvedServiceType | undefined {
  for (const mainCategory of store.taxonomy) {
    for (const subcategory of mainCategory.subcategories) {
      const serviceType = subcategory.serviceTypes.find((st) => st.id === serviceTypeId);
      if (serviceType) return { mainCategory, subcategory, serviceType };
    }
  }
  return undefined;
}

export function listingCategoryLabel(serviceTypeId: string): string {
  return resolveServiceType(serviceTypeId)?.serviceType.name ?? serviceTypeId;
}

/** Creates a new main category — proves categories can be added without a code change. */
export async function createMainCategory(payload: {
  name: string;
  slug: string;
  icon: string;
  description: string;
  complianceAttributes: ComplianceAttribute[];
  requiredDocuments: RequiredDocument[];
}): Promise<MainCategory> {
  const category: MainCategory = {
    id: nextId("cat"),
    ...payload,
    subcategories: [],
  };
  store.taxonomy.push(category);
  return delay(category, 400);
}

export async function updateMainCategory(
  id: string,
  patch: Partial<Omit<MainCategory, "id" | "subcategories">>
): Promise<MainCategory | undefined> {
  const category = store.taxonomy.find((c) => c.id === id);
  if (!category) return delay(undefined);
  Object.assign(category, patch);
  return delay(category, 300);
}

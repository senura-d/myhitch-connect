export type ComplianceFieldType = "text" | "number" | "date" | "boolean" | "file" | "select";

export interface ComplianceAttribute {
  key: string;
  label: string;
  type: ComplianceFieldType;
  required: boolean;
  options?: string[];
  helpText?: string;
}

export interface RequiredDocument {
  key: string;
  label: string;
  required: boolean;
}

export interface ServiceType {
  id: string;
  name: string;
  slug: string;
  specialisations?: string[];
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  serviceTypes: ServiceType[];
}

export interface MainCategory {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  subcategories: Subcategory[];
  /** Category-specific compliance attributes shown conditionally on the listing form. */
  complianceAttributes: ComplianceAttribute[];
  /** Documents providers must upload during onboarding when selecting this category. */
  requiredDocuments: RequiredDocument[];
}

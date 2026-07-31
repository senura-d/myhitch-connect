import type { ComponentProps, ForwardRefExoticComponent, RefAttributes } from "react";

/** @tabler/icons-react does not export its Icon/IconProps types, so we shape our own. */
export type TablerIconComponent = ForwardRefExoticComponent<
  Partial<Omit<ComponentProps<"svg">, "stroke">> & {
    size?: string | number;
    stroke?: string | number;
    title?: string;
  } & RefAttributes<SVGSVGElement>
>;

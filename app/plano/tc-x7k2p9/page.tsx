import type { Metadata } from "next";
import { PlanTemplate } from "../PlanTemplate";
import { plan } from "./plan";

export const metadata: Metadata = {
  title: "Plano TC-0001 | Toca Certo",
  description: "Plano personalizado de sistema de vinil.",
  robots: { index: false, follow: false },
};

export default function FirstPlanPage() {
  return <PlanTemplate plan={plan} />;
}

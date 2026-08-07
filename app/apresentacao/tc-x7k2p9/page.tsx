import type { Metadata } from "next";
import { PlanStoryTemplate } from "../../plano-2/PlanStoryTemplate";
import { plan } from "../../plano/tc-x7k2p9/plan";

export const metadata: Metadata = {
  title: "Apresentação do seu plano | Toca Certo",
  description: "Apresentação do seu plano personalizado Toca Certo.",
  robots: { index: false, follow: false },
};

export default function PlanPresentationPage() {
  return <PlanStoryTemplate plan={plan} planHref="/plano/tc-x7k2p9" />;
}

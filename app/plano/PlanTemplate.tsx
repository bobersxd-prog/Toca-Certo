import styles from "./PlanTemplate.module.css";
import type { StoreOffer } from "../../data/equipmentCatalog";

export type PlanOption = {
  id: string;
  eyebrow: string;
  title: string;
  price: string;
  priceNote: string;
  verdict: string;
  components: { type: "turntable" | "speakers"; name: string; detail: string; price?: string; offers?: StoreOffer[] }[];
  strengths: string[];
  limits: string[];
  scores: { sound: number; ease: number; value: number; upgrade: number };
  featured?: boolean;
  validation?: boolean;
};

export type PlanData = {
  planId: string;
  clientName: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  subtitle: string;
  profile: { label: string; value: string }[];
  recommendationId: string;
  options: PlanOption[];
  whyItWorks: { title: string; copy: string }[];
  connection: string[];
  shoppingNotes: string[];
  alternatives: { name: string; total: string; assessment: string; offers?: StoreOffer[] }[];
  upgrades: { phase: string; title: string; copy: string }[];
};

function Brand() {
  return <div className={styles.brand}><span className={styles.logo} aria-hidden="true"><i /></span><span><strong>Toca Certo</strong><small>O plano certo para o seu som em vinil</small></span></div>;
}

function Stars({ value }: { value: number }) {
  return <span className={styles.stars} aria-label={`${value} de 5`}>{[1,2,3,4,5].map(n => <i key={n} className={n <= value ? styles.on : ""}>★</i>)}</span>;
}

function ProductVisual({ type }: { type: "turntable" | "speakers" }) {
  return type === "turntable"
    ? <span className={`${styles.productVisual} ${styles.turntable}`} aria-hidden="true"><i /><b /></span>
    : <span className={`${styles.productVisual} ${styles.speakers}`} aria-hidden="true"><i /><i /><b /></span>;
}

function ComponentList({ option }: { option: PlanOption }) {
  return <div className={styles.componentList}>{option.components.map(component => <article key={component.name}>
    <ProductVisual type={component.type} />
    <div className={styles.componentInfo}><small>{component.type === "turntable" ? "Toca-discos" : "Caixas ativas"}</small><strong>{component.name}</strong><span>{component.detail}</span></div>
    {component.price && <b>{component.price}</b>}
    {component.offers && component.offers.length > 0 && <div className={styles.offerLinks}>{component.offers.map(offer => <a key={`${component.name}-${offer.store}`} href={offer.url} target="_blank" rel="noopener noreferrer nofollow sponsored" className={offer.primary ? styles.primaryOffer : ""}><span>{offer.store}</span>{offer.price && <b>{offer.price}</b>}<i>↗</i></a>)}</div>}
  </article>)}</div>;
}

export function PlanTemplate({ plan }: { plan: PlanData }) {
  const recommended = plan.options.find(option => option.id === plan.recommendationId) ?? plan.options[0];
  const scores = [
    ["Qualidade sonora", "sound"],
    ["Facilidade de uso", "ease"],
    ["Custo-benefício", "value"],
    ["Potencial de upgrade", "upgrade"],
  ] as const;

  return <main className={styles.page}>
    <header className={styles.topbar}>
      <Brand />
      <div className={styles.planMeta}><span>Plano #{plan.planId}</span><small>Criado em {plan.createdAt}</small></div>
    </header>

    <div className={styles.shell}>
      <section className={styles.intro}>
        <div><span className={styles.kicker}>Plano personalizado de {plan.clientName}</span><h1>{plan.title}</h1><p>{plan.subtitle}</p></div>
        <aside><small>Última pesquisa de preços</small><strong>{plan.updatedAt}</strong><span>Valores sujeitos a alteração</span></aside>
      </section>

      <nav className={styles.steps} aria-label="Seções do plano">
        <a href="#diagnostico"><b>✓</b><span><strong>1. Briefing</strong><small>Seu perfil e objetivos</small></span></a>
        <a href="#analise"><b>✓</b><span><strong>2. Análise</strong><small>Prioridades e restrições</small></span></a>
        <a className={styles.activeStep} href="#recomendacoes"><b>3</b><span><strong>3. Recomendações</strong><small>Sistemas selecionados</small></span></a>
        <a href="#acao"><b>4</b><span><strong>4. Plano de ação</strong><small>Compra e próximos passos</small></span></a>
      </nav>

      <section className={styles.overview} id="diagnostico">
        <article className={`${styles.card} ${styles.profileCard}`}>
          <header><small>Resumo do diagnóstico</small><h2>O sistema que estamos montando</h2></header>
          <div className={styles.profileList}>{plan.profile.map(item => <div key={item.label}><span>{item.label}</span><strong>{item.value}</strong></div>)}</div>
          <p>O teto informado é tratado como limite, não como meta obrigatória de gasto.</p>
        </article>

        <article className={`${styles.card} ${styles.recommendedCard}`} id="analise">
          <header><div><small>Opção recomendada</small><h2>{recommended.title}</h2></div><span className={styles.recommendedTag}>Mais segura</span></header>
          <ComponentList option={recommended} />
          <div className={styles.investment}><span>Investimento estimado</span><strong>{recommended.price}</strong><small>{recommended.priceNote}</small></div>
          <p>{recommended.verdict}</p>
          <a href={`#${recommended.id}`}>Ver justificativa completa <span>↓</span></a>
        </article>

        <article className={`${styles.card} ${styles.whyCard}`}>
          <header><small>Por que esta é a principal</small><h2>O melhor equilíbrio para este caso</h2></header>
          <div>{plan.whyItWorks.map((item, index) => <section key={item.title}><b>{index + 1}</b><span><strong>{item.title}</strong><p>{item.copy}</p></span></section>)}</div>
        </article>
      </section>

      <section className={`${styles.card} ${styles.comparison}`} id="recomendacoes">
        <header><div><small>Comparativo rápido</small><h2>Três decisões, não três níveis genéricos</h2></div><p>As estrelas ajudam a comparar prioridades; não são notas absolutas dos produtos.</p></header>
        <div className={styles.tableWrap}><table><thead><tr><th>Critério</th>{plan.options.map(option => <th key={option.id} className={option.featured ? styles.featuredCell : ""}><span>{option.eyebrow}</span><strong>{option.price}</strong>{option.featured && <em>Recomendada</em>}</th>)}</tr></thead><tbody>{scores.map(([label,key]) => <tr key={key}><th>{label}</th>{plan.options.map(option => <td key={option.id} className={option.featured ? styles.featuredCell : ""}><Stars value={option.scores[key]} /></td>)}</tr>)}<tr><th>Operação</th>{plan.options.map(option => <td key={option.id} className={option.featured ? styles.featuredCell : ""}>{option.id === "manual" ? "Manual" : "Automática"}</td>)}</tr></tbody></table></div>
      </section>

      <section className={styles.optionSection}>
        <header className={styles.sectionTitle}><span>Recomendações detalhadas</span><h2>O que você ganha — e o que aceita — em cada caminho.</h2></header>
        <div className={styles.optionGrid}>{plan.options.map(option => <article className={`${styles.optionCard} ${option.featured ? styles.featuredOption : ""}`} id={option.id} key={option.id}>
          <header><div><span>{option.eyebrow}</span><h3>{option.title}</h3></div>{option.featured && <b>Recomendada</b>}{option.validation && <b className={styles.validationTag}>Em validação</b>}</header>
          <ComponentList option={option} />
          <div className={styles.optionPrice}><small>Investimento estimado</small><strong>{option.price}</strong><span>{option.priceNote}</span></div>
          <p className={styles.verdict}>{option.verdict}</p>
          <div className={styles.prosCons}><div><small>Pontos fortes</small><ul>{option.strengths.map(item => <li key={item}>{item}</li>)}</ul></div><div><small>Limitações</small><ul>{option.limits.map(item => <li key={item}>{item}</li>)}</ul></div></div>
        </article>)}</div>
      </section>

      <section className={styles.actionGrid} id="acao">
        <article className={`${styles.card} ${styles.connectionCard}`}>
          <header><small>Mapa de conexão</small><h2>Como o sistema será ligado</h2></header>
          <div className={styles.connection}>{plan.connection.map((item,index) => <div key={item}><span>{item}</span>{index < plan.connection.length - 1 && <i>→</i>}</div>)}</div>
          <p>Use a saída do toca-discos em <b>LINE</b>. Nenhuma das três opções principais precisa de receiver ou pré-phono externo.</p>
        </article>
        <article className={`${styles.card} ${styles.checklistCard}`}>
          <header><small>Antes de comprar</small><h2>O preço precisa ser conferido de novo</h2></header>
          <ul>{plan.shoppingNotes.map(item => <li key={item}>{item}</li>)}</ul>
        </article>
      </section>

      <section className={`${styles.card} ${styles.alternatives}`}>
        <header><div><small>Pesquisa ampliada</small><h2>Outras combinações mapeadas</h2></div><p>Servem como plano B para mudança de estoque, preço ou prioridade.</p></header>
        <div>{plan.alternatives.map(item => <article key={item.name}><strong>{item.name}</strong><b>{item.total}</b><span>{item.assessment}</span>{item.offers && <div className={styles.offerLinks}>{item.offers.map(offer => <a key={`${item.name}-${offer.store}`} href={offer.url} target="_blank" rel="noopener noreferrer nofollow sponsored" className={offer.primary ? styles.primaryOffer : ""}><span>Ver no {offer.store}</span>{offer.price && <b>{offer.price}</b>}<i>↗</i></a>)}</div>}</article>)}</div>
      </section>

      <section className={styles.upgrades}>
        <header className={styles.sectionTitle}><span>Caminho de evolução</span><h2>Começar agora sem comprar tudo outra vez depois.</h2></header>
        <div>{plan.upgrades.map(item => <article key={item.phase}><b>{item.phase}</b><span><strong>{item.title}</strong><p>{item.copy}</p></span></article>)}</div>
      </section>

      <section className={styles.disclaimer}>
        <div><strong>Sobre esta primeira versão</strong><p>Este plano usa preços e informações reunidos para o caso piloto. Antes da compra, estoque, vendedor, frete, forma de pagamento e especificações devem ser reconfirmados. Alguns links podem gerar comissão para o Toca Certo, sem alterar o preço pago.</p></div>
        <a href="mailto:vitor_bonatto@hotmail.com?subject=Dúvidas sobre meu plano Toca Certo">Enviar uma dúvida ou pedir revisão <span>→</span></a>
      </section>
    </div>

    <footer className={styles.footer}><Brand /><p>Plano individual · não compartilhar publicamente</p></footer>
  </main>;
}

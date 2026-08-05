import type { Metadata } from "next";
import { PlanTemplate, type PlanData } from "../PlanTemplate";
import { equipmentCatalog } from "../../../data/equipmentCatalog";

export const metadata: Metadata = {
  title: "Plano TC-0001 | Toca Certo",
  description: "Plano personalizado de sistema de vinil.",
  robots: { index: false, follow: false },
};

const plan: PlanData = {
  planId: "TC-0001",
  clientName: "Vitor",
  createdAt: "04/08/2026",
  updatedAt: "04/08/2026",
  title: "Seu primeiro sistema completo abaixo de R$ 2.000",
  subtitle: "Três caminhos prontos para tocar, comparados conforme praticidade, segurança de compra e preferência por operação manual.",
  profile: [
    { label: "Objetivo", value: "Montar o primeiro sistema completo" },
    { label: "Orçamento máximo", value: "R$ 2.000" },
    { label: "Formato desejado", value: "Compacto, novo e pronto para tocar" },
    { label: "Preferência", value: "Operação manual" },
    { label: "Uso adicional", value: "Celular por Bluetooth" },
    { label: "Tensão", value: "220 V / equipamentos bivolt" },
  ],
  recommendationId: "recomendado",
  whyItWorks: [
    { title: "Compatibilidade", copy: "O LP60X possui pré-phono e liga diretamente nas caixas ativas pela saída LINE." },
    { title: "Segurança de compra", copy: "A combinação prioriza marcas com histórico mais conhecido e uma arquitetura simples." },
    { title: "Uso cotidiano", copy: "As R990BT também recebem o som do celular por Bluetooth e ocupam pouco espaço." },
    { title: "Limite transparente", copy: "A principal concessão é a operação automática do toca-discos, diferente da preferência informada." },
  ],
  connection: ["AT-LP60X em LINE", "Cabo RCA", "Edifier R990BT ativa", "Caixa secundária"],
  shoppingNotes: [
    "Confirmar o menor preço confiável e o vendedor antes de fechar a compra.",
    "Registrar preço normal, promocional e forma de pagamento exigida.",
    "Calcular o frete para o CEP antes de comparar os totais.",
    "Verificar disponibilidade, voltagem e itens incluídos na caixa.",
    "Tratar os valores como fotografia do dia e horário da pesquisa.",
  ],
  recordDiscovery: {
    profile: "Como o gosto musical ainda não foi informado neste caso piloto, estas são portas de entrada gerais. Nos próximos planos, os títulos e as lojas serão selecionados conforme os gêneros, artistas e discos desejados no questionário.",
    options: [
      {
        eyebrow: "Garimpo e catálogo",
        title: "Vivinil",
        copy: "Confira discos disponíveis e oportunidades selecionadas para começar ou ampliar sua coleção.",
        url: "https://vivinil.com.br",
        cta: "Ver discos na Vivinil",
      },
      {
        eyebrow: "Clube de assinatura",
        title: "Noize Record Club",
        copy: "Uma alternativa interessante para descobrir edições especiais e receber novos discos ao longo do ano. Antes de assinar, confira se o catálogo recente combina com o seu gosto.",
        url: "https://noize-record-club.myshopify.com?invite_code=tkxuoNbmSjV9&referrer_name=4794",
        cta: "Conhecer a assinatura da Noize",
        affiliate: true,
      },
    ],
  },
  options: [
    {
      id: "economico",
      eyebrow: "Mais econômica",
      title: "AT-LP60X + Edifier R19BT",
      price: "R$ 1.498",
      priceNote: "LP60X por R$ 1.199 + caixas por R$ 299; frete não incluído.",
      verdict: "Funciona corretamente e ocupa pouco espaço, mas é uma solução de entrada com limitações importantes de volume, graves e evolução.",
      components: [
        { type: "turntable", name: "Audio-Technica AT-LP60X", detail: "Automático · pré-phono integrado", price: "a partir de R$ 1.199", offers: equipmentCatalog.atLp60x.offers },
        { type: "speakers", name: "Edifier R19BT", detail: "Ativas · Bluetooth · 4 W RMS", price: "R$ 299" },
      ],
      strengths: ["Menor investimento", "Sistema compacto", "Bluetooth para o celular", "Não exige receiver"],
      limits: ["Operação automática", "Pouca potência", "Graves limitados", "Baixo potencial de evolução"],
      scores: { sound: 2, ease: 5, value: 4, upgrade: 1 },
    },
    {
      id: "recomendado",
      eyebrow: "Mais segura",
      title: "AT-LP60X + Edifier R990BT",
      price: "R$ 1.828,44",
      priceNote: "Menores ofertas registradas: LP60X por R$ 1.199 + caixas por R$ 629,44; frete não incluído.",
      verdict: "É a combinação mais segura dentro do limite: compacta, completa e superior nas caixas. Sacrifica a operação manual pedida no questionário.",
      featured: true,
      components: [
        { type: "turntable", name: "Audio-Technica AT-LP60X", detail: "Automático · pré-phono integrado", price: "a partir de R$ 1.199", offers: equipmentCatalog.atLp60x.offers },
        { type: "speakers", name: "Edifier R990BT", detail: "Ativas · Bluetooth 5.4 · 24 W RMS", price: "a partir de R$ 629,44", offers: equipmentCatalog.edifierR990bt.offers },
      ],
      strengths: ["Melhor equilíbrio geral", "Caixas mais capazes", "Bluetooth 5.4", "Conexão simples e bivolt"],
      limits: ["Operação automática", "Sem ajuste de força", "Cápsula com pouca flexibilidade", "Frete ainda precisa ser calculado"],
      scores: { sound: 4, ease: 5, value: 5, upgrade: 2 },
    },
    {
      id: "manual",
      eyebrow: "Mais alinhada ao uso",
      title: "Audiotech AUT01 + Edifier R990BT",
      price: "R$ 1.699",
      priceNote: "Preço informado para o kit; 5% no Pix e disponibilidade precisam ser reconfirmados.",
      verdict: "É o conjunto que mais atende ao desejo de operação manual, mas permanece como candidato em validação por ser recente e ter pouco histórico independente.",
      validation: true,
      components: [
        { type: "turntable", name: "Audiotech AUT01", detail: "Manual · contrapeso · cápsula AT3600L", offers: equipmentCatalog.audiotechAut01.offers },
        { type: "speakers", name: "Edifier R990BT", detail: "Ativas · Bluetooth 5.4 · 24 W RMS", price: "a partir de R$ 629,44", offers: equipmentCatalog.edifierR990bt.offers },
      ],
      strengths: ["Operação manual", "Força ajustável", "Kit completo", "Abaixo do orçamento"],
      limits: ["Produto recente", "Sem antiskating informado", "Poucas medições independentes", "Fora de estoque na consulta"],
      scores: { sound: 4, ease: 3, value: 5, upgrade: 4 },
    },
  ],
  alternatives: [
    { name: "AT-LP60X + Edifier R980T", total: "R$ 1.798", assessment: "O verdadeiro mínimo recomendável sem Bluetooth nas caixas." },
    { name: "AT-LP60X + Edifier R1000T4", total: "R$ 1.998", assessment: "Boa combinação, mas não é a alternativa mais barata nem a mais completa." },
    { name: "Kit Três Selos Rocinante", total: "R$ 1.728", assessment: "Excelente para assinante anual; para o público, o preço informado é R$ 2.880." },
    { name: "AZ Audio AZ-LP60XBT", total: "≈ R$ 1.670", assessment: "Compacto e completo, mas não atende operação manual e apresenta sinais técnicos que exigem cautela.", offers: equipmentCatalog.azAudioLp60xbt.offers },
  ],
  upgrades: [
    { phase: "Agora", title: "Montar o sistema funcional", copy: "Escolher uma das três arquiteturas, confirmar preço e estoque e comprar os componentes necessários para tocar." },
    { phase: "Depois", title: "Melhorar o ponto de maior impacto", copy: "Nas opções com LP60X, a evolução mais natural tende a começar pelo toca-discos quando surgir orçamento e vontade de operação manual." },
    { phase: "Futuro", title: "Migrar sem perder tudo", copy: "As caixas ativas podem continuar úteis em outro ambiente, no computador ou como sistema secundário quando o conjunto principal evoluir." },
  ],
};

export default function FirstPlanPage() {
  return <PlanTemplate plan={plan} />;
}

export type StoreOffer = {
  store: "Amazon" | "Mercado Livre" | "Shopee" | "Loja oficial";
  url: string;
  price?: string;
  checkedAt: string;
  note?: string;
  primary?: boolean;
};

export type EquipmentRecord = {
  id: string;
  category: "Toca-discos" | "Caixas ativas" | "Kit completo";
  brand: string;
  model: string;
  offers: StoreOffer[];
  notes?: string[];
};

export const equipmentCatalog: Record<string, EquipmentRecord> = {
  atLp60x: {
    id: "audio-technica-at-lp60x-bk",
    category: "Toca-discos",
    brand: "Audio-Technica",
    model: "AT-LP60X-BK",
    offers: [
      { store: "Amazon", url: "https://link.amazon/B09I5G1i5", price: "R$ 1.199", checkedAt: "04/08/2026", primary: true },
      { store: "Mercado Livre", url: "https://meli.la/129bATd", price: "R$ 1.246", checkedAt: "04/08/2026", note: "Opção secundária" },
    ],
  },
  edifierR990bt: {
    id: "edifier-r990bt-black",
    category: "Caixas ativas",
    brand: "Edifier",
    model: "R990BT Black",
    offers: [
      { store: "Mercado Livre", url: "https://meli.la/1B9iWRk", price: "R$ 629,44", checkedAt: "04/08/2026", primary: true },
      { store: "Amazon", url: "https://link.amazon/B095mKpWu", price: "R$ 647", checkedAt: "04/08/2026" },
    ],
  },
  audiotechAut01: {
    id: "audiotech-aut01",
    category: "Toca-discos",
    brand: "Audiotech",
    model: "AUT01",
    offers: [
      { store: "Shopee", url: "https://s.shopee.com.br/7psB4XTj0P", checkedAt: "04/08/2026", primary: true },
      { store: "Mercado Livre", url: "https://meli.la/1G2mitN", checkedAt: "04/08/2026" },
    ],
    notes: ["Candidato em validação técnica", "Confirmar preço, estoque e vendedor antes da compra"],
  },
  azAudioLp60xbt: {
    id: "az-audio-az-lp60xbt-kit",
    category: "Kit completo",
    brand: "AZ Audio",
    model: "AZ-LP60XBT com caixas estéreo",
    offers: [
      { store: "Mercado Livre", url: "https://meli.la/23C9yih", price: "≈ R$ 1.670", checkedAt: "04/08/2026", primary: true },
    ],
    notes: ["Não confundir com o Audio-Technica AT-LP60XBT", "Opção compacta com toca-discos e caixas"],
  },
};

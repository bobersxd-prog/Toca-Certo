"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";

type Answers = Record<string, string | string[]>;
const FORM_ENDPOINT = "https://formsubmit.co/ajax/vitor_bonatto@hotmail.com";
const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

const initial: Answers = {
  turntable: "", journey: "", turntableModel: "", speakers: "", speakerType: "",
  speakerModel: "", amplifier: "", amplifierModel: "", budget: "", budgetLimit: "", included: "",
  budgetPlan: "", essentials: [], operation: "", adjustments: "", used: "",
  room: "", space: "", volume: "", voltage: "", name: "", email: "", contact: "",
  notes: "", links: "", records: "", musicTaste: "", recordWishlist: "", garimpo: "",
};

const steps = ["Objetivo", "Equipamentos", "Orçamento", "Preferências", "Ambiente", "Finalização"];

const labels: Record<string, string> = {
  turntable: "Situação do toca-discos", journey: "Objetivo", turntableModel: "Toca-discos atual",
  speakers: "Caixas existentes", speakerType: "Tipo das caixas", speakerModel: "Modelo das caixas",
  amplifier: "Amplificador ou receiver", amplifierModel: "Modelo da amplificação", budget: "Faixa de orçamento", budgetLimit: "Limite máximo específico",
  included: "Escopo do orçamento", budgetPlan: "Se o orçamento não for suficiente",
  essentials: "Recursos indispensáveis", operation: "Operação", adjustments: "Ajustes do braço",
  used: "Equipamentos usados", room: "Ambiente", space: "Espaço", volume: "Volume habitual",
  voltage: "Tensão", name: "Nome no relatório", email: "E-mail da compra", contact: "Contato", notes: "Observações",
  links: "Links e modelos considerados", records: "Sugestões de discos", musicTaste: "Gêneros e artistas favoritos",
  recordWishlist: "Discos desejados", garimpo: "Garimpo Vivinil",
};

type Option = { value: string; label: string; detail?: string };

function Radio({ name, value, options, columns = 1, change }: { name: string; value: string; options: Option[]; columns?: number; change: (v: string) => void }) {
  return <div className={`choices cols${columns}`} role="radiogroup">{options.map(o =>
    <label key={o.value} className={`choice ${value === o.value ? "selected" : ""}`}>
      <input type="radio" name={name} checked={value === o.value} onChange={() => change(o.value)} />
      <i aria-hidden="true" /><span><strong>{o.label}</strong>{o.detail && <small>{o.detail}</small>}</span>
    </label>
  )}</div>;
}

function Checks({ values, options, change }: { values: string[]; options: Option[]; change: (v: string[]) => void }) {
  const toggle = (v: string) => change(values.includes(v) ? values.filter(x => x !== v) : [...values, v]);
  return <div className="checks">{options.map(o =>
    <label key={o.value} className={`check ${values.includes(o.value) ? "selected" : ""}`}>
      <input type="checkbox" checked={values.includes(o.value)} onChange={() => toggle(o.value)} />
      <i aria-hidden="true">✓</i><span>{o.label}</span>
    </label>
  )}</div>;
}

function Question({ n, title, help, optional, children }: { n: string; title: string; help?: string; optional?: boolean; children: React.ReactNode }) {
  return <section className="question"><div className="qhead"><b>{n}</b><div><h2>{title}</h2>{optional && <em>Opcional</em>}{help && <p>{help}</p>}</div></div>{children}</section>;
}

const opts = (...items: (string | [string, string])[]): Option[] => items.map(item => Array.isArray(item) ? { value: item[0], label: item[0], detail: item[1] } : { value: item, label: item });

export function Questionnaire() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(initial);
  const [files, setFiles] = useState<File[]>([]);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("setup-vinil-form");
    if (!raw) return;
    try {
      const saved = JSON.parse(raw);
      const savedAnswers = { ...saved.answers };
      if (Array.isArray(savedAnswers.included)) savedAnswers.included = "";
      setAnswers({ ...initial, ...savedAnswers });
      setStep(saved.step || 0);
      setStarted(Boolean(saved.started));
    } catch { localStorage.removeItem("setup-vinil-form"); }
  }, []);

  useEffect(() => { if (started && !done) localStorage.setItem("setup-vinil-form", JSON.stringify({ answers, step, started })); }, [answers, step, started, done]);

  const get = (key: string) => answers[key] as string;
  const list = (key: string) => answers[key] as string[];
  const set = (key: string, value: string | string[]) => { setAnswers(a => ({ ...a, [key]: value })); setError(""); };

  const summary = useMemo(() => {
    const lines = Object.entries(answers).filter(([,v]) => Array.isArray(v) ? v.length : v.trim()).map(([k,v]) => `${labels[k]}: ${Array.isArray(v) ? v.join(", ") : v}`);
    if (files.length) lines.push(`Fotos selecionadas: ${files.map(file => file.name).join(", ")}`);
    return `TOCA CERTO — QUESTIONÁRIO DE TESTE\n\n${lines.join("\n")}`;
  }, [answers, files]);

  function valid() {
    const rules = [
      get("turntable") && get("journey"),
      get("speakers") && (get("speakers") === "Não tenho caixas" || get("speakerType")) && get("amplifier"),
      get("budget") && get("included") && get("budgetPlan"),
      get("operation") && get("adjustments") && get("used"),
      get("room") && get("space") && get("volume") && get("voltage"),
      get("name").trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(get("email").trim()),
    ];
    if (!rules[step]) setError("Responda às perguntas desta etapa antes de continuar.");
    return Boolean(rules[step]);
  }

  async function next() {
    if (!valid()) return;
    if (step === steps.length - 1) {
      setSubmitting(true);
      setError("");
      try {
        const formData = new FormData();
        Object.entries(answers).forEach(([key, value]) => {
          const formatted = Array.isArray(value) ? value.join(", ") : value.trim();
          if (formatted) formData.append(labels[key] ?? key, formatted);
        });
        formData.append("email", get("email").trim());
        formData.append("_replyto", get("email").trim());
        formData.append("_subject", `Novo diagnóstico Toca Certo — ${get("name").trim()}`);
        formData.append("_template", "table");
        formData.append("Resumo completo", summary);
        files.forEach(file => formData.append("attachment", file, file.name));

        const response = await fetch(FORM_ENDPOINT, { method: "POST", headers: { Accept: "application/json" }, body: formData });
        const result = await response.json().catch(() => null);
        if (!response.ok || result?.success === false || result?.success === "false") throw new Error("Falha no envio");

        setDone(true);
        localStorage.removeItem("setup-vinil-form");
      } catch {
        setError("Não conseguimos enviar agora. Suas respostas continuam salvas neste dispositivo. Tente novamente em alguns instantes.");
      } finally {
        setSubmitting(false);
      }
    } else setStep(s => s + 1);
    scrollTo({ top: 0, behavior: "smooth" });
  }
  function back() { setError(""); setStep(s => Math.max(0, s - 1)); scrollTo({ top: 0, behavior: "smooth" }); }
  function chooseFiles(e: ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files || []);
    if (selected.reduce((total, file) => total + file.size, 0) > MAX_UPLOAD_BYTES) {
      setFiles([]);
      setError("As fotos ultrapassam 10 MB no total. Escolha menos arquivos ou imagens menores.");
      e.target.value = "";
      return;
    }
    setFiles(selected);
    setError("");
  }
  if (!started) return <main className="landing">
    <header className="brand"><Logo /><span>Toca Certo</span><mark>Pós-compra · teste</mark></header>
    <section className="hero">
      <div className="eyebrow">Seu sistema começa com as perguntas certas</div>
      <h1>Vamos descobrir o setup que faz sentido para você.</h1>
      <p>Conte o que você já tem, quanto quer investir e como pretende ouvir seus discos. A partir disso, montaremos uma recomendação completa e compatível.</p>
      <div className="facts"><span><b>6</b> etapas curtas</span><span><b>≈ 8</b> minutos</span><span><b>1</b> relatório personalizado</span></div>
      <button className="primary" onClick={() => setStarted(true)}>Começar meu diagnóstico <b>→</b></button>
      <small className="privacy">O rascunho fica neste dispositivo. Ao finalizar, as respostas serão enviadas para análise.</small>
    </section><Record />
  </main>;

  if (done) return <main className="page successPage"><Top beta="Diagnóstico enviado" /><section className="success successV2">
    <div className="successHero">
      <div className="successIcon">✓</div>
      <div className="eyebrow">Diagnóstico recebido</div>
      <h1>Obrigado, {get("name")}.<br/><em>Agora é com a gente.</em></h1>
      <p>Seu questionário e os anexos foram enviados com sucesso. Vamos analisar cada detalhe antes de montar uma recomendação para a sua realidade.</p>
    </div>
    <div className="successSteps">
      <article><b>01</b><span>Recebido agora</span><p>Suas respostas chegaram e já estão prontas para análise.</p></article>
      <article><b>02</b><span>Análise do sistema</span><p>Vamos conferir compatibilidade, preços e as melhores alternativas.</p></article>
      <article><b>03</b><span>Entrega do projeto</span><p>Você receberá o relatório personalizado em até 5 dias úteis.</p></article>
    </div>
    <div className="successDelivery">
      <div><small>Onde você receberá</small><strong>{get("email")}</strong></div>
      <p>Fique de olho também na caixa de spam. Se precisarmos confirmar alguma informação, entraremos em contato antes de finalizar o projeto.</p>
    </div>
    <a className="successHome" href="/">← Voltar para o Toca Certo</a>
  </section></main>;

  return <main className="page"><Top />
    <div className="mobileProgress"><span>Etapa {step + 1} de 6</span><b>{steps[step]}</b><i><em style={{width: `${((step+1)/6)*100}%`}} /></i></div>
    <div className="layout"><aside>{steps.map((s,i) => <div key={s} className={`${i===step?"active":""} ${i<step?"past":""}`}><b>{i<step?"✓":i+1}</b><span>{s}</span></div>)}</aside>
    <form onSubmit={e => e.preventDefault()}>
      {step === 0 && <><Intro n="01" title="Onde você está agora?" text="Não precisa conhecer termos técnicos. Escolha a opção mais próxima da sua realidade." />
        <Question n="1" title="Você já tem toca-discos?"><Radio name="turntable" value={get("turntable")} change={v=>set("turntable",v)} columns={3} options={opts(["Não tenho","Vou comprar o primeiro"],["Tenho e funciona","Quero avaliar ou evoluir"],["Tenho, mas apresenta problemas","Quero trocar ou resolver"])} /></Question>
        {get("turntable") && get("turntable") !== "Não tenho" && <Panel><Field label="Qual é a marca e o modelo?" value={get("turntableModel")} change={v=>set("turntableModel",v)} placeholder="Ex.: CCE antigo, modelo não identificado" /></Panel>}
        <Question n="2" title="O que você quer fazer?"><Radio name="journey" value={get("journey")} change={v=>set("journey",v)} options={opts(["Montar meu primeiro sistema completo","Toca-discos, caixas e o que for necessário"],["Melhorar meu sistema atual","Descobrir o componente que limita o conjunto"],["Resolver uma decisão de compra","Comparar opções antes de gastar"])} /></Question>
      </>}

      {step === 1 && <><Intro n="02" title="O que você já tem?" text="Reaproveitar o equipamento certo pode liberar uma parte importante do orçamento." />
        <Question n="3" title="Você já tem caixas de som?"><Radio name="speakers" value={get("speakers")} change={v=>set("speakers",v)} columns={3} options={opts(["Não tenho caixas","Preciso incluir no projeto"],["Tenho e quero reaproveitar","Quero economizar"],["Tenho, mas aceito trocar","Se não forem adequadas"])} /></Question>
        {get("speakers") && get("speakers") !== "Não tenho caixas" && <Panel><Question n="3.1" title="Elas ligam diretamente na tomada?" help="Isso ajuda a descobrir se são ativas ou passivas."><Radio name="speakerType" value={get("speakerType")} change={v=>set("speakerType",v)} columns={3} options={opts(["Ativas — ligam na tomada","Sim"],["Passivas — não ligam na tomada","Não"],["Não sei","Vou enviar fotos"])} /></Question><Field label="Marca e modelo das caixas" value={get("speakerModel")} change={v=>set("speakerModel",v)} placeholder="Escreva o que aparece na etiqueta" /></Panel>}
        <Question n="4" title="Existe amplificador, receiver ou outro aparelho ligado às caixas?"><Radio name="amplifier" value={get("amplifier")} change={v=>set("amplifier",v)} columns={3} options={opts("Não","Sim","Não sei identificar")} /></Question>
        {get("amplifier") && get("amplifier") !== "Não" && <Panel><Field label="Qual aparelho?" value={get("amplifierModel")} change={v=>set("amplifierModel",v)} placeholder="Marca e modelo, se souber" /></Panel>}
        <Question n="5" title="Envie fotos dos equipamentos" help="Frente, etiqueta e conexões traseiras. Limite total de 10 MB." optional><label className="upload"><input type="file" accept="image/*" multiple onChange={chooseFiles}/><b>＋</b><strong>{files.length ? `${files.length} arquivo(s) selecionado(s)` : "Escolher fotos"}</strong><small>JPG, PNG ou HEIC</small></label>{files.length>0&&<div className="fileList">{files.map((file,index)=><span key={`${file.name}-${index}`}>{file.name}</span>)}</div>}</Question>
      </>}

      {step === 2 && <><Intro n="03" title="Quanto você pretende investir?" text="A faixa ajuda a identificar quais arquiteturas de sistema são viáveis para a sua realidade." />
        {get("journey") === "Montar meu primeiro sistema completo" && get("speakers") === "Não tenho caixas" && get("amplifier") === "Não" && <div className="budgetHint"><b>Um cuidado para o seu caso</b><p>Considere informar o orçamento total para o sistema funcionar, incluindo toca-discos, caixas, amplificação, cabos e frete.</p></div>}
        <Question n="6" title="Quanto você pretende investir inicialmente no sistema completo?" help="Considere toca-discos, caixas, amplificação, cabos e acessórios necessários."><Radio name="budget" value={get("budget")} change={v=>set("budget",v)} columns={2} options={opts("Até R$ 1.500","De R$ 1.500 a R$ 2.500","De R$ 2.500 a R$ 4.000","De R$ 4.000 a R$ 6.000","Acima de R$ 6.000","Ainda não sei quanto preciso investir")} /></Question>
        <Question n="6.1" title="Tem um limite mais específico?" help="Digite o valor máximo aproximado. Exemplo: R$ 2.800." optional><Field label="Limite máximo aproximado" value={get("budgetLimit")} change={v=>set("budgetLimit",v)} placeholder="Ex.: R$ 2.800" /></Question>
        <Question n="7" title="Esse orçamento deve cobrir o quê?"><Radio name="included" value={get("included")} change={v=>set("included",v)} columns={2} options={opts(["Sistema completo pronto para tocar","Incluindo todos os componentes necessários"],["Somente o toca-discos","O restante do sistema já está resolvido"],["Toca-discos e caixas","O limite deve cobrir esses dois itens"],["Apenas um upgrade específico","Uma melhoria no sistema que já possuo"])} /></Question>
        <Question n="8" title="E se não for possível montar com segurança dentro desse valor?"><Radio name="budgetPlan" value={get("budgetPlan")} change={v=>set("budgetPlan",v)} options={opts(["Não ultrapassar o limite","Quero a melhor solução possível dentro dele"],["Comprar em etapas","Posso completar o sistema depois"],["Mostrar opção um pouco acima","Se a diferença realmente valer a pena"])} /></Question>
      </>}

      {step === 3 && <><Intro n="04" title="Como você quer usar o sistema?" text="Aqui separamos o indispensável daquilo que só aumentaria o preço." />
        <Question n="9" title="Quais recursos são indispensáveis?" help="Pode não marcar nenhum." optional><Checks values={list("essentials")} change={v=>set("essentials",v)} options={opts("Ouvir o celular por Bluetooth","Enviar o vinil por Bluetooth","Usar fones com cabo","Usar também com a televisão","Ter controle remoto","Melhorar componentes no futuro")} /></Question>
        <Question n="10" title="Você prefere operação manual ou automática?"><Radio name="operation" value={get("operation")} change={v=>set("operation",v)} columns={3} options={opts(["Manual","Eu posiciono o braço"],["Automática","Quero apertar um botão"],["Sem preferência","Quero avaliar custo e qualidade"])} /></Question>
        <Question n="11" title="Você aceita ajustar o braço seguindo instruções?"><Radio name="adjustments" value={get("adjustments")} change={v=>set("adjustments",v)} options={opts(["Sim","Aceito fazer regulagens simples"],"Prefiro o mínimo de ajustes","Não sei — quero entender a diferença")} /></Question>
        <Question n="12" title="Você aceita equipamentos usados?"><Radio name="used" value={get("used")} change={v=>set("used",v)} columns={3} options={opts("Sim",["Não","Apenas novos"],["Depende","Do tipo e da garantia"])} /></Question>
      </>}

      {step === 4 && <><Intro n="05" title="Onde o sistema vai ficar?" text="Espaço e volume mudam mais a recomendação do que parece." />
        <Question n="13" title="Em qual ambiente você mais vai ouvir?"><Radio name="room" value={get("room")} change={v=>set("room",v)} columns={2} options={opts("Quarto","Sala pequena","Sala média ou grande","Escritório ou outro")} /></Question>
        <Question n="14" title="Quanto espaço você tem?"><Radio name="space" value={get("space")} change={v=>set("space",v)} options={opts("Espaço para componentes separados","Preciso de solução compacta","Vou enviar foto e medidas")} /></Question>
        <Question n="15" title="Em qual volume costuma ouvir?"><Radio name="volume" value={get("volume")} change={v=>set("volume",v)} columns={3} options={opts("Baixo","Médio","Alto")} /></Question>
        <Question n="16" title="Qual é a tensão das tomadas?"><Radio name="voltage" value={get("voltage")} change={v=>set("voltage",v)} columns={3} options={opts("127 V","220 V","Não sei")} /></Question>
      </>}

      {step === 5 && <><Intro n="06" title="Falta alguma coisa?" text="Este espaço existe justamente para capturar o que o questionário não previu." />
        <Question n="17" title="Como você quer ser chamado no relatório?" help="Usaremos este nome somente para identificar sua entrega."><Field label="Seu nome" value={get("name")} change={v=>set("name",v)} placeholder="Seu nome" /></Question>
        <Question n="18" title="Qual e-mail você usou na compra?" help="Usaremos para identificar seu pagamento e avisar quando o relatório estiver pronto."><Field label="Seu e-mail" type="email" value={get("email")} change={v=>set("email",v)} placeholder="voce@exemplo.com" /></Question>
        <Question n="19" title="Quer informar também um WhatsApp?" optional><Field label="WhatsApp" value={get("contact")} change={v=>set("contact",v)} placeholder="(00) 00000-0000" /></Question>
        <Question n="20" title="Tem algo importante que não perguntamos?" help="Pode contar sobre objetivo, espaço, equipamentos ou qualquer restrição." optional><textarea value={get("notes")} onChange={e=>set("notes",e.target.value)} placeholder="Escreva livremente…" rows={5}/></Question>
        <Question n="21" title="Já está considerando algum produto?" help="Cole links ou escreva os modelos." optional><textarea value={get("links")} onChange={e=>set("links",e.target.value)} placeholder="Links ou modelos…" rows={3}/></Question>
        <div className="bonus"><mark>Opcional</mark><h2>Depois do setup, os discos</h2><p>Estes itens não alteram o diagnóstico técnico, mas ajudam a personalizar as indicações para a sua coleção.</p><label>Quer receber sugestões de discos?</label><Radio name="records" value={get("records")} change={v=>set("records",v)} columns={2} options={opts("Sim","Não")} />{get("records") === "Sim" && <div className="musicProfile"><label>Quais gêneros e artistas você mais escuta?</label><textarea value={get("musicTaste")} onChange={e=>set("musicTaste",e.target.value)} placeholder="Ex.: MPB, jazz e rock brasileiro. Tim Maia, Gal Costa, Clube da Esquina…" rows={3}/><label>Tem algum disco que gostaria de encontrar?</label><textarea value={get("recordWishlist")} onChange={e=>set("recordWishlist",e.target.value)} placeholder="Escreva títulos ou artistas que estão na sua lista de desejos…" rows={3}/></div>}<label>Quer conhecer futuramente o Grupo de Garimpo da Vivinil?</label><Radio name="garimpo" value={get("garimpo")} change={v=>set("garimpo",v)} columns={2} options={opts("Sim, tenho interesse","Agora não")} /></div>
      </>}
      {error && <div className="error" role="alert">{error}</div>}
      <footer>{step > 0 ? <button className="secondary" onClick={back} disabled={submitting}>← Voltar</button> : <button className="text" onClick={()=>setStarted(false)}>Sair</button>}<button className="primary" onClick={next} disabled={submitting}>{submitting?"Enviando…":step===5?"Enviar diagnóstico":"Continuar"} <b>→</b></button></footer>
    </form></div>
  </main>;
}

function Logo() { return <i className="logo" aria-hidden="true"><b /></i>; }
function Top({ beta = "Rascunho salvo" }: { beta?: string }) { return <header className="top"><div><Logo/><span>Toca Certo</span></div><small>● {beta}</small></header>; }
function Record() { return <div className="record" aria-hidden="true"><i/><i/><i/><b><span>SEU<br/>SETUP</span></b></div>; }
function Intro({n,title,text}:{n:string;title:string;text:string}) { return <div className="intro"><b>{n}</b><div><h1>{title}</h1><p>{text}</p></div></div>; }
function Panel({children}:{children:React.ReactNode}) { return <div className="panel">{children}</div>; }
function Field({label,value,change,placeholder,type="text"}:{label:string;value:string;change:(v:string)=>void;placeholder:string;type?:"text"|"email"}) { return <label className="field"><span>{label}</span><input type={type} value={value} onChange={e=>change(e.target.value)} placeholder={placeholder}/></label>; }

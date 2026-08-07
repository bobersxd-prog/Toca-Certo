"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { PlanData, PlanOption } from "../plano/PlanTemplate";
import styles from "./PlanStoryTemplate.module.css";

const timeline = [
  { id: "profile", label: "Seu perfil", duration: 7000 },
  { id: "decision", label: "A decisão", duration: 4500 },
  { id: "system", label: "Seu sistema", duration: 12000 },
  { id: "why", label: "Por que funciona", duration: 7500 },
  { id: "closing", label: "Plano completo", duration: 5500 },
] as const;

const sceneStarts = timeline.map((_, index) => timeline.slice(0, index).reduce((sum, item) => sum + item.duration, 0));
const totalDuration = timeline.reduce((sum, item) => sum + item.duration, 0);
type SceneId = "ready" | (typeof timeline)[number]["id"];

function Brand() {
  return <span className={styles.brand}><span className={styles.brandDisc} aria-hidden="true"><i /></span><span><strong>Toca Certo</strong><small>O plano certo para o seu som em vinil</small></span></span>;
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <span className={styles.eyebrow}>{children}</span>;
}

function ProductVisual({ component }: { component: PlanOption["components"][number] }) {
  if (component.image) {
    return <span className={styles.equipmentPhoto}><Image src={component.image} alt={component.imageAlt ?? component.name} fill priority sizes="(max-width: 520px) 42vw, 260px" /></span>;
  }

  return component.type === "turntable"
    ? <span className={styles.turntableGlyph} aria-hidden="true"><i /><b /></span>
    : <span className={styles.speakerGlyph} aria-hidden="true"><i /><i /></span>;
}

function currentScene(elapsed: number): SceneId {
  let accumulated = 0;
  for (const item of timeline) {
    accumulated += item.duration;
    if (elapsed < accumulated) return item.id;
  }
  return "closing";
}

function Scene({ id, active, children, className = "" }: { id: SceneId; active: boolean; children: ReactNode; className?: string }) {
  return <section className={`${styles.scene} ${styles[id]} ${active ? styles.active : ""} ${className}`} aria-hidden={!active}>{children}</section>;
}

function OpeningHeaderControls({ elapsed, playing, onToggle, onSkip, onSeek }: { elapsed: number; playing: boolean; onToggle: () => void; onSkip: () => void; onSeek: (index: number) => void }) {
  const progress = Math.min(100, elapsed / totalDuration * 100);
  const remaining = Math.max(0, Math.ceil((totalDuration - elapsed) / 1000));
  return <div className={styles.headerControls} aria-label="Controles da apresentação">
    <button className={styles.playPause} type="button" onClick={onToggle} aria-label={playing ? "Pausar apresentação" : "Continuar apresentação"}><i aria-hidden="true">{playing ? "Ⅱ" : "▶"}</i><span>{playing ? "Pausar" : "Continuar"}</span></button>
    <div className={styles.headerTimeline} aria-label="Linha do tempo da apresentação">
      <div className={styles.progressTrack} aria-hidden="true"><i style={{ width: `${progress}%` }} /></div>
      <div className={styles.sceneMarkers}>{timeline.map((item, index) => <button type="button" key={item.id} aria-label={`Ir para ${item.label}`} onClick={() => onSeek(index)} className={elapsed >= sceneStarts[index] ? styles.visited : ""}><i aria-hidden="true" /><span>{item.label}</span></button>)}</div>
    </div>
    <time aria-label={`${remaining} segundos restantes`}>0:{String(remaining).padStart(2, "0")}</time>
    <button className={styles.skipButton} type="button" aria-label="Pular apresentação" onClick={onSkip}><span className={styles.skipText}>Pular apresentação</span><span aria-hidden="true">→</span></button>
  </div>;
}

function ReadyScene({ plan, active, onPlay, onSkip }: { plan: PlanData; active: boolean; onPlay: () => void; onSkip: () => void }) {
  return <Scene id="ready" active={active}><div className={styles.readyTop}><Brand/><span>Plano #{plan.planId}</span></div><div className={styles.readyBody}><Eyebrow>Preparado especialmente para {plan.clientName}</Eyebrow><h1>Seu plano Toca Certo está pronto.</h1><p>Em menos de um minuto, veja como suas respostas se transformaram em um sistema completo para ouvir seus discos.</p><div className={styles.readyActions}><button type="button" onClick={onPlay}><i aria-hidden="true">▶</i> Assistir à apresentação</button><button type="button" onClick={onSkip}>Abrir o plano completo</button></div></div><div className={styles.readyRecord} aria-hidden="true"><i/><b/></div></Scene>;
}

function ProfileScene({ plan, active }: { plan: PlanData; active: boolean }) {
  const highlights = plan.profile.slice(0, 4);
  const summary = highlights.map(item => item.value.toLowerCase()).join(", ");
  return <Scene id="profile" active={active}><div className={styles.sceneHeader}><Brand/><span>01 / Entendemos você</span></div><div className={styles.profileLayout}><div><Eyebrow>O ponto de partida</Eyebrow><h2>Antes de escolher equipamentos, entendemos o que o seu sistema precisa resolver.</h2></div><div className={styles.profileItems}>{highlights.map((item, index) => <article key={item.label} style={{ "--index": index } as CSSProperties}><small>{String(index + 1).padStart(2, "0")} · {item.label}</small><strong>{item.value}</strong></article>)}</div><div className={styles.profileSummary}><small>A síntese do projeto</small><p>Precisamos de uma solução que combine <strong>{summary}</strong>.</p></div></div></Scene>;
}

function DecisionScene({ option, active }: { option: PlanOption; active: boolean }) {
  return <Scene id="decision" active={active}><div className={styles.sceneHeader}><Brand/><span>02 / A decisão</span></div><div className={styles.decisionStage}><div className={styles.decisionOrbit} aria-hidden="true"><i/></div><div className={styles.decisionContent}><Eyebrow>Depois de comparar os caminhos</Eyebrow><h2>Com essas prioridades,<br/><em>um sistema se destacou.</em></h2><span>Recomendação principal</span><strong>{option.title}</strong></div></div></Scene>;
}

function SystemScene({ plan, option, active }: { plan: PlanData; option: PlanOption; active: boolean }) {
  return <Scene id="system" active={active}><div className={styles.sceneHeader}><Brand/><span>03 / O sistema recomendado</span></div><div className={styles.systemIntro}><Eyebrow>Não são produtos isolados</Eyebrow><h2>Primeiro, as peças certas. Depois, o sistema completo.</h2></div><div className={`${styles.systemFlow} ${option.setupImage ? styles.componentStage : ""}`}>{option.components.map((component, index) => <div className={styles.componentGroup} key={component.name} style={{ "--index": index } as CSSProperties}><article><ProductVisual component={component}/><div><small>{component.type === "turntable" ? "Toca-discos" : "Caixas ativas"}</small><h3>{component.name}</h3><p>{component.detail}</p>{component.price && <strong>{component.price}</strong>}</div></article></div>)}{!option.setupImage && <div className={styles.totalCard}><small>Sistema completo</small><span>Investimento estimado</span><strong>{option.price}</strong><p>{option.verdict}</p></div>}</div><div className={styles.connectionStrip}>{plan.connection.map((item, index) => <span key={item} style={{ "--index": index } as CSSProperties}>{item}{index < plan.connection.length - 1 && <i aria-hidden="true" />}</span>)}</div>{option.setupImage && <div className={styles.setupReveal}><Image src={option.setupImage} alt={option.setupImageAlt ?? `Setup completo ${option.title}`} fill priority sizes="(max-width: 520px) calc(100vw - 32px), 940px"/><div className={styles.setupPrice}><small>Investimento estimado</small><strong>{option.price}</strong><span>{option.title}</span></div></div>}</Scene>;
}

function WhyScene({ plan, option, active }: { plan: PlanData; option: PlanOption; active: boolean }) {
  return <Scene id="why" active={active}><div className={styles.sceneHeader}><Brand/><span>04 / A lógica da escolha</span></div><div className={styles.whyLayout}><div><Eyebrow>Por que este sistema?</Eyebrow><h2>A recomendação venceu pelo conjunto — não por uma especificação isolada.</h2></div><div className={styles.reasons}>{plan.whyItWorks.slice(0, 3).map((item, index) => <article key={item.title} style={{ "--index": index } as CSSProperties}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{item.title}</h3><p>{item.copy}</p></div></article>)}</div><aside><small>A concessão aceita</small><strong>{option.limits.slice(0, 2).join(" · ")}</strong><p>O plano completo mostra todas as vantagens, limitações e alternativas antes da compra.</p></aside></div></Scene>;
}

function ClosingScene({ plan, active, seconds, onOpen }: { plan: PlanData; active: boolean; seconds: number; onOpen: () => void }) {
  return <Scene id="closing" active={active}><div className={styles.sceneHeader}><Brand/><span>05 / Plano completo</span></div><div className={styles.closingStage}><div className={styles.closingRecord} aria-hidden="true"><i/></div><div className={styles.closingContent}><Eyebrow>Apresentação concluída</Eyebrow><h2>Agora conheça todos os detalhes do seu plano.</h2><p>Compare as opções, confira os links de compra, veja como conectar tudo e acompanhe o caminho de evolução do seu sistema.</p><button type="button" onClick={onOpen}>Abrir meu plano completo <span aria-hidden="true">→</span></button><small>{seconds > 0 ? `Abrindo automaticamente em ${seconds}s` : `Abrindo o plano #${plan.planId}…`}</small></div></div></Scene>;
}

export function PlanStoryTemplate({ plan, planHref }: { plan: PlanData; planHref: string }) {
  const router = useRouter();
  const recommended = useMemo(() => plan.options.find(option => option.id === plan.recommendationId) ?? plan.options[0], [plan]);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [finished, setFinished] = useState(false);
  const elapsedRef = useRef(0);
  const scene = started ? currentScene(elapsed) : "ready";

  useEffect(() => { elapsedRef.current = elapsed; }, [elapsed]);

  useEffect(() => {
    if (!playing) return;
    let previous = performance.now();
    let frame = 0;
    let lastPaint = 0;
    const tick = (now: number) => {
      const next = Math.min(totalDuration, elapsedRef.current + Math.max(0, now - previous));
      previous = now;
      elapsedRef.current = next;
      if (now - lastPaint > 45 || next === totalDuration) {
        setElapsed(next);
        lastPaint = now;
      }
      if (next >= totalDuration) {
        setPlaying(false);
        setFinished(true);
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing]);

  useEffect(() => {
    if (!finished) return;
    const timeout = window.setTimeout(() => router.push(planHref), 2200);
    return () => window.clearTimeout(timeout);
  }, [finished, planHref, router]);

  const play = () => { setStarted(true); setFinished(false); setPlaying(true); };
  const openPlan = () => router.push(planHref);
  const seek = (index: number) => {
    const next = sceneStarts[index] + 50;
    elapsedRef.current = next;
    setStarted(true);
    setFinished(false);
    setElapsed(next);
  };
  const closingStart = sceneStarts[timeline.length - 1];
  const closingSeconds = Math.max(0, Math.ceil((totalDuration - Math.max(elapsed, closingStart)) / 1000));

  return <main className={styles.page} data-scene={scene} data-motion="full">
    <ReadyScene plan={plan} active={!started} onPlay={play} onSkip={openPlan}/>
    {started && <>
      <ProfileScene plan={plan} active={scene === "profile"}/>
      <DecisionScene option={recommended} active={scene === "decision"}/>
      <SystemScene plan={plan} option={recommended} active={scene === "system"}/>
      <WhyScene plan={plan} option={recommended} active={scene === "why"}/>
      <ClosingScene plan={plan} active={scene === "closing"} seconds={closingSeconds} onOpen={openPlan}/>
      <OpeningHeaderControls elapsed={elapsed} playing={playing} onToggle={() => setPlaying(value => !value)} onSkip={openPlan} onSeek={seek}/>
    </>}
    <div className={styles.sceneAnnouncement} aria-live="polite">{started ? timeline.find(item => item.id === scene)?.label : "Seu plano está pronto"}</div>
  </main>;
}

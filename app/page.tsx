const doubts = [
  "O toca-discos já possui pré-amplificador?",
  "As caixas precisam ser ativas ou passivas?",
  "Ainda será necessário um amplificador?",
  "O Bluetooth envia ou apenas recebe áudio?",
  "Quais cabos e adaptadores estão faltando?",
  "Esse sistema poderá evoluir no futuro?",
];

const deliverables = [
  ["Diagnóstico do seu perfil", "Objetivo, orçamento, espaço, equipamentos atuais e o nível de praticidade que você procura."],
  ["Três possibilidades de setup", "Uma recomendação principal, uma alternativa econômica e outra com maior potencial de evolução."],
  ["Comparativo claro", "Preço total, recursos, praticidade, limitações, compatibilidade e possibilidade de upgrade."],
  ["Lista completa de compra", "Equipamentos, cabos, adaptadores e acessórios — inclusive aquilo que você não precisa comprar."],
  ["Diagrama de conexão", "Uma representação simples de onde cada aparelho e cabo entra no sistema."],
  ["Plano de upgrades", "O que melhorar primeiro, o que pode esperar e o que continuará útil no futuro."],
];

const faqs = [
  ["Não posso pesquisar tudo sozinho?", "Pode. O projeto existe para reduzir o tempo de pesquisa, organizar a compatibilidade do sistema e evitar que você só descubra depois da compra que ainda faltam outros aparelhos."],
  ["Vou receber apenas uma lista de produtos?", "Não. A recomendação começa pela arquitetura do sistema: o que será conectado, o que pode ser reaproveitado e quais recursos realmente importam para você."],
  ["Tenho equipamentos antigos. Eles podem ser aproveitados?", "Possivelmente. O diagnóstico pede marca, modelo e fotos das conexões para identificar o que ainda faz sentido manter."],
  ["E se os preços mudarem depois?", "O relatório registra os preços pesquisados e apresenta alternativas. Durante a revisão incluída, a recomendação pode ser ajustada caso uma opção fique indisponível antes da compra."],
  ["As recomendações podem ter links comissionados?", "Sim, sempre identificados com transparência. A existência de comissão não substitui os critérios de compatibilidade e não impede a indicação de alternativas sem comissão."],
  ["O serviço inclui conserto ou instalação?", "Não. O Toca Certo é um projeto de curadoria e orientação de compra. Não inclui reparo eletrônico, instalação presencial ou projeto acústico."],
];

function Logo() {
  return <span className="tc-logo" aria-hidden="true"><i /><b /></span>;
}

function Brand() {
  return <a className="tc-brand" href="#inicio"><Logo /><span>Toca Certo<small>Do primeiro toca-discos ao próximo upgrade</small></span></a>;
}

export default function Home() {
  return <main className="tc-page" id="inicio">
    <nav className="tc-nav">
      <Brand />
      <a className="tc-nav-cta" href="#oferta">Conhecer o projeto</a>
    </nav>

    <section className="tc-hero tc-shell">
      <div className="tc-hero-copy">
        <span className="tc-eyebrow">Projeto personalizado para ouvir vinil</span>
        <h1>Você já tem os discos. Agora monte o <em>sistema certo</em> para ouvi-los.</h1>
        <p>Receba um projeto personalizado com toca-discos, caixas, amplificação, cabos e acessórios adequados ao seu orçamento, espaço e maneira de ouvir música.</p>
        <div className="tc-actions">
          <a className="tc-button" href="#oferta">Quero descobrir meu setup ideal <span>→</span></a>
          <small>Edição beta · proposta inicial</small>
        </div>
      </div>
      <div className="tc-system" aria-label="Ilustração de um toca-discos conectado a caixas">
        <div className="tc-turntable"><span className="tc-record"><i /></span><span className="tc-arm" /></div>
        <div className="tc-cable"><i /><i /><i /></div>
        <div className="tc-speaker"><i /><b /></div>
        <span className="tc-system-note">Um sistema completo.<br/>Não apenas um aparelho.</span>
      </div>
    </section>

    <section className="tc-problem tc-shell">
      <div className="tc-section-heading">
        <span className="tc-kicker">Parece simples até começar a pesquisar</span>
        <h2>Comprar um toca-discos é só uma parte da decisão.</h2>
        <p>Um modelo pode parecer perfeito sozinho e ainda assim não funcionar com as caixas, exigir equipamentos extras ou limitar o próximo upgrade.</p>
      </div>
      <div className="tc-doubts">{doubts.map((item, index) => <article key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></article>)}</div>
      <div className="tc-warning"><strong>O risco não é apenas pagar caro.</strong><p>É comprar componentes incompatíveis, repetir funções, estourar o orçamento ou descobrir que o toca-discos não era o sistema completo.</p></div>
    </section>

    <section className="tc-paths">
      <div className="tc-shell">
        <div className="tc-section-heading tc-light"><span className="tc-kicker">Do ponto em que você está</span><h2>Dois momentos. O mesmo objetivo: fazer seu dinheiro tocar melhor.</h2></div>
        <div className="tc-path-grid">
          <article><span>01</span><h3>Meu Primeiro Setup</h3><p>Para quem já tem discos, mas ainda precisa montar um sistema completo, compatível e adequado ao orçamento.</p><ul><li>Definir a arquitetura do sistema</li><li>Escolher caixas e amplificação</li><li>Entender tudo o que precisa comprar</li></ul></article>
          <article><span>02</span><h3>Meu Próximo Upgrade</h3><p>Para quem já possui equipamentos e quer descobrir o que aproveitar e qual mudança fará mais diferença.</p><ul><li>Identificar o principal ponto fraco</li><li>Evitar trocas desnecessárias</li><li>Organizar uma evolução por etapas</li></ul></article>
        </div>
      </div>
    </section>

    <section className="tc-how tc-shell">
      <div className="tc-section-heading"><span className="tc-kicker">Como funciona</span><h2>Da sua realidade a um projeto que você consegue executar.</h2></div>
      <div className="tc-steps">
        <article><b>1</b><h3>Você responde ao diagnóstico</h3><p>Depois da compra, conta o que já possui, quanto pode gastar e como quer usar o sistema.</p></article>
        <article><b>2</b><h3>O sistema é pesquisado como um todo</h3><p>Compatibilidade, preços, disponibilidade, praticidade, limitações e caminhos de evolução entram na análise.</p></article>
        <article><b>3</b><h3>Você recebe um projeto claro</h3><p>Com opções comparadas, lista de compra, diagrama de conexão e explicações em linguagem acessível.</p></article>
      </div>
    </section>

    <section className="tc-delivery">
      <div className="tc-shell tc-delivery-grid">
        <div>
          <div className="tc-section-heading"><span className="tc-kicker">O que você recebe</span><h2>As respostas que faltavam antes de comprar.</h2></div>
          <div className="tc-deliverables">{deliverables.map(([title, copy], index) => <article key={title}><span>{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div>
        </div>
        <aside className="tc-report">
          <small>Exemplo ilustrativo</small>
          <header><Logo /><div><b>Seu projeto Toca Certo</b><span>Relatório personalizado</span></div></header>
          <div className="tc-report-profile"><i>Perfil</i><strong>Primeiro sistema · até R$ 2.500</strong><p>Apartamento · caixas inclusas · prioridade em praticidade</p></div>
          <div className="tc-report-option"><span>Recomendação principal</span><strong>Setup equilibrado</strong><p>Toca-discos → caixas ativas</p><b>R$ 2.340</b></div>
          <div className="tc-report-row"><span>Alternativa econômica</span><b>R$ 1.890</b></div>
          <div className="tc-report-row"><span>Opção evolutiva</span><b>R$ 2.940</b></div>
          <footer><i>✓ Compatibilidade verificada</i><i>✓ Cabos incluídos na lista</i></footer>
        </aside>
      </div>
    </section>

    <section className="tc-story tc-shell">
      <div className="tc-story-quote"><span>“</span><h2>Eu comprava discos de R$ 300, R$ 400 e até R$ 500 — mas continuava usando um toca-discos antigo.</h2></div>
      <div className="tc-story-copy"><span className="tc-kicker">De onde veio a ideia</span><p>Quando fui pesquisar qual sistema comprar, percebi que escolher o toca-discos era apenas o começo. Era preciso entender pré-amplificação, caixas ativas e passivas, regulagem do braço, cápsulas, agulhas, amplificadores, cabos e até se o Bluetooth enviava ou recebia áudio.</p><p>O Toca Certo nasceu para organizar essa decisão: pesquisar, montar e explicar um sistema adequado à realidade de cada pessoa.</p></div>
    </section>

    <section className="tc-manifesto"><div className="tc-shell"><Logo /><p>Você não precisa do toca-discos mais caro.</p><h2>Precisa do sistema certo para o seu espaço, orçamento e forma de ouvir música.</h2></div></section>

    <section className="tc-offer tc-shell" id="oferta">
      <div className="tc-offer-intro"><span className="tc-kicker">Edição beta · proposta inicial</span><h2>Seu projeto completo, antes de gastar com os equipamentos.</h2><p>Esta é a configuração pensada para os primeiros clientes e ainda será validada durante o piloto.</p>
        <div className="tc-price"><small>Valor beta provisório</small><span>R$</span><strong>67</strong></div><p className="tc-deadline">Entrega prevista em até 5 dias úteis após o envio completo das informações.</p>
      </div>
      <div className="tc-offer-card"><h3>Incluído no projeto</h3><ul><li>Diagnóstico personalizado do perfil</li><li>Três opções de setup</li><li>Comparativo de preços e recursos</li><li>Lista completa de compra</li><li>Diagrama de conexão</li><li>Explicação das escolhas e limitações</li><li>Plano de upgrades</li><li>Uma rodada de dúvidas</li><li>Uma revisão da recomendação</li></ul><a className="tc-button" href="#beta">Quero participar da beta <span>→</span></a><small>As primeiras vagas ainda não foram abertas.</small></div>
    </section>

    <section className="tc-guarantee tc-shell"><span>Revisão de satisfação</span><div><h2>O projeto precisa fazer sentido para a sua realidade.</h2><p>Se a recomendação não responder adequadamente às informações enviadas, você poderá solicitar uma revisão completa. Se, mesmo após a revisão, o projeto ainda não fizer sentido, o valor será devolvido.</p></div></section>

    <section className="tc-faq tc-shell"><div className="tc-section-heading"><span className="tc-kicker">Perguntas frequentes</span><h2>Antes de colocar o primeiro disco.</h2></div><div className="tc-faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>

    <section className="tc-beta" id="beta"><div className="tc-shell"><span className="tc-eyebrow">Estamos construindo a primeira edição</span><h2>Esta página também faz parte do teste.</h2><p>A oferta, o preço e alguns itens ainda serão refinados depois dos primeiros projetos. Por enquanto, ela serve para enxergar a proposta inteira e descobrir o que precisa ficar mais claro antes de abrir as vagas.</p><a className="tc-button tc-button-light" href="mailto:contato@tocacerto.com.br?subject=Quero%20acompanhar%20a%20beta%20do%20Toca%20Certo">Quero acompanhar a beta <span>→</span></a></div></section>

    <footer className="tc-footer tc-shell"><Brand /><div><p>Projeto independente de curadoria para sistemas de vinil.</p><a href="/questionario">Visualizar questionário de teste</a></div></footer>
  </main>;
}

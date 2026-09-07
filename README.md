# vilquer.dev

Portfólio de Caio Vilquer Carvalho, estudante de Engenharia de Computação na Poli-USP com foco em backend. A página apresenta Poliatletas, RotinaPet, Viazio e TrackShot CV por problema, decisões técnicas e evidências verificáveis.

## Direção da interface

A identidade combina ficha de inspeção, relatório técnico e régua de medição. O diâmetro oficial do círculo do arremesso de peso, 2,135 m, aparece como assinatura visual sem transformar o site em uma página temática de esporte.

- Português em `/` e inglês em `/en/`, com URLs canônicas e `hreflang` recíproco.
- Currículos backend e full stack disponíveis em `public/cv`.
- Conteúdo visível por padrão, movimento progressivo e fallback para `prefers-reduced-motion`.
- Layout verificado entre 320 e 1440 px.
- HTML pré-renderizado em todas as rotas, Open Graph, JSON-LD e cartão social.
- Estudos completos de Poliatletas, RotinaPet, Viazio e TrackShot em rotas próprias nos dois idiomas.
- `sitemap.xml`, `robots.txt`, `llms.txt`, `llms-full.txt` e submissão por IndexNow gerados no build.

## Assinatura

A identidade parte do setor de queda do arremesso de peso. O círculo marca a origem do lançamento; o recorte angular e os arcos técnicos dão direção ao símbolo sem recorrer às iniciais do nome. A paleta reúne verde profundo (`#0B3B3C`), menta (`#8FE3D2`) e papel quente (`#F2F0E6`).

O sistema inclui lockups horizontais, wordmarks e três versões do símbolo para situações diferentes. No site, o cabeçalho usa o lockup sem descritor em telas largas, com variantes para os dois temas, e o símbolo quadrado em telas estreitas.

| Arquivo | Quando usar |
|---|---|
| `public/logos/caio-vilquer-lockup-descritor.svg` | assinatura com descritor sobre papel claro |
| `public/logos/caio-vilquer-lockup-descritor-dark.svg` | assinatura com descritor para superfícies escuras |
| `public/logos/caio-vilquer-lockup.svg` e `public/logos/caio-vilquer-lockup-dark.svg` | cabeçalho e assinatura horizontal sem descritor |
| `public/logos/caio-vilquer-wordmark.svg` e `public/logos/caio-vilquer-wordmark-dark.svg` | nome sem símbolo |
| `public/logos/caio-vilquer-simbolo.svg` | marca quadrada do cabeçalho compacto |
| `public/logos/caio-vilquer-simbolo-transparente.svg` | símbolo sem fundo |
| `public/logos/caio-vilquer-emblema.svg` | versão circular para avatares e selos |
| `public/logos/caio-vilquer-favicon.svg` | fonte vetorial do favicon |
| `public/og-card.svg` | fonte da verdade do cartão social |

Archivo Black, Archivo Narrow e Source Serif 4 ficam em `public/fonts`, com suas licenças OFL. As logos usam Archivo Black no nome e incorporam a fonte no próprio SVG, para manter o desenho quando carregadas como imagem. A página usa os arquivos locais de Archivo Narrow e Source Serif 4. Nada depende do Google Fonts em tempo de execução.

Depois de editar o cartão social ou o favicon, regere os bitmaps no macOS:

```bash
sips -s format png public/og-card.svg --out public/og-card.png
sips -s format png public/logos/caio-vilquer-favicon.svg --out public/favicon.png
sips -z 512 512 public/favicon.png
```

## Desenvolvimento

### Aparência

O seletor oferece Sistema (padrão), Claro e Escuro e persiste a preferência em `localStorage`, na chave `portfolio-theme`. Mudanças do sistema são aplicadas apenas em Sistema; outras abas e páginas restauradas do histórico também sincronizam a escolha. Se o armazenamento estiver bloqueado, a seleção funciona durante a leitura atual.

O Vite incorpora `src/theme-bootstrap.js` no HTML, antes dos estilos e da hidratação. Esse é o único controlador da preferência; `src/theme.ts` conecta o estado ao React com uma leitura estável durante a hidratação. Os tokens de cor usam `light-dark()` com `color-scheme`, inclusive para seguir o sistema sem JavaScript. A impressão força o esquema claro.

A paleta escura combina grafite azulado, marfim, cobre e menta. Ações, rodapé e estados de confirmação têm tokens próprios. As marcas dos projetos e as fotos mantêm suas cores originais.

A troca manual usa uma transição de opacidade de 240 ms quando disponível. Preferências automáticas, movimento reduzido e navegadores sem View Transitions aplicam o estado imediatamente. A troca Resumo/Dossiê mantém seu fade de 100/180 ms e encerra a transição de aparência antes de medir a posição de leitura.

`npm run test:theme` cobre resolução, persistência, armazenamento bloqueado, sincronização, histórico e cancelamento de transições. Os testes fazem parte de `npm run check`.

### Movimento e orientação

O marcador de arremesso percorre a mesma parábola desenhada no SVG: o eixo horizontal mantém velocidade constante e o vertical desacelera até o ápice e acelera na descida. Separar os eixos evita a pausa intermediária da antiga curva de entrada. As marcas de medição aparecem ao final do voo de 420 ms.

A navegação da home indica a seção em leitura com `aria-current="location"` e uma marca de régua, inclusive no índice mobile. A medição acompanha rolagem, redimensionamento e mudanças entre Resumo/Dossiê. O índice de projetos traça uma régua ao receber hover, foco ou pressionamento; a seta de abertura dos estudos recebe cantos de registro. Os efeitos usam transformações e opacidade, sem dependências adicionais, e os estados ficam imediatos com movimento reduzido. A rolagem e as âncoras continuam nativas.

Ao seguir um link durante o fade de leitura, a escolha de Resumo/Dossiê é concluída antes da navegação. Isso impede que a restauração pendente da posição de leitura desfaça o salto para a seção escolhida.

### Comandos

```bash
npm install
npm run dev
npm run check
```

O conteúdo bilíngue fica em `src/content.ts`; a composição está em `src/App.tsx`, as rotas em `src/routes.ts`, os dados estruturados em `src/seo.ts` e o sistema visual em `src/index.css`.

O build gera as páginas abaixo como HTML indexável, sem depender da execução do React para entregar título, resumo ou links:

- `/` e `/en/`
- `/projetos/{projeto}/` e `/en/projects/{project}/`
- quatro currículos em PDF, dois por idioma

Depois do build, `npm run seo:audit` verifica títulos e descrições únicos, canonicals, `hreflang`, H1, JSON-LD, imagens, links internos, sitemap, regras dos crawlers e arquivos para LLMs.

## Publicação

O domínio customizado é definido em `public/CNAME`. O comando abaixo gera o build, publica `dist` pelo GitHub Pages e envia as URLs do sitemap ao IndexNow:

```bash
npm run deploy
```

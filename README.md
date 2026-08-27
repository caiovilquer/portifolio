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

O sistema inclui lockups horizontais, wordmarks e três versões do símbolo para situações diferentes. No site, o cabeçalho usa o lockup com descritor em telas largas e o símbolo quadrado em telas estreitas.

| Arquivo | Quando usar |
|---|---|
| `public/logos/caio-vilquer-lockup-descritor.svg` | cabeçalho sobre papel claro |
| `public/logos/caio-vilquer-lockup-descritor-dark.svg` | lockup com descritor para superfícies escuras |
| `public/logos/caio-vilquer-lockup.svg` e `public/logos/caio-vilquer-lockup-dark.svg` | assinatura horizontal sem descritor |
| `public/logos/caio-vilquer-wordmark.svg` e `public/logos/caio-vilquer-wordmark-dark.svg` | nome sem símbolo |
| `public/logos/caio-vilquer-simbolo.svg` | marca quadrada do cabeçalho compacto |
| `public/logos/caio-vilquer-simbolo-transparente.svg` | símbolo sem fundo |
| `public/logos/caio-vilquer-emblema.svg` | versão circular para avatares e selos |
| `public/logos/caio-vilquer-favicon.svg` | fonte vetorial do favicon |
| `public/og-card.svg` | fonte da verdade do cartão social |

Depois de editar o cartão social ou o favicon, regere os bitmaps no macOS:

```bash
sips -s format png public/og-card.svg --out public/og-card.png
sips -s format png public/logos/caio-vilquer-favicon.svg --out public/favicon.png
sips -z 512 512 public/favicon.png
```

## Desenvolvimento

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

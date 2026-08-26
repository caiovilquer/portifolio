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

A marca é o símbolo de diâmetro desenhado como círculo de projeto: bojo, marcas de centro e a diagonal de cota. Ela sai da mesma âncora do Ø 2,135 m da régua da página.

Sistema de três pesos de traço, um trabalho para cada, na escala do lockup (viewBox 275 × 76):

| Peso | Onde | Papel |
|---|---|---|
| 4 | círculo e diagonal | o objeto medido |
| 3 | letras das duas linhas | o nome |
| 2 | marcas de centro, terminais e linha de cota | anotação |

Regras de construção: as duas linhas têm altura de caixa 22; as redondas (C, O, Q) partem do raio 11; O e Q compartilham o eixo x = 171; as duas linhas terminam em x = 270, e é a linha de cota vermelha que fecha a linha curta nessa medida.

| Arquivo | Quando usar |
|---|---|
| `public/media/caio-vilquer-logo.svg` | padrão, sobre papel claro |
| `public/media/caio-vilquer-logo-dark.svg` | sobre `--azul-planta` e outras superfícies escuras |
| `public/media/caio-vilquer-mark.svg` | marca isolada, cabeçalho compacto |
| `public/favicon.svg` | ladrilho de aba, traço mais pesado para sobreviver a 16 px |
| `public/og-card.svg` | fonte da verdade do cartão social |

A tinta muda entre as versões para manter contraste: sobre papel o vermelho é `#b7432b` (4,65:1) e as marcas de centro são `#7b817a` (3,40:1); sobre escuro o vermelho abre para `#d4614a` (3,89:1), porque o `#b7432b` cai para 2,67:1 ali.

Depois de editar `og-card.svg` ou `favicon.svg`, regere os bitmaps:

```bash
python3 -c "import cairosvg; cairosvg.svg2png(url='public/og-card.svg', write_to='public/og-card.png', output_width=1200, output_height=630)"
python3 -c "import cairosvg; cairosvg.svg2png(url='public/favicon.svg', write_to='public/favicon.png', output_width=512, output_height=512)"
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

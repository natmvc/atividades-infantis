# Atividades Infantis

Site em Next.js para vender PDFs infantis prontos para imprimir, com catalogo de temas, produtos, datas comemorativas, pack completo e versao em ingles.

## Como rodar

```bash
pnpm install
pnpm dev
```

Depois acesse `http://localhost:3000`.

Para gerar a versao de producao:

```bash
pnpm build
pnpm start
```

## Onde editar

- Temas, textos curtos, slugs e imagens: `src/data/site.ts`
- Links de checkout: `checkoutLinks` em `src/data/site.ts`
- Datas comemorativas: `seasonal` em `src/data/site.ts`
- Componentes visuais: `src/components`
- Paginas e estrutura das rotas: `app/[[...slug]]/page.tsx`
- Estilos globais: `app/globals.css`

## Como trocar imagens

As imagens ficam em `public/images`.

Para trocar uma imagem, substitua o arquivo mantendo o mesmo nome, ou altere o caminho da imagem no tema dentro de `src/data/site.ts`.

Cada produto usa a imagem do tema como capa, mockup e galeria placeholder. Quando tiver imagens finais, troque essa logica no componente `ProductPage` em `app/[[...slug]]/page.tsx`.

## Como trocar links de checkout

No arquivo `src/data/site.ts`, substitua:

```ts
#LINK_CHECKOUT_COLORIR
#LINK_CHECKOUT_ATIVIDADES
#LINK_CHECKOUT_CALIGRAFIA
#LINK_CHECKOUT_PACK_TEMA
#LINK_CHECKOUT_PACK_COMPLETO
```

pelos links reais da sua plataforma de pagamento.

## Como adicionar um novo tema

Adicione um novo objeto no array `themes` em `src/data/site.ts` com:

- `ptSlug`
- `enSlug`
- `image`
- `accent`
- textos em `pt`
- textos em `en`

As páginas do tema e dos produtos são criadas automaticamente a partir desses dados.

## Rotas principais

- `/`
- `/todos-os-temas`
- `/dinossauros`
- `/produto/dinossauros-livro-de-colorir`
- `/datas-comemorativas`
- `/pack-completo`
- `/sobre`
- `/contato`

Versao em ingles:

- `/en`
- `/en/all-themes`
- `/en/dinosaurs`
- `/en/product/dinosaurs-coloring-book`
- `/en/seasonal-activities`
- `/en/complete-pack`
- `/en/about`
- `/en/contact`

## Idioma ingles

Todo conteudo principal tem versao `pt` e `en` em `src/data/site.ts` e `app/[[...slug]]/page.tsx`.

Para editar uma traducao, procure pelo bloco do idioma correspondente.

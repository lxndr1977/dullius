# AGENTS.md

## Visão geral

Este repositório contém o site institucional da Dullius Dance. O projeto usa Astro para gerar páginas estáticas, Tailwind CSS para estilização e arquivos YAML validados com Zod como fonte de conteúdo.

Todo texto visível ao público deve ser escrito em português do Brasil. Preserve o tom institucional: acolhedor, elegante, claro e orientado à experiência do aluno.

## Stack e comandos

- Node.js 22.12 ou superior.
- Astro 6.
- Tailwind CSS 4, integrado por `@tailwindcss/vite`.
- TypeScript em modo estrito.
- Swiper e GLightbox para carrosséis e galerias.
- GSAP, ScrollTrigger, Lenis e Trig.js para animações e rolagem.
- Lucide Astro para ícones.

Comandos principais:

```sh
npm install
npm run dev
npm run build
npm run preview
```

Antes de concluir uma alteração, execute pelo menos `npm run build`. O provedor Fontsource consulta uma API externa durante o build; em ambientes sem rede, podem aparecer avisos sobre a fonte Outfit mesmo quando a geração das páginas termina corretamente.

## Estrutura do projeto

- `src/pages/`: rotas do site.
- `src/pages/modalidades/[slug].astro`: gera as páginas das modalidades com `getStaticPaths()`.
- `src/layouts/`: estrutura global, cabeçalho, rodapé e scripts compartilhados.
- `src/components/`: seções reutilizáveis e componentes de interface.
- `src/components/ui/`: primitivas visuais, como `Button`, `Section` e `SectionHeader`.
- `src/content/`: conteúdo estruturado em YAML.
- `src/content/schemas/`: schemas Zod das coleções.
- `src/scripts/`: inicialização das interações no navegador.
- `src/styles/global.css`: Tailwind, tokens do tema e estilos globais.
- `public/`: imagens, logotipos, favicon e outros arquivos estáticos.

## Arquitetura e convenções

### Astro

- Prefira componentes `.astro` renderizados estaticamente.
- Não adicione React, Vue ou outra camada de hidratação sem necessidade comprovada.
- Mantenha a lógica de dados no frontmatter e o HTML semântico no template.
- Defina interfaces `Props` para componentes reutilizáveis.
- Reaproveite componentes existentes antes de criar variações novas.
- Use `Page.astro` nas páginas internas e `Layout.astro` quando a página precisar do cabeçalho transparente sobre o hero.

### Tailwind CSS

- Use classes utilitárias do Tailwind diretamente nos componentes.
- Reutilize os tokens `primary`, `accent` e `dark` definidos em `src/styles/global.css`; evite repetir cores hexadecimais.
- Preserve os padrões responsivos existentes e valide ao menos os layouts mobile e desktop.
- Para seções e títulos, prefira `Section.astro` e `SectionHeader.astro`.
- Para botões e links de ação, prefira `Button.astro`.
- Use `tailwind-merge` quando um componente aceitar classes externas que possam sobrescrever suas classes-base.

### Conteúdo

- Modalidades devem ser cadastradas em `src/content/courses/*.yaml`, e não duplicadas manualmente como novas páginas.
- Ao alterar o formato de um YAML, atualize primeiro o schema correspondente em `src/content/schemas/`.
- O identificador do arquivo da modalidade é usado como slug da URL.
- Referências em `related` devem apontar para IDs reais da coleção `courses`.
- Horários ficam em `src/content/schedules/all.yaml`; mantenha os nomes de `method` e `age` consistentes com os filtros das modalidades.
- Dados institucionais, especialmente o WhatsApp, devem vir de `src/content/company/info.yaml` sempre que possível.
- Imagens referenciadas por caminho absoluto, como `/images/exemplo.webp`, precisam existir sob `public/images/`.

### JavaScript no navegador

- Mantenha scripts pequenos e com inicialização idempotente, evitando duplicar listeners ou instâncias.
- Ao trabalhar com navegação do Astro, considere os eventos `astro:page-load` e `astro:before-swap` e destrua bibliotecas que mantenham estado quando necessário.
- Respeite `prefers-reduced-motion` ao criar novas animações.
- Evite introduzir outra biblioteca quando GSAP, Swiper ou as APIs nativas já atenderem ao caso.

## Qualidade, acessibilidade e SEO

- Use um único `h1` por página e preserve a hierarquia dos demais títulos.
- Toda imagem informativa deve ter um `alt` descritivo; imagens decorativas devem usar `alt=""`.
- Botões sem texto visível precisam de um nome acessível.
- Garanta navegação por teclado para menus, galerias e modais.
- Links e CTAs devem apontar para rotas existentes ou URLs externas válidas.
- Novas páginas devem receber um título descritivo por meio do layout.
- O idioma do documento deve ser `pt-BR`.
- Não habilite `noindex` em produção sem uma solicitação explícita.

## Validação de alterações

Ao finalizar:

1. Execute `npm run build`.
2. Confirme que todas as rotas esperadas foram geradas.
3. Verifique avisos de coleções, schemas, imagens ou links ausentes.
4. Para mudanças visuais, confira mobile e desktop no navegador.
5. Para componentes interativos, teste teclado, abrir/fechar, navegação e reinicialização.

Não versione `dist/`, dependências instaladas ou artefatos temporários. Preserve alterações preexistentes que não pertençam à tarefa atual.

## Pontos conhecidos do repositório

- `contato.astro`, `equipe.astro` e `infraestrutura.astro` ainda são páginas simples e incompletas.
- A coleção `teachers` está configurada, mas o diretório `src/content/teachers/` pode ainda não existir.
- Há implementações antigas e alternativas de galeria. Antes de editar, confirme qual componente é realmente importado pela página.
- Existem CTAs legados para `/classes` e `/join`; essas rotas não devem ser copiadas para novas seções sem serem corrigidas.
- Não faça refatorações amplas desses pontos durante uma tarefa não relacionada.

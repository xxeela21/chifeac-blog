# Blog Alexandru Chifeac — Convenzioni del progetto

## Comandi

```bash
npm run dev      # server locale su http://localhost:4321
npm run build    # build statica in dist/
npm run preview  # preview della build
```

## Stack

- **Astro 5** con Content Collections (Content Layer API)
- **Zero framework JS** — solo vanilla JS per il toggle del tema (~10 righe)
- **Fontsource** per i font (self-hosted a runtime): IBM Plex Mono + IBM Plex Sans
- **Deploy**: Netlify, configurato in `netlify.toml`

## Routing bilingue

Prefisso lingua nell'URL: `/it/` e `/en/`. La root `/` reindirizza a `/it/`.

```
/it/                    → homepage italiana
/en/                    → homepage inglese
/it/blog/[slug]         → articolo in italiano
/en/blog/[slug]         → articolo in inglese
/it/about               → about in italiano
/en/about               → about in inglese
/it/rss.xml             → feed RSS italiano
/en/rss.xml             → feed RSS inglese
```

## Aggiungere un articolo

1. Crea `src/content/blog/it/nome-slug.md`
2. Frontmatter obbligatorio:

```yaml
---
title: "Titolo dell'articolo"
description: "Una riga di descrizione per SEO e lista."
pubDate: YYYY-MM-DD
draft: false   # opzionale, default false
---
```

3. Se esiste anche la versione inglese, crea `src/content/blog/en/nome-slug.md` **con lo stesso nome file**. Il LangSwitch si attiverà automaticamente.

4. Se la versione inglese non esiste, l'articolo non compare in `/en/`. Il LangSwitch mostra "EN" in grigio non cliccabile.

## Design system

Token CSS in `src/styles/global.css` (`--bg`, `--surface`, `--border`, `--text`, `--muted`, `--accent`).

Il tema si applica con `data-theme="dark"` / `data-theme="light"` sull'elemento `<html>`. Il colore accent è amber fosforo (`#C8954A` dark / `#A0700F` light).

Non modificare i token direttamente nelle pagine — aggiorna solo `global.css`.

## Struttura file

```
src/
  content.config.ts     ← schema Zod per la collection "blog" (root di src/)
    blog/
      it/               ← articoli in italiano
      en/               ← articoli in inglese (stesso slug = traduzione)
  layouts/
    Base.astro          ← HTML wrapper, SEO, hreflang, tema
  components/
    Header.astro
    ThemeToggle.astro
    LangSwitch.astro
  pages/
    index.astro         ← redirect 301 → /it/
    [lang]/
      index.astro       ← homepage
      about.astro
      blog/[slug].astro
    it/rss.xml.js
    en/rss.xml.js
  styles/
    global.css          ← token, reset, scale, prose, animazioni
```

## Prima del deploy

- Aggiorna `site` in `astro.config.mjs` con il dominio reale (attualmente `https://chifeac.me`)
- Il deploy su Netlify avviene automaticamente via `netlify.toml`

## Sviluppo

Quando avvii il dev server, usa la modalità background:

```bash
npx astro dev &
```

Documentazione Astro: https://docs.astro.build

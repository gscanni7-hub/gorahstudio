# Gorah Studio

Sito statico di [Gorah Studio](https://www.instagram.com/gorahstudio/), migrato da Webflow.

## Struttura

- `index.html`, `lavori.html`, `servizi.html`, `chi-siamo.html`, `contatti.html` — pagine principali
- `lavori/` — 13 pagine progetto (ex collezione CMS "Lavori")
- `servizi/` — 8 pagine servizio (ex collezione CMS "Servizi")
- `images/` — tutte le immagini self-hosted (ex CDN Webflow)
- `fonts/` — font Sora self-hosted
- `css/`, `js/` — stili e script (inclusi jQuery e webflow.js locali per le animazioni)

## Note

- Il form contatti invia tramite [formsubmit.co](https://formsubmit.co) a gorah.analisi@gmail.com (la prima richiesta va confermata via email).
- `vercel.json` abilita gli URL puliti (`/lavori/bradem` invece di `/lavori/bradem.html`).
- Nessuna dipendenza esterna: il sito funziona anche aprendo `index.html` in locale.

# DESIGN.md — Gorah Studio

## Colors
- `--primary-black: #231f20` (quasi-nero caldo, sfondo dominante)
- `--olive: #ada78f` (oliva/salvia, pannelli split e accenti)
- `--white: #fff` (tipografia display; nei nuovi stili usare `#faf9f6` tinto caldo dove possibile)
- Strategia: **Committed**. Il nero carta carbone copre la maggior parte della superficie, l'oliva taglia i layout a metà verticale. Nessun altro colore: le foto dei progetti portano tutto il colore.

## Typography
- Famiglia unica: **Sora** (100–800, self-hosted, `fonts/sora.css`)
- Display: wordmark e titoli sezione enormi (h1 outline/pieno, testo bianco su nero)
- UI: h3 per titoli card (`header-works`), h6 per date, `p-works` per tag servizio
- Gerarchia per scala e peso, mai per colore

## Layout
- Split verticale 50/50 oliva/nero come firma delle pagine interne (servizi, contatti)
- Griglia lavori: `grid-works` con item `grid-item`, thumbnail `image-thumbnail` (overflow contenuto) + `image-cover-full`
- Header fisso minimale: logo + MENU; menu a schermo intero con immagini nelle voci

## Motion (nuovo layer, file css/gorah-motion.css + js/gorah-motion.js)
- Reveal on scroll: fade + translateY(24px), ease-out-quint, 600ms, stagger 60ms nelle griglie; via IntersectionObserver con classe `.gr-reveal`
- Hover card lavori: scale(1.04) lento (1.2s ease-out-expo) sull'immagine, titolo che slitta di 8px
- Marquee servizi: nastro orizzontale infinito con i nomi servizi in stile display outline
- Rispettare `prefers-reduced-motion: reduce` (tutto statico)
- Mai animare proprietà di layout; solo transform e opacity

## Constraints
- Non toccare `css/gorah.webflow.min.css` (minificato, condiviso): ogni novità va in file separati
- webflow.js gestisce già menu e slider: non interferire coi suoi selettori `data-w-id`
- Peso: niente librerie esterne, niente font aggiuntivi

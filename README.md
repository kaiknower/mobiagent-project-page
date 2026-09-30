# MobiAgent project page

Private local preview of the MobiAgent research project website, based on the supplied demo video's visual design. No deployment, analytics, remote fonts, or third-party scripts.

## Preview

Run `node server.mjs`, then open http://127.0.0.1:4317. The server listens only on loopback. Requires Node.js 20.11 or later.

## Edit

- `dist/index.html`: paper content, author links, and affiliations.
- `dist/style.css`: responsive design.
- `dist/app.js`: video chapters, enlarged figures, and training-round comparison.
- `dist/assets/`: local paper PDF, supplied figures, and the original unmodified 4K HEVC demo and a high-quality H.264 hero crop (3420 × 480, CRF 16).

The latest v5 paper and the September 27 teaser/method figures are used. Video chapter times are approximate. The Code and Checkpoint buttons display icons but remain disabled until the authors provide their URLs. Author names link to the supplied OpenReview profiles, without home emojis. The website acknowledgment section has been removed; the paper PDF is unchanged. No open-source license for research assets or code has been assumed. Before publishing, confirm the repository URL, publication metadata, permissions, and preferred license; remove the noindex meta tag when the page should be searchable.

## Repository status

This repository is private. GitHub Pages is not enabled, and there is no deployment workflow. The original 4K demo is stored using Git LFS. Run `git lfs pull` after cloning. Public deployment and the research code/checkpoint links will be configured separately when the authors are ready.

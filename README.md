# MobiAgent project page

Private local preview of the MobiAgent research project website, based on the supplied demo video's visual design. No deployment, analytics, remote fonts, or third-party scripts.

## Preview

Run `node server.mjs`, then open http://127.0.0.1:4317. The server listens only on loopback. Requires Node.js 20.11 or later.

## Edit

- `dist/index.html`: paper content, author links, and affiliations.
- `dist/style.css`: responsive design.
- `dist/app.js`: independent task playback, thumbnail video chapters, enlarged figures, linked training-round charts, and citation copying.
- `dist/assets/`: local paper PDF, supplied figures, the original unmodified 4K HEVC demo, and a high-quality H.264 hero crop (3420 × 480, CRF 16).

The latest v5 paper and the September 27 teaser/method figures are used. Video chapter times are approximate; chapter thumbnails are extracted from the original video and seek within that same 4K source. The training-round explorer uses the paper's Bootstrap / Iteration 1 / Iteration 2 results and supports both a keyboard-accessible slider and stage buttons. Interaction patterns are informed by [Long-WAM](https://aaron-weihuang.com/Long-WAM-Page/#efficiency); the page keeps MobiAgent's own colors, content, figures, and media.

The page includes a floating capsule navigation with a BibTeX shortcut, three large result highlights, and two role pipelines: Planner → Executor → Critic and Curator → Generator → Trainer. Three independently playable clips show pouring, bottle disposal, and the reflection/replanning framework walkthrough. The third clip explains recovery logic; it is not footage of a failure-recovery experiment. Clips are cut from the original video at approximately 01:12–01:38, 01:38–02:03, and 00:49–01:02, respectively. The 4K files retain the original compressed video stream; 1080p H.264 versions (CRF 17) support browsers without HEVC playback. The source robot footage is already sped up 3×. Starting a research video pauses the others and the hero animation.

The Checkpoint button links to `https://huggingface.co/Liukaikai/MobiAgent`; access follows that repository's permissions. The Code button remains disabled until the authors provide the research code URL. Author names link to the supplied OpenReview profiles, without home emojis. The website acknowledgment section has been removed; the paper PDF is unchanged. No open-source license for research assets or code has been assumed. Before publishing, confirm the repository URL, publication metadata, permissions, and preferred license; remove the noindex meta tag when the page should be searchable.

## Repository status

The footer BibTeX section includes a one-click copy button. Its arXiv ID `2609.00000` and `cs.RO` category are placeholders; update the visible link and BibTeX metadata when the official record is available. The Paper button continues to open the supplied PDF.

This repository is private. GitHub Pages is not enabled, and there is no deployment workflow. The original 4K demo and the 4K task clips are stored using Git LFS. Run `git lfs pull` after cloning. Public deployment and the research code link will be configured separately when the authors are ready.

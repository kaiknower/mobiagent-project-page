const video = document.querySelector('#demo-video');
const researchVideos = [...document.querySelectorAll('#demo-video, .task-video')];
researchVideos.forEach(player => player.addEventListener('play', () => {
  researchVideos.forEach(other => { if (other !== player) other.pause(); });
  document.querySelector('#hero-video').pause();
}));
const chapterButtons = [...document.querySelectorAll('[data-time]')];
chapterButtons.forEach(button => button.addEventListener('click', async () => {
  video.currentTime = Number(button.dataset.time);
  video.scrollIntoView({ block: 'center', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  try { await video.play(); document.querySelector('.video-status').textContent = ''; }
  catch { document.querySelector('.video-status').textContent = 'Press play to watch this chapter.'; }
}));
video.addEventListener('timeupdate', () => {
 const active = chapterButtons.findLast(b => video.currentTime >= Number(b.dataset.time));
 chapterButtons.forEach(b => { b.classList.toggle('active', b === active); if(b === active) b.setAttribute('aria-current','true'); else b.removeAttribute('aria-current'); });
});
const hero = document.querySelector('#hero-video');
const motion = document.querySelector('.motion-toggle');
function syncMotion(){ motion.textContent = hero.paused ? '▷' : 'Ⅱ'; motion.setAttribute('aria-label',hero.paused ? 'Play preview animation' : 'Pause preview animation'); }
motion.addEventListener('click',()=>{ if(hero.paused) hero.play().catch(()=>{}); else hero.pause(); });
hero.addEventListener('play',syncMotion);hero.addEventListener('pause',syncMotion);
if(matchMedia('(prefers-reduced-motion: reduce)').matches){hero.autoplay=false;hero.pause();syncMotion();}
const scores = [[40,50,20,20],[40,60,30,30],[50,60,70,50]];
const means = ['32.5','40.0','57.5'];
const names = ['Paper disposal','Bottle disposal','Can disposal','Pour blue'];
const rounds = ['Bootstrap','Iteration 1','Iteration 2'];
const roundSlider = document.querySelector('#round-slider');
const stagePaths = ['M20 71', 'M20 71L150 56', 'M20 71L150 56L280 21'];
function setRound(index){
 document.querySelectorAll('[data-round]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.round)===index)));
 roundSlider.value = index;
 roundSlider.setAttribute('aria-valuetext', `${rounds[index]}, mean success rate ${means[index]} percent`);
 document.querySelector('#round-name').textContent = rounds[index];
 document.querySelector('#round-score').innerHTML = means[index]+'<span>%</span>';
 document.querySelector('#round-gain').textContent = index===0 ? 'Initial skill policies' : '+'+(Number(means[index])-32.5).toFixed(1)+' points from bootstrap';
 document.querySelector('#evolution-progress').setAttribute('d', stagePaths[index]);
 document.querySelectorAll('[data-stage-point]').forEach(point => point.classList.toggle('selected', Number(point.dataset.stagePoint) === index));
 document.querySelectorAll('.task-bar').forEach((bar, i) => {
   bar.querySelector('.bar-track div').style.width = scores[index][i] + '%';
   bar.querySelector('strong').textContent = scores[index][i] + '%';
 });
 document.querySelector('#round-announcement').textContent = `${rounds[index]}: mean success ${means[index]} percent. ` + scores[index].map((score, i) => `${names[i]} ${score} percent`).join(', ') + '.';
}
document.querySelectorAll('[data-round]').forEach(b=>b.addEventListener('click',()=>setRound(Number(b.dataset.round))));
roundSlider.addEventListener('input', () => setRound(Number(roundSlider.value)));
setRound(2);

const dialog=document.querySelector('#figure-dialog');
document.querySelectorAll('[data-image]').forEach(button=>button.addEventListener('click',()=>{document.querySelector('#expanded-image').src=button.dataset.image;document.querySelector('#expanded-image').alt=button.querySelector('img').alt;document.querySelector('#figure-title').textContent=button.dataset.title;dialog.showModal();}));
document.querySelector('#close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});

const copyCitation = document.querySelector('#copy-citation');
copyCitation.addEventListener('click', async () => {
  const status = document.querySelector('#citation-status');
  try {
    await navigator.clipboard.writeText(document.querySelector('#citation-text').textContent.trim());
    copyCitation.querySelector('span').textContent = 'Copied!';
    status.textContent = 'BibTeX copied. The arXiv ID is a placeholder.';
  } catch {
    status.textContent = 'Select the BibTeX text above and copy it manually.';
  }
});

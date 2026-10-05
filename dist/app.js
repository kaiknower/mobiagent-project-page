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
    status.textContent = 'BibTeX copied.';
  } catch {
    status.textContent = 'Select the BibTeX text above and copy it manually.';
  }
});

const skillRoutes = {
  move: { name: 'Move to', instruction: 'Move to the trash bin.', explanation: 'The navigation expert moves the robot toward the next interaction location, using the shared visual-language features.' },
  pick: { name: 'Pick up', instruction: 'Pick up the soda can.', explanation: 'The picking expert handles grasping; the same expert can be reused for different objects and long-horizon tasks.' },
  'place-in': { name: 'Place in', instruction: 'Place the can in the trash bin.', explanation: 'The container-placement expert controls putting a held object inside a destination such as a bin or box.' },
  'place-on': { name: 'Place on', instruction: 'Place the object on the table.', explanation: 'Surface placement has its own expert, separating the motion of placing an object on a support from placing it inside a container.' },
  open: { name: 'Open', instruction: 'Open the cabinet door.', explanation: 'The opening expert handles articulated-object interaction while sharing perception and language understanding with the other skills.' },
  close: { name: 'Close', instruction: 'Close the cabinet door.', explanation: 'The closing expert produces the corresponding control actions; the instruction and observation select the route through the shared backbone.' },
};
document.querySelectorAll('[data-skill]').forEach(button => button.addEventListener('click', () => {
  const route = skillRoutes[button.dataset.skill];
  document.querySelectorAll('[data-skill]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
  document.querySelector('#routing-expert-name').textContent = route.name;
  document.querySelector('#routing-instruction').textContent = `“${route.instruction}”`;
  document.querySelector('#routing-explanation').textContent = route.explanation;
}));

const ablationViews = {
  mean: { rates: [20, 50, 10, 40, 65], label: 'Component ablations, mean success rate across four BEHAVIOR-1K tasks', comparison: 'Global replanning adds 25.0 percentage points to mean success: 40.0% → 65.0%.' },
  trash: { rates: [0, 40, 10, 40, 60], label: 'Component ablations, success rate on the BEHAVIOR-1K dispose-trash task', comparison: 'On dispose-trash, global replanning adds 20.0 percentage points: 40.0% → 60.0%.' },
};
document.querySelectorAll('[data-ablation]').forEach(button => button.addEventListener('click', () => {
  const view = ablationViews[button.dataset.ablation];
  document.querySelectorAll('[data-ablation]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
  document.querySelector('#ablation-chart').setAttribute('aria-label', view.label);
  document.querySelectorAll('[data-ablation-row]').forEach((row, index) => {
    row.querySelector('.ablation-track>div').style.width = `${view.rates[index]}%`;
    row.querySelector('strong').textContent = `${view.rates[index].toFixed(1)}%`;
  });
  document.querySelector('#ablation-comparison').textContent = view.comparison;
}));

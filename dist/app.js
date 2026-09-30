const video = document.querySelector('#demo-video');
const chapterButtons = [...document.querySelectorAll('[data-time]')];
chapterButtons.forEach(button => button.addEventListener('click', async () => {
  video.currentTime = Number(button.dataset.time);
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
function setRound(index){
 document.querySelectorAll('[data-round]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.round)===index)));
 document.querySelector('#round-score').innerHTML = means[index]+'<span>%</span>';
 document.querySelector('#round-gain').textContent = index===0 ? 'Initial skill policies' : '+'+(Number(means[index])-32.5).toFixed(1)+' points from bootstrap';
 document.querySelector('#task-bars').innerHTML = scores[index].map((n,i)=>`<div class="task-bar"><span>${names[i]}</span><div class="bar-track" aria-hidden="true"><div style="width:${n}%"></div></div><strong>${n}%</strong></div>`).join('');
}
document.querySelectorAll('[data-round]').forEach(b=>b.addEventListener('click',()=>setRound(Number(b.dataset.round))));setRound(2);
const dialog=document.querySelector('#figure-dialog');
document.querySelectorAll('[data-image]').forEach(button=>button.addEventListener('click',()=>{document.querySelector('#expanded-image').src=button.dataset.image;document.querySelector('#expanded-image').alt=button.querySelector('img').alt;document.querySelector('#figure-title').textContent=button.dataset.title;dialog.showModal();}));
document.querySelector('#close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});

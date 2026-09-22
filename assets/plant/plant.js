import {plant,fruit,soil} from './sprites.js?v=2';
const button=document.querySelector('.garden');
const canvas=button?.querySelector('canvas');
if(canvas){
 const ctx=canvas.getContext('2d');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let progress=0,phase='grow',time=0,last=0,boost=0,wind=0,nextWind=2+Math.random()*4,positions=[],visible=true,raf=0;
 let base=174;
 const landing=274;
 function interact(){if(phase==='grow'){progress=Math.min(1,progress+.16);boost=2.5}else if(phase==='ripe')time=Math.max(time,1.3);draw()}
 button.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')interact()});
 button.addEventListener('click',interact);
 function draw(){
  button.dataset.rootY=String(base);button.dataset.phase=phase;button.dataset.growth=progress.toFixed(2);
  ctx.clearRect(0,0,160,300);ctx.imageSmoothingEnabled=false;
  const breeze=reduced.matches?0:Math.sin(wind*5)*Math.sin(Math.min(wind/2.2,1)*Math.PI);
  if(phase==='grow'||phase==='ripe'){
   soil(ctx,base);positions=plant(ctx,progress,base,breeze);
   if(phase==='ripe')positions.forEach(p=>fruit(ctx,p.x,p.y));
  }else if(phase==='fall'){
   ctx.save();ctx.globalAlpha=Math.max(0,1-time/2.8);soil(ctx,base);plant(ctx,1,base,0);ctx.restore();
   positions.forEach((p,i)=>{const t=Math.max(0,time-i*.13),dest=i===2?landing:base+6;const y=Math.min(dest,p.y+t*t*95);const x=p.x+(i===0?-1:i===1?1:0)*Math.min(t,1)*20;ctx.save();ctx.globalAlpha=i===2?1:Math.max(0,1-Math.max(0,t-1)*2);fruit(ctx,x,y);ctx.restore()});soil(ctx,landing,Math.min(1,time));
  }else{
   const newBase=landing;
   soil(ctx,newBase);plant(ctx,.02,newBase,0);
   ctx.save();ctx.globalAlpha=1-Math.min(time*2,1);fruit(ctx,81,newBase-5);ctx.restore();
  }
 }
 function frame(now){
  const dt=last?Math.min((now-last)/1000,.05):0;last=now;time+=dt;
  if(phase==='grow'){
   // Idle growth is deliberately slow; repeated visits and taps nurture it.
   progress=Math.min(1,progress+dt*(boost>0?.10:reduced.matches?0:.009));boost=Math.max(0,boost-dt);
   nextWind-=dt;if(nextWind<=0){wind+=dt;if(wind>2.2){wind=0;nextWind=3+Math.random()*6}}
   if(progress>=1){phase='ripe';time=0}
  }else if(phase==='ripe'&&time>2){phase='fall';time=0}
  else if(phase==='fall'&&time>3.1){phase='seed';time=0;base=landing}
  else if(phase==='seed'&&time>2.1){phase='grow';time=0;progress=.02;boost=0}
  draw();if(visible&&!document.hidden)raf=requestAnimationFrame(frame);
 }
 function resume(){cancelAnimationFrame(raf);last=0;if(visible&&!document.hidden)raf=requestAnimationFrame(frame)}
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;resume()}).observe(button);
 document.addEventListener('visibilitychange',resume);
 draw();
}

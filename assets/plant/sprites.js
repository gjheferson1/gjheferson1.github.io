// Original pixel sprites: one character equals one pixel, drawn at 2× scale.
const palette={o:'#18392a',s:'#357746',g:'#62a94c',l:'#a4d86a',h:'#d8ef99',r:'#d34e62',p:'#ff8c87',d:'#822f48',y:'#ffe4a1'};
const leaf=['    oo    ','  oogloo  ',' ogglllho ','ogggllloo ',' ogggsoo  ','  ooso    ','   o      '];
const berry=['   gg   ','  gsg   ','  orro  ',' orppro ','orrprrdo','orrrrddo',' oddddo ','  oooo  '];
const bud=['  y  ',' ypy ','ypppy',' ypy ','  s  '];
function sprite(ctx,rows,x,y,flip=false){ctx.save();ctx.translate(Math.round(x),Math.round(y));ctx.scale(flip?-2:2,2);rows.forEach((row,j)=>[...row].forEach((v,i)=>{if(palette[v]){ctx.fillStyle=palette[v];ctx.fillRect(i,j,1,1)}}));ctx.restore()}
export function fruit(ctx,x,y){sprite(ctx,berry,x-8,y-8)}
export function soil(ctx,y,alpha=1){ctx.save();ctx.globalAlpha*=alpha;ctx.fillStyle='#26372a';ctx.fillRect(56,y+2,48,2);ctx.fillStyle='#526642';ctx.fillRect(67,y,27,2);ctx.fillStyle='#8b9d55';ctx.fillRect(77,y-2,8,2);ctx.restore()}
export function plant(ctx,progress,base,sway=0){
 const height=12+Math.min(progress,1)*128,tip=base-height;
 ctx.fillStyle='#274e32';ctx.fillRect(78,Math.round(tip),4,Math.round(height));ctx.fillStyle='#7eac54';ctx.fillRect(80,Math.round(tip),2,Math.round(height));
 const count=2+Math.floor(Math.min(progress,1)*6);
 for(let i=0;i<count;i++){const side=i%2===0?-1:1,y=base-10-i*(height-15)/Math.max(count-1,1),dx=Math.round(Math.sin(i*.9+sway)*2);ctx.fillStyle='#4d8f47';ctx.fillRect(side<0?68:80,Math.round(y),14,2);sprite(ctx,leaf,80+side*7+dx,y-10,side<0)}
 if(progress>.65&&progress<1){[-1,0,1].forEach((v,i)=>sprite(ctx,bud,76+v*27,tip+8+i%2*25))}
 return [{x:53,y:tip+34},{x:105,y:tip+51},{x:81,y:tip+8}];
}

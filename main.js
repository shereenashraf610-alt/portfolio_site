const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
$('#year').textContent=new Date().getFullYear();
// theme
const root=document.documentElement,tb=$('#theme');
function setTheme(t){root.dataset.theme=t;tb.textContent=t==='dark'?'🌙':'☀️';$('meta[name=theme-color]').content=t==='dark'?'#07091a':'#f6f7ff';try{localStorage.setItem('th',t)}catch(e){}}
let saved=null;try{saved=localStorage.getItem('th')}catch(e){}setTheme(saved||'dark');
tb.onclick=()=>setTheme(root.dataset.theme==='dark'?'light':'dark');
// menu
const links=$('#links');$('#burger').onclick=()=>links.classList.toggle('open');links.onclick=e=>e.target.tagName==='A'&&links.classList.remove('open');
// marquee
const tools=['Python','Pandas','scikit-learn','SQL','Power BI','Excel','HTML','CSS','JavaScript','PHP','APIs','Dashboards'];
$('#track').innerHTML=[...tools,...tools].map(t=>`<span>${t} ✦</span>`).join('');
// typing
const roles=['Web Developer','Data Analyst','Dashboard Designer','Problem Solver'];let ri=0,ci=0,del=false;
(function type(){const w=roles[ri];$('#typed').textContent=w.slice(0,ci);
if(!del&&ci===w.length){del=true;return setTimeout(type,1400)}
if(del&&ci===0){del=false;ri=(ri+1)%roles.length}ci+=del?-1:1;setTimeout(type,del?40:85)})();
// reveal + counters
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;e.target.classList.add('show');io.unobserve(e.target);
e.target.querySelectorAll('[data-n]').forEach(c=>{const n=+c.dataset.n;let i=0;const t=setInterval(()=>{c.textContent=++i;if(i>=n)clearInterval(t)},n>5?110:260)})}),{threshold:.12});
$$('.rv').forEach((el,i)=>{el.style.transitionDelay=(i%3)*90+'ms';io.observe(el)});
// scroll
const bar=$('#bar'),topb=$('#top'),secs=$$('main section[id]'),navs=$$('.links a');
addEventListener('scroll',()=>{const h=document.documentElement;bar.style.width=scrollY/(h.scrollHeight-innerHeight)*100+'%';topb.classList.toggle('v',scrollY>600);
let cur='';secs.forEach(s=>{if(scrollY>=s.offsetTop-160)cur=s.id});navs.forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+cur))},{passive:true});
topb.onclick=()=>scrollTo({top:0,behavior:'smooth'});
// pointer effects
if(matchMedia('(pointer:fine)').matches){const g=$('#glow');addEventListener('mousemove',e=>{g.style.left=e.clientX+'px';g.style.top=e.clientY+'px'});
$$('.card').forEach(c=>c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect();c.style.setProperty('--mx',e.clientX-r.left+'px');c.style.setProperty('--my',e.clientY-r.top+'px')}));
$$('.photo,.tilt').forEach(el=>{el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(800px) rotateY(${x*9}deg) rotateX(${-y*9}deg)`});el.addEventListener('mouseleave',()=>el.style.transform='')})}
// project galleries: browser-style frame, thumbnails swap the main image
$$('.gal').forEach(g=>{const pm=g.querySelector('.pm'),main=g.querySelector('.zoom');
const ch=document.createElement('div');ch.className='chrome';ch.innerHTML='<i></i><i></i><i></i><span></span>';pm.prepend(ch);
const cap=ch.querySelector('span'),ths=[...g.querySelectorAll('.th')];cap.textContent=main.alt;
ths.forEach(b=>b.onclick=()=>{main.src=b.dataset.src;main.alt=b.dataset.alt;cap.textContent=b.dataset.alt;ths.forEach(x=>x.classList.toggle('on',x===b))})});
// lightbox with prev / next
const lb=$('#lb'),lbi=lb.querySelector('img'),lbc=lb.querySelector('.lbc'),pv=lb.querySelector('.prev'),nx=lb.querySelector('.next');
let set=[],idx=0;
function show(){const it=set[idx];lbi.src=it.src;lbi.alt=it.alt;lbc.textContent=it.alt+(set.length>1?'  ·  '+(idx+1)+' / '+set.length:'');pv.classList.toggle('off',set.length<2);nx.classList.toggle('off',set.length<2)}
function step(d){if(set.length<2)return;idx=(idx+d+set.length)%set.length;show()}
$$('.zoom').forEach(img=>img.onclick=()=>{const g=img.closest('.gal');
set=g?[...g.querySelectorAll('.th')].map(b=>({src:b.dataset.src,alt:b.dataset.alt})):[{src:img.src,alt:img.alt}];
idx=Math.max(0,set.findIndex(x=>x.src===img.getAttribute('src')||x.src===img.src));show();lb.classList.add('open')});
pv.onclick=e=>{e.stopPropagation();step(-1)};nx.onclick=e=>{e.stopPropagation();step(1)};
lb.onclick=()=>lb.classList.remove('open');
addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;if(e.key==='Escape')lb.classList.remove('open');if(e.key==='ArrowLeft')step(-1);if(e.key==='ArrowRight')step(1)});
// copy email
$('#copy').onclick=async()=>{const m=$('#mail'),t=m.textContent;try{await navigator.clipboard.writeText(t);m.textContent='Copied ✓';setTimeout(()=>m.textContent=t,1600)}catch(e){location.href='mailto:'+t}};

// second marquee
const soft=['Data storytelling','Dashboards','Responsive design','EDA','Predictive modeling','UI design','Problem solving','KPI reporting'];
$('#track2').innerHTML=[...soft,...soft].map(t=>`<span>${t} ✦</span>`).join('');
// project filters + alternating layout
function layout(){let k=0;$$('.proj').forEach(p=>{if(p.classList.contains('hide'))return;p.classList.toggle('flip',k%2===1);k++})}
layout();
$$('.fbtn').forEach(b=>b.onclick=()=>{$$('.fbtn').forEach(x=>x.classList.toggle('on',x===b));
$$('.proj').forEach(p=>{const h=b.dataset.f!=='all'&&p.dataset.cat!==b.dataset.f;p.classList.toggle('hide',h);if(!h)p.classList.add('show')});layout()});
// side dots
const dn=document.createElement('nav');dn.className='dots';dn.setAttribute('aria-label','Sections');
[['home','Home'],['about','About'],['services','Services'],['skills','Skills'],['projects','Projects'],['education','Education'],['contact','Contact']].forEach(([id,t])=>{const a=document.createElement('a');a.href='#'+id;a.dataset.t=t;a.setAttribute('aria-label',t);dn.appendChild(a)});
document.body.appendChild(dn);
const dsecs=['home','about','services','skills','projects','education','contact'].map(id=>document.getElementById(id));
function dotUpdate(){let cur=0;dsecs.forEach((s,i)=>{if(s&&scrollY>=s.offsetTop-220)cur=i});dn.querySelectorAll('a').forEach((a,i)=>a.classList.toggle('on',i===cur))}
addEventListener('scroll',dotUpdate,{passive:true});dotUpdate();
// cursor ring + magnetic buttons (desktop only)
if(matchMedia('(pointer:fine)').matches){const c=document.createElement('div');c.id='cur';document.body.appendChild(c);let x=0,y=0,cx=0,cy=0;
addEventListener('mousemove',e=>{x=e.clientX;y=e.clientY;c.classList.add('on')});
(function loop(){cx+=(x-cx)*.18;cy+=(y-cy)*.18;c.style.left=cx+'px';c.style.top=cy+'px';requestAnimationFrame(loop)})();
document.addEventListener('mouseover',e=>c.classList.toggle('big',!!e.target.closest('a,button,.chip,.zoom,input,textarea')));
$$('.hero .btn').forEach(b=>{b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.2}px,${(e.clientY-r.top-r.height/2)*.3}px)`});b.addEventListener('mouseleave',()=>b.style.transform='')})}
// contact form -> sent to my inbox (FormSubmit), mail app as fallback
const MAIL='shereenashraf610@gmail.com';
$('#cform').onsubmit=async e=>{e.preventDefault();const f=e.target,btn=f.querySelector('button'),st=$('#fstat');
if(f._honey.value)return;
const n=f.name.value.trim(),m=f.email.value.trim(),t=f.msg.value.trim();
btn.disabled=true;btn.textContent='Sending…';
try{const r=await fetch('https://formsubmit.co/ajax/'+MAIL,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},
body:JSON.stringify({name:n,email:m,message:t,_subject:'New portfolio message from '+n,_replyto:m,_template:'table',_captcha:'false'})});
const d=await r.json();if(!r.ok||d.success==='false'||d.success===false)throw 0;
st.textContent='Thank you, '+n+'! Your message was sent.';f.reset()}
catch(err){st.textContent='Could not send it directly, opening your email app instead…';
location.href='mailto:'+MAIL+'?subject='+encodeURIComponent('Portfolio message from '+n)+'&body='+encodeURIComponent(t+'\n\n— '+n+' ('+m+')')}
btn.disabled=false;btn.textContent='Send message ↗'};
// notebook viewer
const nbm=$('#nb'),nbf=$('#nbf');
$$('[data-nb]').forEach(b=>b.onclick=()=>{if(window.NB_B64){if(!nbf.srcdoc){const bin=atob(window.NB_B64);nbf.srcdoc=new TextDecoder().decode(Uint8Array.from(bin,ch=>ch.charCodeAt(0)))}}else if(!nbf.getAttribute('src'))nbf.src=nbf.dataset.src;nbm.classList.add('open')});
$('#nbx').onclick=()=>nbm.classList.remove('open');
addEventListener('keydown',e=>{if(e.key==='Escape')nbm.classList.remove('open')});

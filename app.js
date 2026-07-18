(() => {
  const root = document.getElementById('root');
  const tones = {
    violet: ['#7c3aed','#a78bfa','rgba(124,58,237,.26)'],
    blue: ['#0284c7','#38bdf8','rgba(2,132,199,.25)'],
    green: ['#059669','#34d399','rgba(5,150,105,.25)'],
    amber: ['#d97706','#fbbf24','rgba(217,119,6,.25)']
  };
  const modes = [
    {id:1,title:'استخراج نسبة',hint:'كم يساوي 15% من 500؟',icon:'%',tone:'violet',a:'النسبة',au:'%',b:'المبلغ'},
    {id:2,title:'كم نسبته؟',hint:'75 من 300 تساوي كم؟',icon:'÷',tone:'blue',a:'الرقم',b:'من أصل'},
    {id:3,title:'زيادة بنسبة',hint:'أضف 10% على 5000',icon:'+',tone:'green',a:'نسبة الزيادة',au:'%',b:'المبلغ الأصلي'},
    {id:4,title:'خصم بنسبة',hint:'اخصم 20% من 800',icon:'−',tone:'amber',a:'نسبة الخصم',au:'%',b:'السعر الأصلي'}
  ];
  let state = { tab:'percent', mode:1, a:'', b:'', result:null, total:'', partners:[{id:1,name:'الشريك الأول',pct:''},{id:2,name:'الشريك الثاني',pct:''}], split:null };
  const fmt = n => Number(n).toLocaleString('en-US',{maximumFractionDigits:2});
  const uid = () => Date.now()+Math.random();

  const css = `
  .app{width:min(100%,980px);padding:20px}.shell{display:grid;grid-template-columns:320px 1fr;gap:18px;align-items:start}
  .brand,.panel,.side{background:linear-gradient(180deg,rgba(255,255,255,.065),rgba(255,255,255,.025));border:1px solid rgba(255,255,255,.09);box-shadow:0 24px 80px rgba(0,0,0,.35);backdrop-filter:blur(22px);-webkit-backdrop-filter:blur(22px)}
  .side{border-radius:30px;padding:22px;position:sticky;top:20px}.logo{width:54px;height:54px;border-radius:18px;display:grid;place-items:center;font-weight:900;font-size:25px;background:linear-gradient(135deg,#7c3aed,#38bdf8);box-shadow:0 14px 35px rgba(124,58,237,.35)}
  .brand-title{font-size:23px;font-weight:900;margin-top:16px}.brand-sub{font-size:12px;line-height:1.9;color:rgba(255,255,255,.45);margin-top:5px}
  .tabs{display:grid;gap:9px;margin-top:24px}.tab{border:1px solid transparent;background:rgba(255,255,255,.035);color:rgba(255,255,255,.55);padding:13px 14px;border-radius:16px;text-align:right;cursor:pointer;font-weight:800;display:flex;justify-content:space-between;align-items:center}.tab.active{color:#fff;border-color:rgba(167,139,250,.34);background:linear-gradient(135deg,rgba(124,58,237,.22),rgba(56,189,248,.08));box-shadow:0 12px 30px rgba(124,58,237,.14)}
  .side-note{margin-top:20px;padding:13px;border-radius:16px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);font-size:11px;line-height:1.8;color:rgba(255,255,255,.35)}
  .panel{border-radius:30px;padding:24px;min-height:620px}.head{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;margin-bottom:22px}.eyebrow{font-size:11px;font-weight:800;color:#a78bfa}.title{font-size:28px;font-weight:900;margin-top:3px}.desc{font-size:12px;color:rgba(255,255,255,.42);margin-top:5px}.badge{padding:8px 12px;border-radius:999px;background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.08);font-size:11px;color:rgba(255,255,255,.48)}
  .modes{display:grid;grid-template-columns:repeat(4,1fr);gap:9px;margin-bottom:18px}.mode{padding:13px 10px;border-radius:18px;border:1px solid rgba(255,255,255,.07);background:rgba(255,255,255,.025);color:rgba(255,255,255,.4);cursor:pointer;text-align:center}.mode.active{color:#fff;border-color:var(--line);background:linear-gradient(180deg,var(--wash),rgba(255,255,255,.02));box-shadow:0 12px 26px var(--glow)}.mode i{width:34px;height:34px;border-radius:11px;display:grid;place-items:center;margin:0 auto 8px;font-style:normal;font-weight:900;background:rgba(255,255,255,.06)}.mode.active i{background:linear-gradient(135deg,var(--main),var(--light));box-shadow:0 8px 20px var(--glow)}.mode span{font-size:11px;font-weight:800}
  .card{background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.07);border-radius:24px;padding:18px}.grid2{display:grid;grid-template-columns:1fr 1fr;gap:14px}.field label{display:flex;justify-content:space-between;color:rgba(255,255,255,.48);font-size:12px;font-weight:800;margin-bottom:7px}.unit{font-size:10px;color:var(--light);background:var(--wash);padding:2px 8px;border-radius:99px}.input{width:100%;border:1px solid rgba(255,255,255,.09);background:rgba(255,255,255,.045);color:#fff;border-radius:16px;padding:14px 15px;font:800 22px Cairo;text-align:right;outline:none}.input:focus{border-color:var(--light);box-shadow:0 0 0 4px var(--wash);background:rgba(255,255,255,.06)}
  .primary{width:100%;border:0;border-radius:16px;padding:14px;margin-top:15px;background:linear-gradient(135deg,var(--main),var(--light));color:#fff;font:900 16px Cairo;cursor:pointer;box-shadow:0 14px 32px var(--glow)}.primary:active{transform:scale(.985)}
  .result{margin-top:16px;padding:22px;border-radius:22px;text-align:center;background:linear-gradient(145deg,var(--wash),rgba(255,255,255,.02));border:1px solid var(--line);animation:pop .3s ease}.result small{color:rgba(255,255,255,.44);font-weight:800}.result strong{display:block;font-size:54px;line-height:1.2;color:var(--light);margin-top:5px}.result .detail{font-size:12px;color:rgba(255,255,255,.55);margin-top:8px}.copy{margin-top:13px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.04);color:rgba(255,255,255,.55);border-radius:10px;padding:7px 13px;font:700 11px Cairo;cursor:pointer}
  .profit-top{display:grid;grid-template-columns:1fr auto;gap:12px;align-items:end}.add{border:1px solid rgba(255,255,255,.09);background:rgba(255,255,255,.045);color:#fff;border-radius:14px;padding:13px 16px;font:800 12px Cairo;cursor:pointer}.partner{display:grid;grid-template-columns:1.2fr .7fr auto;gap:10px;align-items:center;margin-top:10px}.partner .input{font-size:15px;padding:12px}.remove{width:40px;height:40px;border-radius:12px;border:1px solid rgba(248,113,113,.2);background:rgba(239,68,68,.08);color:#fca5a5;cursor:pointer}.meter{height:8px;border-radius:99px;background:rgba(255,255,255,.06);overflow:hidden;margin:17px 0 7px}.meter b{display:block;height:100%;border-radius:inherit;background:linear-gradient(90deg,#7c3aed,#38bdf8);transition:.25s}.meter-row{display:flex;justify-content:space-between;font-size:11px;color:rgba(255,255,255,.42)}.split-list{display:grid;gap:9px;margin-top:16px}.split-item{display:flex;justify-content:space-between;align-items:center;padding:13px 14px;border-radius:15px;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.07)}.split-item span{font-size:12px;color:rgba(255,255,255,.62)}.split-item strong{color:#a78bfa}
  .empty{padding:55px 20px;text-align:center;color:rgba(255,255,255,.25);font-size:12px}.foot{text-align:center;margin-top:18px;color:rgba(255,255,255,.22);font-size:10px}
  @keyframes pop{from{opacity:0;transform:translateY(8px) scale(.98)}to{opacity:1;transform:none}}
  @media(max-width:800px){.app{padding:12px}.shell{grid-template-columns:1fr}.side{position:static;border-radius:24px;padding:16px}.brand-title,.brand-sub,.side-note{display:none}.side .logo{width:43px;height:43px;border-radius:14px;margin:auto}.tabs{grid-template-columns:1fr 1fr;margin-top:14px}.tab{justify-content:center;text-align:center}.panel{border-radius:24px;padding:17px;min-height:0}.modes{grid-template-columns:1fr 1fr}.head{margin-bottom:16px}.title{font-size:23px}.grid2{grid-template-columns:1fr}.profit-top{grid-template-columns:1fr}.partner{grid-template-columns:1fr .65fr auto}}
  `;
  const style = document.createElement('style'); style.textContent = css; document.head.appendChild(style);

  function render(){
    const m = modes.find(x=>x.id===state.mode), t = tones[m.tone];
    document.documentElement.style.setProperty('--main',t[0]);
    document.documentElement.style.setProperty('--light',t[1]);
    document.documentElement.style.setProperty('--glow',t[2]);
    document.documentElement.style.setProperty('--wash',t[2].replace('.25','.14').replace('.26','.14'));
    document.documentElement.style.setProperty('--line',t[2].replace('.25','.38').replace('.26','.38'));
    root.innerHTML = `<main class="app"><div class="shell">
      <aside class="side"><div class="logo">%</div><div class="brand-title">الحاسبة الذكية</div><div class="brand-sub">أداة عربية سريعة لحساب النسب وتوزيع الأرباح بدقة.</div>
        <div class="tabs"><button class="tab ${state.tab==='percent'?'active':''}" data-tab="percent">حساب النسب <span>٪</span></button><button class="tab ${state.tab==='profit'?'active':''}" data-tab="profit">توزيع الأرباح <span>↗</span></button></div>
        <div class="side-note">جميع العمليات تتم داخل جهازك. لا يتم إرسال أو حفظ أي أرقام.</div></aside>
      <section class="panel">${state.tab==='percent'?percentView(m):profitView()}<div class="foot">مصممة لتكون سريعة وواضحة على الجوال والكمبيوتر</div></section>
    </div></main>`;
    bind();
  }

  function percentView(m){
    return `<div class="head"><div><div class="eyebrow">حاسبة النسبة المئوية</div><div class="title">احسبها بثوانٍ</div><div class="desc">اختر نوع العملية ثم أدخل القيم.</div></div><div class="badge">${m.hint}</div></div>
    <div class="modes">${modes.map(x=>{const c=tones[x.tone];return `<button class="mode ${x.id===state.mode?'active':''}" data-mode="${x.id}" style="--main:${c[0]};--light:${c[1]};--glow:${c[2]};--wash:${c[2].replace('.25','.13').replace('.26','.13')};--line:${c[2].replace('.25','.35').replace('.26','.35')}"><i>${x.icon}</i><span>${x.title}</span></button>`}).join('')}</div>
    <div class="card"><div class="grid2"><div class="field"><label>${m.a}${m.au?`<em class="unit">${m.au}</em>`:''}</label><input id="a" class="input" type="number" inputmode="decimal" value="${state.a}" placeholder="0"></div><div class="field"><label>${m.b}</label><input id="b" class="input" type="number" inputmode="decimal" value="${state.b}" placeholder="0"></div></div><button id="calc" class="primary">احسب الآن</button>${state.result?resultView():''}</div>`;
  }
  function resultView(){ const r=state.result; return `<div class="result"><small>${r.label}</small><strong>${r.value}${r.unit||''}</strong>${r.detail?`<div class="detail">${r.detail}</div>`:''}<button class="copy" id="copy">نسخ النتيجة</button></div>` }
  function profitView(){
    const sum=state.partners.reduce((s,p)=>s+(parseFloat(p.pct)||0),0), valid=Math.abs(sum-100)<.01;
    return `<div class="head"><div><div class="eyebrow">توزيع الأرباح</div><div class="title">قسّم المبلغ بوضوح</div><div class="desc">أدخل الإجمالي ونسبة كل شريك، ويجب أن يساوي المجموع 100%.</div></div><div class="badge">${state.partners.length} شركاء</div></div>
    <div class="card"><div class="profit-top"><div class="field"><label>إجمالي الأرباح</label><input id="total" class="input" type="number" inputmode="decimal" value="${state.total}" placeholder="100,000"></div><button id="add" class="add">+ إضافة شريك</button></div>
    <div id="partners">${state.partners.map((p,i)=>`<div class="partner" data-id="${p.id}"><input class="input pname" value="${p.name}" aria-label="اسم الشريك"><input class="input ppct" type="number" inputmode="decimal" value="${p.pct}" placeholder="النسبة %"><button class="remove" ${state.partners.length<=2?'disabled':''}>×</button></div>`).join('')}</div>
    <div class="meter"><b style="width:${Math.min(sum,100)}%"></b></div><div class="meter-row"><span>المجموع: ${fmt(sum)}%</span><span>${valid?'جاهز للحساب':sum<100?`متبقي ${fmt(100-sum)}%`:`تجاوزت 100%`}</span></div>
    <button id="split" class="primary" ${valid?'':'style="filter:saturate(.35);opacity:.55"'}>وزّع الأرباح</button>${state.split?splitView():''}</div>`;
  }
  function splitView(){return `<div class="split-list">${state.split.map(x=>`<div class="split-item"><span>${x.name} · ${fmt(x.pct)}%</span><strong>${fmt(x.amount)}</strong></div>`).join('')}</div>`}

  function bind(){
    document.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{state.tab=b.dataset.tab;render()});
    document.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>{state.mode=+b.dataset.mode;state.a='';state.b='';state.result=null;render()});
    const a=document.getElementById('a'),b=document.getElementById('b');
    if(a){a.oninput=e=>state.a=e.target.value;b.oninput=e=>state.b=e.target.value;document.getElementById('calc').onclick=calculate;[a,b].forEach(x=>x.onkeydown=e=>{if(e.key==='Enter')calculate()});}
    const copy=document.getElementById('copy'); if(copy) copy.onclick=()=>{navigator.clipboard.writeText(state.result.value.replace(/,/g,''));copy.textContent='تم النسخ ✓'};
    const total=document.getElementById('total'); if(total){total.oninput=e=>{state.total=e.target.value;state.split=null};document.getElementById('add').onclick=()=>{state.partners.push({id:uid(),name:`الشريك ${state.partners.length+1}`,pct:''});state.split=null;render()};document.querySelectorAll('.partner').forEach(row=>{const id=Number(row.dataset.id),p=state.partners.find(x=>x.id===id);row.querySelector('.pname').oninput=e=>{p.name=e.target.value;state.split=null};row.querySelector('.ppct').oninput=e=>{p.pct=e.target.value;state.split=null;render()};row.querySelector('.remove').onclick=()=>{if(state.partners.length>2){state.partners=state.partners.filter(x=>x.id!==id);state.split=null;render()}}});document.getElementById('split').onclick=splitProfits;}
  }
  function calculate(){
    const a=parseFloat(state.a),b=parseFloat(state.b); if(!Number.isFinite(a)||!Number.isFinite(b)||(state.mode===2&&b===0)) return;
    let r;if(state.mode===1)r={label:'النتيجة',value:fmt(a*b/100)};
    if(state.mode===2)r={label:'النسبة المئوية',value:fmt(a/b*100),unit:'%'};
    if(state.mode===3){const d=a*b/100;r={label:'المبلغ بعد الزيادة',value:fmt(b+d),detail:`قيمة الزيادة: +${fmt(d)}`}}
    if(state.mode===4){const d=a*b/100;r={label:'السعر بعد الخصم',value:fmt(b-d),detail:`قيمة الخصم: −${fmt(d)}`}}
    state.result=r;render();
  }
  function splitProfits(){const total=parseFloat(state.total),sum=state.partners.reduce((s,p)=>s+(parseFloat(p.pct)||0),0);if(!Number.isFinite(total)||total<=0||Math.abs(sum-100)>=.01)return;state.split=state.partners.map(p=>({name:p.name||'شريك',pct:parseFloat(p.pct)||0,amount:total*(parseFloat(p.pct)||0)/100}));render()}
  render();
})();
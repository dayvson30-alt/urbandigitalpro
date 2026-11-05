// node social/tools/build.js  -> escreve social/queue.json, social/cards/*.html e social/preview.html
// Depois: bash social/tools/render.sh  (Chrome headless -> social/img/*.jpg; IG via API só aceita JPEG)
// O workflow n8n escolhe posts[diasDesde(epoch) % posts.length], com a data de hoje em America/New_York.
// Trocar a data de início = editar "epoch" no queue.json, sem mexer no workflow.
const fs = require('fs');
const path = require('path');
const { posts, CTA, TAGS } = require('./posts');

const SITE = 'https://urbandigitalpro.net/social/img/';
const ROOT = path.join(__dirname, '..');
const EPOCH = process.env.EPOCH || '2026-11-06';

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function middle(p) {
  if (p.type === 'phrase') return `<div class="phrase"><span class="lang">EM INGLÊS</span>${esc(p.phrase)}</div><p class="tr"><b>Tradução:</b> ${esc(p.tr)}</p>`;
  if (p.type === 'card') return `<div class="accent">${esc(p.accent)}</div><p>${esc(p.body)}</p>`;
  if (p.type === 'list') return `<div class="box"><ul>${p.items.map(i => `<li><span>✓</span>${esc(i)}</li>`).join('')}</ul></div>`;
  if (p.type === 'steps') return `<div class="box"><ol>${p.items.map((i, n) => `<li><span>${n + 1}</span>${esc(i)}</li>`).join('')}</ol></div>`;
  throw new Error('type desconhecido ' + p.type);
}

const FOOT = '<footer><b>@urbandigitalproducts</b><small>app.urbandigitalpro.net</small></footer>';

function card(p) {
  return `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=Figtree:wght@500;600;700&display=swap" rel="stylesheet"><style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1350px}
body{background:#EDF2F0;font-family:Figtree,Arial,sans-serif;color:#0F2A2E;display:flex;flex-direction:column;padding:100px 90px 0}
body.app{background:#0B7A63;color:#fff}
main{flex:1;display:flex;flex-direction:column;justify-content:center;gap:36px}
.tag{align-self:flex-start;font-weight:700;font-size:28px;letter-spacing:4px;color:#0B7A63;background:#D3ECE4;padding:12px 22px;border-radius:999px}
.app .tag{background:#FFE27A;color:#0F2A2E}
h1{font-family:'Bricolage Grotesque',Arial,sans-serif;font-weight:800;font-size:92px;line-height:1.02;letter-spacing:-1px}
.accent{font-family:'Bricolage Grotesque',Arial,sans-serif;font-weight:800;font-size:96px;line-height:1.02;color:#0B7A63;letter-spacing:-1px}
.app .accent{color:#FFE27A}
p{font-size:42px;line-height:1.38;font-weight:500;color:#56706F}
.app p{color:#D3ECE4}
.phrase{background:#fff;border-radius:32px;padding:48px 52px;font-family:'Bricolage Grotesque',Arial,sans-serif;font-weight:800;font-size:60px;line-height:1.15;box-shadow:0 18px 40px -18px rgba(15,42,46,.35)}
.tr{font-size:40px;padding:0 10px}
.lang{display:block;font-family:Figtree,Arial,sans-serif;font-weight:700;font-size:26px;letter-spacing:4px;color:#0B7A63;margin-bottom:18px}
.tr b{color:#0F2A2E;font-weight:700}
.box{background:#0F2A2E;color:#fff;border-radius:32px;padding:46px 54px}
.app .box{background:#fff;color:#0F2A2E}
ul,ol{list-style:none;display:flex;flex-direction:column;gap:30px}
li{font-size:46px;font-weight:700;display:flex;gap:26px;align-items:baseline;line-height:1.2}
li span{color:#FFE27A;font-weight:800;flex:none}
.app li span{color:#0B7A63}
ol li span{font-family:'Bricolage Grotesque',Arial,sans-serif;width:56px;height:56px;border-radius:50%;background:#0B7A63;color:#fff;display:grid;place-items:center;font-size:34px;align-self:center}
footer{display:flex;justify-content:space-between;align-items:center;border-top:3px solid currentColor;padding:32px 0 50px;margin-top:40px}
footer b{font-weight:700;font-size:36px}
footer small{font-size:30px;font-weight:700;color:#0B7A63}
.app footer small{color:#FFE27A}
/* layout com foto (p.photo): foto em cima com a etiqueta, painel de texto embaixo */
body.ph{padding:0}
.ph .photo{height:580px;background:50% 15%/cover no-repeat;flex:none;position:relative}
.ph .photo .tag{position:absolute;left:70px;bottom:28px;box-shadow:0 8px 24px -8px rgba(0,0,0,.45)}
.ph .panel{flex:1;display:flex;flex-direction:column;padding:40px 70px 0}
.ph main{gap:24px}
.ph h1{font-size:68px}
.ph .accent{font-size:72px}
.ph p{font-size:36px}
.ph .phrase{font-size:46px;padding:34px 40px;border-radius:26px}
.ph .lang{font-size:22px;margin-bottom:12px}
.ph .tr{font-size:32px}
.ph .box{padding:34px 44px;border-radius:26px}
.ph li{font-size:38px}
.ph ul,.ph ol{gap:20px}
.ph ol li span{width:48px;height:48px;font-size:28px}
.ph footer{margin-top:24px;padding:26px 0 40px}
.ph footer b{font-size:32px}
.ph footer small{font-size:27px}
</style></head><body class="${p.pillar}${p.photo ? ' ph' : ''}">${p.photo
    ? `<div class="photo" style="background-image:url('../photos/${p.photo}.jpg')"><div class="tag">${esc(p.label)}</div></div><div class="panel"><main><h1>${esc(p.headline)}</h1>${middle(p)}</main>${FOOT}</div>`
    : `<main><div class="tag">${esc(p.label)}</div><h1>${esc(p.headline)}</h1>${middle(p)}</main>${FOOT}`}</body></html>`;
}

const caption = (p, i) => `${p.pt}\n\n${CTA}\n\n${TAGS[i % TAGS.length]}`;

const slugs = new Set();
for (const p of posts) {
  if (slugs.has(p.slug)) throw new Error('slug repetido ' + p.slug);
  slugs.add(p.slug);
  if (!p.pt || !p.pillar) throw new Error('falta pt/pillar em ' + p.slug);
}
const items = posts.map((p, i) => ({ slot: i + 1, slug: p.slug, image: SITE + p.slug + '.jpg', caption: caption(p, i), targets: ['fb', 'ig'] }));
for (const it of items) if (it.caption.length > 2200) throw new Error(`legenda > 2200 (limite IG): ${it.slug} ${it.caption.length}`);
for (const it of items) if ((it.caption.match(/#/g) || []).length > 30) throw new Error(`hashtags > 30: ${it.slug}`);

fs.writeFileSync(path.join(ROOT, 'queue.json'), JSON.stringify({ epoch: EPOCH, posts: items }, null, 2) + '\n');

fs.mkdirSync(path.join(ROOT, 'cards'), { recursive: true });
for (const p of posts) fs.writeFileSync(path.join(ROOT, 'cards', p.slug + '.html'), card(p));

// Página de revisão: card + legenda + data, para aprovação antes de ativar
const d0 = Date.parse(EPOCH);
const day = i => new Date(d0 + i * 86400000).toISOString().slice(0, 10);
const PILLAR = { en: 'Inglês', biz: 'Negócio', app: 'QuoteZap' };
fs.writeFileSync(path.join(ROOT, 'preview.html'), `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Fila social Urban Digital</title>
<style>body{font-family:system-ui;max-width:1100px;margin:auto;padding:16px;background:#EDF2F0;color:#0F2A2E}
.p{display:flex;gap:20px;background:#fff;border-radius:12px;padding:16px;margin:16px 0}img{width:300px;border-radius:8px;flex:none}
pre{white-space:pre-wrap;font:14px/1.45 system-ui;margin:0}@media(max-width:700px){.p{flex-direction:column}img{width:100%}}</style>
<h1>Urban Digital Products · ${items.length} posts (início ${EPOCH}, 19:00 ET, FB + IG)</h1>
${items.map((it, i) => `<div class="p"><img src="img/${it.slug}.jpg" alt="${it.slug}"><div><b>#${it.slot} · ${day(i)} · ${PILLAR[posts[i].pillar]} · ${it.slug}</b><pre>${esc(it.caption)}</pre></div></div>`).join('\n')}`);

items.forEach((it, i) => console.log(day(i), it.slug.padEnd(18), `(${it.caption.length} ch)`, '|', it.caption.split('\n')[0].slice(0, 60)));

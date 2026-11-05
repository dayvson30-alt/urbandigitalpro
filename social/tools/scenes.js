// Cenas p/ gerar no Gemini (app web), via dev-browser --connect no Chrome chrome-ngs (porta 9222) logado.
// node social/tools/scenes.js <nome1,nome2,...>  -> imprime o script dev-browser p/ esse lote
// Saída do dev-browser: linhas "IMG:<nome>:data:image/jpeg;base64,..." -> social/tools/save-photos.js grava em social/photos/
const BASE = 'Create a photorealistic image, landscape 4:3. Advertising photo. No logos, no text, no signage, no readable phone or laptop screens, no brand labels on bottles. 35mm photo, natural light, natural colors, realistic hands, skin and fabric.';
const CLEANER = 'a friendly Brazilian woman house cleaner in her early 30s, dark hair in a ponytail, wearing a plain dark green polo shirt with no logo and black pants';

const scenes = {
  'kitchen-clean': `Bright modern kitchen of a Central Florida home: ${CLEANER} wiping a white quartz kitchen island with a microfiber cloth, spray bottle beside her, sunlight through the window, everything sparkling clean.`,
  'phone-car': `${CLEANER} sitting in the driver seat of a small parked SUV on a quiet palm-lined Florida suburban street, typing a message on her smartphone (screen facing away from camera), a cleaning caddy with supplies on the passenger seat. Midday light.`,
  'phone-porch': `${CLEANER} taking a short break sitting on the front steps of a Florida single-story house, smiling while typing on her smartphone (screen facing away from camera), a cleaning caddy next to her. Palm trees and blue sky.`,
  'door-client': `At the front door of a Central Florida stucco home: ${CLEANER} holding a cleaning caddy, talking and smiling with a friendly American homeowner woman in her 40s who stands in the doorway. Warm, trustworthy mood, bright day.`,
  'airbnb-bed': `Vacation rental bedroom in a Florida resort home: ${CLEANER} making a king bed with crisp white linens, a stack of neatly folded white towels on the bed, bright and airy room.`,
  'bathroom': `Modern bright bathroom: ${CLEANER} wearing yellow rubber gloves, cleaning a large mirror above a double sink, everything shiny. Natural light.`,
  'oven': `Kitchen close-up: ${CLEANER} wearing rubber gloves, kneeling and scrubbing the inside of an open oven, cleaning supplies beside her on the floor. Realistic, clean bright kitchen.`,
  'empty-house': `Empty living room of a house after a move-out, a few moving boxes stacked by the wall, bare tile floor: ${CLEANER} mopping the floor, sunlight streaming through windows.`,
  'traffic': 'View from the driver seat of a car on a busy Florida highway in traffic, hands on the steering wheel (woman, dark green sleeve), cars ahead with blank license plates, palm trees on the roadside, late morning light. No faces.',
  'dog': `Cozy Florida living room: ${CLEANER} vacuuming a rug while a friendly golden retriever lies on the floor watching her. Bright daylight, homey mood.`,
  'pool': 'Backyard of a Central Florida home with a screened pool enclosure: a Brazilian man pool technician in his 30s wearing a plain dark green polo shirt with no logo and khaki shorts, skimming leaves from a sparkling blue pool with a long telescopic net. Bright sunny day, palm trees beyond the screen.',
  'team': `Two smiling house cleaners standing side by side in front of a clean Central Florida home: ${CLEANER} and a Brazilian man colleague in the same plain dark green polo shirt, both holding cleaning caddies. Bright day, confident friendly mood.`,
  'planning': `${CLEANER}, now as a small business owner, sitting at a kitchen table at home planning her prices with a paper notebook, a pen and a calculator, a cup of coffee, smartphone face down on the table. Warm morning light, focused mood.`,
  'lockbox': 'Close-up of a woman\'s hand (dark green polo sleeve) entering a code on a black key lockbox hanging on the front door handle of a Florida home. Shallow depth of field, daylight. No readable numbers.',
  'happy-client': 'A happy American homeowner woman in her 40s standing in her sparkling clean, bright living room, smiling and looking around satisfied, fresh flowers on the coffee table. Natural afternoon light.',
  'supplies': 'Top-down flat lay on a white kitchen counter: a cleaning caddy, folded microfiber cloths in green and white, spray bottles without labels, a scrub brush, rubber gloves and a smartphone face down. Clean, bright, organized composition.',
};
module.exports = { scenes };

if (require.main === module) {
  const names = (process.argv[2] || '').split(',').filter(Boolean);
  for (const n of names) if (!scenes[n]) throw new Error('cena desconhecida ' + n);
  const jobs = names.map(n => ({ n, p: `${BASE} ${scenes[n]}` }));
  process.stdout.write(`const jobs = ${JSON.stringify(jobs)};
const page = await browser.getPage("gemini");
for (const j of jobs) {
  await page.goto("https://gemini.google.com/app", { waitUntil: "commit", timeout: 30000 });
  await page.waitForTimeout(6000);
  const box = page.locator('rich-textarea .ql-editor, div[contenteditable="true"]').first();
  await box.click(); await box.fill(j.p); await page.waitForTimeout(400); await page.keyboard.press('Enter');
  let data = null;
  for (let i = 0; i < 40 && !data; i++) {
    await page.waitForTimeout(5000);
    data = await page.evaluate(() => {
      const imgs = [...document.querySelectorAll('model-response img')].filter(i => i.src.startsWith('blob:') && i.complete && i.naturalWidth > 300);
      if (!imgs.length) return null;
      const i = imgs[imgs.length - 1];
      const c = document.createElement('canvas'); c.width = i.naturalWidth; c.height = i.naturalHeight;
      c.getContext('2d').drawImage(i, 0, 0);
      return c.toDataURL('image/jpeg', 0.95);
    });
  }
  if (!data) {
    const msg = await page.evaluate(() => { const r = [...document.querySelectorAll('model-response')].pop(); return r ? r.innerText.slice(0, 200).replace(/\\n+/g, ' ') : 'sem resposta'; });
    console.log('FAIL:' + j.n + ':' + msg);
  } else console.log('IMG:' + j.n + ':' + data);
}
`);
}

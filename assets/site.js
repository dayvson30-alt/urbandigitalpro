(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- medição (Meta Pixel): fica DESLIGADO até o ID ser definido ----
  const PIXEL_ID = ''; // ex.: '1234567890'. Vazio = nada é carregado nem enviado.
  if (PIXEL_ID) {
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', PIXEL_ID); fbq('track', 'PageView');
  }
  const track = (name, params, custom) => { try { if (window.fbq) (custom ? fbq('trackCustom', name, params || {}) : fbq('track', name, params || {})); } catch (e) {} };
  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-ev]'); if (!a) return;
    const ev = a.dataset.ev;
    if (ev === 'whatsapp') track('Contact', { content_name: 'whatsapp' });
    else track(ev, {}, true);
  });

  // ---- origem do visitante (UTM) ----
  const qs = new URLSearchParams(location.search);
  const store = (k, v) => { try { if (v) sessionStorage.setItem(k, v); return sessionStorage.getItem(k) || ''; } catch (e) { return v || ''; } };
  const utm = { source: store('utm_source', qs.get('utm_source')), medium: store('utm_medium', qs.get('utm_medium')), campaign: store('utm_campaign', qs.get('utm_campaign')) };

  // ---- rolagem suave (inércia); sem isso, vale a rolagem normal do navegador ----
  let lenis = null;
  if (window.Lenis && !reduce && !qs.has('nosmooth')) {
    lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', (e) => {
      const id = a.getAttribute('href'); const el = id.length > 1 && document.querySelector(id);
      if (el) { e.preventDefault(); lenis.scrollTo(el, { duration: 1.3 }); }
    }));
  }

  // ---- entradas ao rolar: revela o que já está na tela ou ficou para trás ----
  let pend = [...document.querySelectorAll('.rise')];
  const reveal = () => {
    const lim = innerHeight * 0.92;
    pend = pend.filter(el => { if (el.getBoundingClientRect().top < lim) { el.classList.add('in'); return false; } return true; });
    if (!pend.length) { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); }
  };
  let tick_ = false;
  const onScroll = () => { if (tick_) return; tick_ = true; requestAnimationFrame(() => { tick_ = false; reveal(); }); };
  if (reduce) { pend.forEach(el => el.classList.add('in')); pend = []; }
  else { addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', onScroll); reveal(); }

  const form = document.getElementById('idea-form');

  if (form) {
    // ---- diagnóstico -> n8n ----
    const msg = form.querySelector('.msg');
    const btn = form.querySelector('button[type="submit"]');
    form.querySelector('#chips').addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b) return;
      b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
    });
    const fail = (text) => { msg.className = 'msg full err'; msg.textContent = text; };
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const f = form.elements;
      const picked = [...form.querySelectorAll('#chips [aria-pressed="true"]')].map(b => b.textContent.trim());
      const detalhe = f.detalhe.value.trim();
      if (f.nome.value.trim().length < 2) return fail('Escreva o seu nome.');
      if (f.whatsapp.value.replace(/\D/g, '').length < 7) return fail('Confira o número de WhatsApp.');
      if (!f.segmento.value) return fail('Escolha o seu segmento.');
      if (!picked.length && !detalhe) return fail('Toque em pelo menos uma dificuldade ou escreva uma linha sobre o problema.');
      if (f.email.value && !f.email.checkValidity()) return fail('Confira o e-mail.');
      if (!f.consentimento.checked) return fail('Marque a caixa de consentimento para podermos te chamar.');
      const data = new URLSearchParams();
      ['nome','empresa','whatsapp','email','cidade_estado','segmento','funcionarios','objetivo','sistemas','website'].forEach(k => data.set(k, f[k].value));
      data.set('dificuldade', [picked.join('; '), detalhe].filter(Boolean).join(' — '));
      data.set('consentimento', '1');
      data.set('origem', utm.source || (document.referrer ? new URL(document.referrer).hostname : 'site'));
      data.set('utm_source', utm.source); data.set('utm_medium', utm.medium); data.set('utm_campaign', utm.campaign);
      data.set('pagina', location.pathname);
      btn.disabled = true; msg.className = 'msg full'; msg.textContent = 'Enviando…';
      try {
        const r = await fetch('https://n8n.urbancleanfl.com/webhook/diagnostico', { method: 'POST', body: data });
        if (!r.ok) throw new Error(r.status);
        form.reset();
        form.querySelectorAll('#chips button').forEach(b => b.setAttribute('aria-pressed', 'false'));
        msg.textContent = 'Recebido! Vamos te chamar no WhatsApp em até 48 horas para entender a sua empresa. ';
      const ag = document.createElement('a');
      ag.href = 'https://wa.me/14073755223?text=' + encodeURIComponent('Oi! Acabei de pedir um diagnóstico no site e quero agendar uma conversa.');
      ag.target = '_blank'; ag.rel = 'noopener'; ag.className = 'lnk'; ag.dataset.ev = 'whatsapp'; ag.textContent = 'Prefere já agendar um horário?';
      msg.append(ag);
        track('Lead', { content_name: 'diagnostico' });
      } catch (err) {
        fail('Não conseguimos enviar agora. Tenta de novo ou manda no WhatsApp (407) 375-5223.');
      } finally {
        btn.disabled = false;
      }
    });
  }

  // ---- esconde o botão fixo quando o rodapé aparece ----
  const wa = document.querySelector('.wa-float'), foot = document.querySelector('.foot');
  if (wa && foot && 'IntersectionObserver' in window) {
    new IntersectionObserver((es) => es.forEach(e => wa.classList.toggle('hide', e.isIntersecting)), { threshold: 0.05 }).observe(foot);
  }

  // ---- hora local ----
  const clock = document.getElementById('clock');
  if (clock) {
  const tick = () => { try { clock.textContent = new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: 'America/New_York' }).format(new Date()) + ' na Flórida'; } catch (e) {} };
  tick(); setInterval(tick, 30000);
  }

  window.UDP = { reduce, track, form, utm };
})();

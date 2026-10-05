/* Sample-projection email gate — drop-in, self-contained.
 * Any page: load the Supabase CDN, optionally set window.SAMPLE_SOURCE, then load
 * this file, and add class="js-sample" to each link that points at the sample PDF.
 * First click opens an email modal; the email is written to Supabase `leads`, then
 * the PDF opens. Returning visitors (localStorage) skip straight through.
 * Injects its own CSS so it looks right regardless of the host page's theme. */
(function () {
  var PDF = 'Northgate_Apartment_illustrative_SAMPLE.pdf';
  var SOURCE = window.SAMPLE_SOURCE || 'site';
  var SUPA_URL = 'https://zjpopvttlslhoopvmqsb.supabase.co';
  var SUPA_KEY = 'sb_publishable_Cwj_h10p92CFrSFSW4yzzQ_Eckr2fWJ';

  var sb = null;
  try { sb = supabase.createClient(SUPA_URL, SUPA_KEY); } catch (e) {}

  function unlocked() { try { return localStorage.getItem('sample_unlocked') === '1'; } catch (e) { return false; } }

  var css = '.sg-modal{position:fixed;inset:0;background:rgba(6,9,15,.72);backdrop-filter:blur(3px);display:none;align-items:center;justify-content:center;padding:20px;z-index:2000;font-family:inherit}'
    + '.sg-modal.open{display:flex}'
    + '.sg-box{background:#141d2e;border:1px solid rgba(203,169,78,.35);border-radius:14px;max-width:420px;width:100%;padding:30px 26px 26px;position:relative;box-shadow:0 24px 60px rgba(0,0,0,.5);color:#e8ecf3}'
    + '.sg-box h3{font-size:1.35rem;font-weight:700;margin:0 0 10px;color:#fff;letter-spacing:-.01em}'
    + '.sg-box>p{color:#aeb6c6;font-size:.95rem;margin:0 0 16px;line-height:1.55}'
    + '.sg-box input{width:100%;padding:12px 14px;border-radius:9px;border:1px solid rgba(255,255,255,.18);background:#0e1420;color:#fff;font-size:1rem;box-sizing:border-box;margin:0 0 12px}'
    + '.sg-box input:focus{outline:none;border-color:#cba94e}'
    + '.sg-box button{width:100%;padding:12px 14px;border-radius:9px;border:none;background:#cba94e;color:#0b0f19;font-weight:700;font-size:1rem;cursor:pointer}'
    + '.sg-x{position:absolute;top:10px;right:14px;background:none;border:none;color:#8a93a6;font-size:1.7rem;line-height:1;cursor:pointer;padding:0}'
    + '.sg-msg{min-height:1.1em;font-size:.9rem;color:#cba94e;margin:12px 0 0}'
    + '.sg-fine{font-size:.78rem;color:#8a93a6;margin:14px 0 0;line-height:1.5}';
  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  var modal = document.createElement('div');
  modal.className = 'sg-modal';
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML = '<div class="sg-box" role="dialog" aria-modal="true" aria-labelledby="sg-h">'
    + '<button class="sg-x" aria-label="Close">&times;</button>'
    + '<h3 id="sg-h">Get the sample projection</h3>'
    + '<p>A sample Deal Tax Projection on a fictional multifamily deal, run through the same engine as a client report. Tell me where to send it.</p>'
    + '<form><input type="email" placeholder="you@company.com" required autocomplete="email">'
    + '<button type="submit">Send me the sample &rarr;</button></form>'
    + '<p class="sg-msg" aria-live="polite"></p>'
    + '<p class="sg-fine">No spam. I only follow up if I can genuinely help your deal. Unsubscribe anytime.</p>'
    + '</div>';
  document.body.appendChild(modal);

  var form = modal.querySelector('form');
  var emailEl = modal.querySelector('input[type=email]');
  var msgEl = modal.querySelector('.sg-msg');

  function openModal() { modal.classList.add('open'); setTimeout(function () { emailEl.focus(); }, 50); }
  function closeModal() { modal.classList.remove('open'); }

  modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
  modal.querySelector('.sg-x').addEventListener('click', closeModal);

  document.querySelectorAll('.js-sample').forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (unlocked()) return;            // already captured: let the real link open the PDF
      e.preventDefault();
      openModal();
    });
  });

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    var email = (emailEl.value || '').trim();
    if (!email || email.indexOf('@') < 1) { msgEl.textContent = 'Please enter a valid email.'; return; }
    msgEl.textContent = 'One sec…';
    try { if (typeof gtag === 'function') gtag('event', 'lead_sample', { event_category: 'conversion', event_label: SOURCE }); } catch (e) {}
    try { if (sb) await sb.from('leads').insert({ email: email, source: SOURCE }); } catch (e) {}
    try { localStorage.setItem('sample_unlocked', '1'); } catch (e) {}
    msgEl.textContent = 'Thanks — opening the sample now.';
    window.open(PDF, '_blank');
    setTimeout(closeModal, 900);
  });
})();

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('primary-nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const expanded = nav.getAttribute('aria-expanded') === 'true';
    nav.setAttribute('aria-expanded', String(!expanded));
    navToggle.setAttribute('aria-expanded', String(!expanded));
    nav.style.display = !expanded ? 'block' : '';
  });
}

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Map tooltip interactions
const map = document.querySelector('.map');
const tooltip = document.querySelector('.map__tooltip');

function showTooltip(evt) {
  const label = evt.target.getAttribute('data-label');
  if (!label || !tooltip) return;
  tooltip.textContent = label;
  const rect = evt.currentTarget.getBoundingClientRect();
  const x = (evt.clientX - rect.left);
  const y = (evt.clientY - rect.top);
  tooltip.style.left = x + 'px';
  tooltip.style.top = y + 'px';
  tooltip.style.opacity = 1;
}

function hideTooltip() {
  if (tooltip) tooltip.style.opacity = 0;
}

if (map) {
  map.addEventListener('mousemove', (e) => {
    if (e.target.matches('.map__hub, .map__port')) showTooltip(e);
    else hideTooltip();
  });
  map.addEventListener('mouseleave', hideTooltip);
}

// Tracking placeholder
const trackingForm = document.getElementById('trackingForm');
const trackingNumber = document.getElementById('trackingNumber');
const trackingResult = document.getElementById('trackingResult');

function fakeStatus(num) {
  // Simple pseudo-randomized status for demo
  const statuses = [
    { step: 'Création du dossier', eta: '—', detail: 'Documents enregistrés.' },
    { step: 'Prise en charge', eta: '—', detail: 'Marchandise récupérée.' },
    { step: 'En transit', eta: '3-5 jours', detail: 'Transit maritime en cours.' },
    { step: 'Douane', eta: '24-48h', detail: 'Contrôle et dédouanement.' },
    { step: 'Livraison finale', eta: '1-2 jours', detail: 'Acheminement en cours.' }
  ];
  const idx = Math.min(num.length % statuses.length, statuses.length - 1);
  return statuses[idx];
}

if (trackingForm && trackingResult) {
  trackingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = (trackingNumber.value || '').trim();
    if (!val || !/^[A-Za-z0-9-]{6,}$/.test(val)) {
      trackingResult.innerHTML = `<p style="color:#b00020">Veuillez saisir un numéro de suivi valide (6+ caractères alphanumériques).</p>`;
      return;
    }
    const status = fakeStatus(val);
    trackingResult.innerHTML = `
      <h3 style="margin-top:0">Résultats pour <span style="color:#0a1b2b">${val}</span></h3>
      <ul>
        <li><strong>Étape:</strong> ${status.step}</li>
        <li><strong>ETA estimée:</strong> ${status.eta}</li>
        <li><strong>Détails:</strong> ${status.detail}</li>
      </ul>
      <p class="muted small">Demo only — L’intégration API sera ajoutée ultérieurement.</p>
    `;
  });
}

// Quote form basic validation + UX
const quoteForm = document.getElementById('quoteForm');
if (quoteForm) {
  quoteForm.addEventListener('submit', (e) => {
    if (!quoteForm.checkValidity()) {
      e.preventDefault();
      alert('Merci de compléter les champs requis.');
    } else {
      // Replace with actual submission (AJAX / backend)
      e.preventDefault();
      alert('Votre demande a été envoyée. Nous vous contacterons sous 24h.');
      quoteForm.reset();
    }
  });
}

// Smooth scroll for internal anchors (enhanced UX)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Run after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // GitHub stars (best‑effort)
  fetch('https://api.github.com/repos/lydakis/alloy')
    .then(r => (r.ok ? r.json() : null))
    .then(d => {
      if (d && d.stargazers_count) {
        const el = document.getElementById('stars');
        if (el) el.textContent = '★ ' + d.stargazers_count.toLocaleString();
      }
    })
    .catch(() => {});

  // Copy install
  const copyBtn = document.getElementById('copy');
  const installEl = document.getElementById('install');
  copyBtn?.addEventListener('click', async () => {
    try {
      const txt = (installEl?.textContent || '').trim();
      if (txt) await navigator.clipboard.writeText(txt);
      copyBtn.textContent = 'Copied ✓';
      setTimeout(() => (copyBtn.textContent = 'Copy pip install'), 1500);
    } catch (_) {
      // ignore
    }
  });

  // Type‑in reveal (respect reduced motion)
  const codeEl = document.getElementById('code');
  const prefersReduced =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (codeEl && !prefersReduced) {
    const lines = codeEl.innerHTML.trim().split('\n');
    codeEl.innerHTML = '';
    let i = 0;
    (function step() {
      if (i <= lines.length) {
        codeEl.innerHTML = lines.slice(0, i).join('\n');
        i++;
        requestAnimationFrame(step);
      }
    })();
  }

  // --- Smoke tests (console only) ---
  function test(name, fn) {
    try {
      fn();
      console.log('%cPASS', 'color:#62d26f', name);
    } catch (e) {
      console.error('FAIL', name, e);
    }
  }

  test('code element exists', () => {
    if (!document.getElementById('code')) throw new Error('missing #code');
  });

  test('install command looks correct', () => {
    const el = document.getElementById('install');
    const txt = (el?.textContent || '').trim();
    if (!/^pip install /.test(txt)) throw new Error('install string wrong: ' + txt);
  });

  test('Get started link points to getting-started', () => {
    const href = document.querySelector('a.btn.primary')?.getAttribute('href') || '';
    if (!/getting-started\/?$/.test(href)) throw new Error('bad href: ' + href);
  });

  test('logo mark exists', () => {
    if (!document.querySelector('.logo-mark')) throw new Error('missing .logo-mark');
  });
});

// Year (safe to set outside DOMContentLoaded)
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();


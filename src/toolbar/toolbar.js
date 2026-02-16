document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('toolbar-container');
  if (!container) return;

  // Event delegation -> works before or after injection
  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.clickable');
    if (!btn) return;
    if (btn.id === 'option0') window.location.href = '/index.html';
    if (btn.id === 'option1') window.location.href = '/src/screens/projects/projects.html';
    if (btn.id === 'option2') window.location.href = '/src/screens/resume/resume.html';
    if (btn.id === 'option3') window.location.href = '/src/screens/contact/contact.html';
  });

  try {
    const fragmentUrl = new URL('./toolbar.html', import.meta.url); // requires module script
    const res = await fetch(fragmentUrl);
    if (!res.ok) throw new Error(`Toolbar load failed: ${res.status}`);
    container.innerHTML = await res.text();

    // if toolbar.html contains scripts, re-evaluate them and resolve relative src
    container.querySelectorAll('script').forEach(old => {
      const s = document.createElement('script');
      if (old.src) s.src = new URL(old.src, fragmentUrl).href;
      else s.textContent = old.textContent;
      document.head.appendChild(s);
      old.remove();
    });
  } catch (err) {
    console.error('Failed to load toolbar:', err);
  }
});
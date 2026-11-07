/* Progressive enhancement only. All content and links work without JavaScript. */
(() => {
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  const label = document.querySelector('[data-menu-label]');
  if (!toggle || !menu || !label) return;

  const desktop = window.matchMedia('(min-width: 64rem)');
  const setOpen = (open, returnFocus = false) => {
    toggle.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
    label.textContent = open ? 'Close' : 'Menu';
    if (returnFocus) toggle.focus();
  };

  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', (event) => {
    if (event.target.closest('a') && !desktop.matches) setOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setOpen(false, true);
  });
  document.addEventListener('click', (event) => {
    if (!desktop.matches && !event.target.closest('[data-header]') && toggle.getAttribute('aria-expanded') === 'true') setOpen(false);
  });
  desktop.addEventListener('change', () => setOpen(false));
})();

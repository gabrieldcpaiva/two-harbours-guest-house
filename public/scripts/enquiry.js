/* Static-friendly enquiry: validate locally, then hand an email to the guest's
   mail app. No network request, no storage, no pretend booking confirmation. */
(() => {
  const form = document.querySelector('[data-enquiry-form]');
  if (!form) return;
  form.hidden = false;
  const status = form.querySelector('[data-form-status]');
  const fields = ['name', 'email', 'arrival', 'nights'];
  const today = new Date();
  const localToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  form.elements.arrival.min = localToday;

  const setError = (name, message) => {
    const input = form.elements[name];
    const error = document.getElementById(`${name}-error`);
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
    if (error) error.textContent = message;
  };

  const validate = () => {
    let firstInvalid = null;
    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const arrival = form.elements.arrival.value;
    const nights = Number(form.elements.nights.value);
    setError('name', name ? '' : 'Please tell us your name.');
    setError('email', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'Please enter a valid email address.');
    setError('arrival', arrival && arrival >= localToday ? '' : 'Please choose today or a future arrival date.');
    setError('nights', Number.isInteger(nights) && nights >= 1 && nights <= 28 ? '' : 'Please enter between 1 and 28 whole nights.');
    for (const field of fields) {
      if (form.elements[field].getAttribute('aria-invalid') === 'true' && !firstInvalid) firstInvalid = form.elements[field];
    }
    if (firstInvalid) {
      status.dataset.state = 'error';
      status.textContent = 'Please check the highlighted fields. Nothing has been sent.';
      firstInvalid.focus();
      return false;
    }
    status.dataset.state = '';
    status.textContent = '';
    return true;
  };

  fields.forEach((name) => form.elements[name].addEventListener('input', () => {
    if (form.elements[name].getAttribute('aria-invalid') === 'true') validate();
  }));

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!validate()) return;
    const data = new FormData(form);
    const lines = [
      'Hello Two Harbours,',
      '',
      'I would like to enquire about a stay.',
      `Name: ${String(data.get('name')).trim()}`,
      `Email: ${String(data.get('email')).trim()}`,
      `Preferred arrival: ${data.get('arrival')}`,
      `Nights: ${data.get('nights')}`,
      `Room: ${data.get('room')}`,
      `Guests: ${data.get('guests')} adult(s)`,
      '',
      String(data.get('message') || '').trim() || 'No additional message.',
      '',
      'I understand this is an enquiry, not a confirmed reservation.'
    ];
    const subject = `Stay enquiry — ${String(data.get('name')).trim()} — ${data.get('arrival')}`;
    const href = `mailto:enquiries@twoharbours.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
    status.dataset.state = 'success';
    status.replaceChildren();
    const heading = document.createElement('strong');
    heading.textContent = 'Your enquiry is ready. ';
    const text = document.createTextNode('Nothing has been sent yet. Open it in your mail app, check it, then send it. ');
    const link = document.createElement('a');
    link.href = href;
    link.textContent = 'Open email app';
    const fallback = document.createElement('p');
    fallback.className = 'note';
    fallback.style.marginTop = '.6rem';
    fallback.append('No mail app? Write to ');
    const mail = document.createElement('a');
    mail.href = 'mailto:enquiries@twoharbours.com';
    mail.textContent = 'enquiries@twoharbours.com';
    fallback.append(mail, ' or call +44 7831 313729.');
    status.append(heading, text, link, fallback);
    status.focus?.();
  });
})();

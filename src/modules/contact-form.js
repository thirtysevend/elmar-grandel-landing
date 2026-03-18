export function initContactForm() {
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  if (!form || !feedback) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const message = form.querySelector('#message');

    // Reset states
    [name, email, message].forEach(f => f.classList.remove('error'));
    feedback.className = 'form-feedback';
    feedback.textContent = '';

    // Validate
    let valid = true;
    if (!name.value.trim()) { name.classList.add('error'); valid = false; }
    if (!email.value.trim() || !email.value.includes('@')) { email.classList.add('error'); valid = false; }
    if (!message.value.trim()) { message.classList.add('error'); valid = false; }

    if (!valid) {
      const lang = localStorage.getItem('elmar-lang') || 'en';
      feedback.textContent = lang === 'de'
        ? 'Bitte füllen Sie alle Felder korrekt aus.'
        : 'Please fill in all fields correctly.';
      feedback.className = 'form-feedback form-feedback--error';
      return;
    }

    // Simulate send (no backend)
    const btn = form.querySelector('.btn--submit');
    btn.disabled = true;
    btn.style.opacity = '0.6';

    setTimeout(() => {
      const lang = localStorage.getItem('elmar-lang') || 'en';
      feedback.textContent = lang === 'de'
        ? 'Nachricht gesendet! Elmar meldet sich bald bei Ihnen.'
        : 'Message sent! Elmar will get back to you soon.';
      feedback.className = 'form-feedback form-feedback--success';
      form.reset();
      btn.disabled = false;
      btn.style.opacity = '1';
    }, 800);
  });
}

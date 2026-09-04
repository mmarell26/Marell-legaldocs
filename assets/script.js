const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav-links');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

document.querySelectorAll('[data-year]').forEach((item) => {
  item.textContent = new Date().getFullYear();
});

document.querySelectorAll('.site-footer').forEach((footer) => {
  if (footer.querySelector('a[href="mailto:info@marelldocs.com"]')) return;

  const emailLink = document.createElement('a');
  emailLink.href = 'mailto:info@marelldocs.com';
  emailLink.textContent = 'info@marelldocs.com';

  const contactColumn = footer.querySelector('.footer-grid > div:last-child');
  if (contactColumn) {
    const heading = contactColumn.querySelector('h3');
    if (heading) heading.insertAdjacentElement('afterend', emailLink);
    else contactColumn.prepend(emailLink);
    return;
  }

  const footerDetails = footer.querySelector('.footer-bottom span:last-child');
  if (footerDetails) {
    footerDetails.prepend(emailLink, ' · ');
  }
});

const feedbackForm = document.querySelector('[data-feedback-form]');

if (feedbackForm) {
  feedbackForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(feedbackForm);
    const permission = data.get('permission') === 'yes'
      ? 'Yes, Marell Docs may publish this feedback with the selected attribution.'
      : 'No, this feedback is private and may not be published.';
    const subject = 'Customer feedback for Marell Docs';
    const body = [
      'Customer name: ' + data.get('name'),
      'Email: ' + data.get('email'),
      'Service: ' + data.get('service'),
      'Preferred public attribution: ' + data.get('attribution'),
      '',
      'Feedback:',
      data.get('feedback'),
      '',
      'Permission:',
      permission
    ].join('\n');

    window.location.href = 'mailto:info@marelldocs.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    const status = feedbackForm.querySelector('.form-status');
    if (status) status.textContent = 'Your email app should now open with your feedback ready to send.';
  });
}

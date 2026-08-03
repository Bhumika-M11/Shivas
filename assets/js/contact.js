/* ============================================
   SHIVAS TRAVEL GURU — CONTACT FORM
   Vanilla JS | No Dependencies
============================================ */
(function () {
    'use strict';

    var form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        var name = (form.querySelector('[name="name"]') || {}).value || '';
        var phone = (form.querySelector('[name="phone"]') || {}).value || '';
        var message = (form.querySelector('[name="message"]') || {}).value || '';

        if (!name.trim() || !phone.trim()) {
            alert('Please enter your name and phone number.');
            return;
        }

        var waNumber = '919019993283';
        var lines = [
            'Hello Shivas Travel Guru!',
            'I would like to get in touch.',
            '',
            'Name: ' + name.trim(),
            'Phone: ' + phone.trim()
        ];
        if (message.trim()) {
            lines.push('Message: ' + message.trim());
        }

        var waLink = 'https://wa.me/' + waNumber + '/?text=' + encodeURIComponent(lines.join('\n'));
        window.open(waLink, '_blank');
        form.reset();
    });

})();

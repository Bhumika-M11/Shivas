/* ============================================
   SHIVAS TRAVEL GURU — FOOTER (Dynamic Include)
   Vanilla JS | No Dependencies
   Injects the site-wide footer into #footer
============================================ */
(function () {
    'use strict';

    var container = document.getElementById('footer');
    if (!container) return;

    container.innerHTML = [
        '<footer class="footer">',
        '    <div class="container footer-grid">',
        '        <div class="footer-brand">',
        '            <a href="index.html" class="logo logo-light">',
        '                <div class="logo-icon">',
        '                    <img src="assets/images/logo4.png" alt="Shivas Travel Guru Logo" width="80" height="55">',
        '                </div>',
        '            </a>',
        '            <p>',
        '                Unearth the most stunning destinations and travel experiences to create',
        '                lifetime memories with us.',
        '            </p>',
        '            <div class="footer-social">',
        '                <a href="https://www.facebook.com/" target="_blank" rel="noopener" aria-label="Facebook">',
        '                    <i class="fa-brands fa-facebook-f"></i>',
        '                </a>',
        '                <a href="https://www.instagram.com/" target="_blank" rel="noopener" aria-label="Instagram">',
        '                    <i class="fa-brands fa-instagram"></i>',
        '                </a>',
        '                <a href="https://www.youtube.com/" target="_blank" rel="noopener" aria-label="YouTube">',
        '                    <i class="fa-brands fa-youtube"></i>',
        '                </a>',
        '                <a href="https://wa.me/919019993283" target="_blank" rel="noopener" aria-label="WhatsApp">',
        '                    <i class="fa-brands fa-whatsapp"></i>',
        '                </a>',
        '            </div>',
        '        </div>',
        '',
        '        <div class="footer-col">',
        '            <h4>Quick Links</h4>',
        '            <ul>',
        '                <li><a href="index.html">Home</a></li>',
        '                <li><a href="index.html#about">About us</a></li>',
        '                <li><a href="trips.html">Trips</a></li>',
        '                <li><a href="packages.html">Packages</a></li>',
        '                <li><a href="cab-rentals.html">Cabs</a></li>',
        '                <li><a href="contact.html">Contact</a></li>',
        '            </ul>',
        '        </div>',
        '',
        '        <div class="footer-col">',
        '            <h4>Our Services</h4>',
        '            <ul>',
        '                <li><a href="cab-rentals.html">Cab Rentals</a></li>',
        '                <li><a href="traveller-rentals.html">Traveller Rentals</a></li>',
        '                <li><a href="luxury-rentals.html">Luxury Rentals</a></li>',
        '                <li><a href="whitefield.html">Whitefield Cabs</a></li>',
        '                <li><a href="packages.html">Tour Packages</a></li>',
        '            </ul>',
        '        </div>',
        '',
        '        <div class="footer-col">',
        '            <h4>Contact Us</h4>',
        '            <ul class="footer-contact">',
        '                <li>',
        '                    <i class="fa-solid fa-location-dot"></i>',
        '                    <a href="https://maps.apple.com/?address=325,Dwaraka+Nagar+Stage+2,Banashankari+5th+Stage,Bengaluru+560098" target="_blank" rel="noopener">',
        '                        325, Dwaraka Nagar Stage 2, Banashankari 5th Stage, Bengaluru – 560098',
        '                    </a>',
        '                </li>',
        '                <li>',
        '                    <i class="fa-solid fa-phone"></i>',
        '                    <a href="tel:+919019993283">+91 90199 93283</a>',
        '                </li>',
        '                <li>',
        '                    <i class="fa-brands fa-whatsapp"></i>',
        '                    <a href="https://wa.me/919019993283" target="_blank" rel="noopener">+91 90199 93283</a>',
        '                </li>',
        '                <li>',
        '                    <i class="fa-solid fa-envelope"></i>',
        '                    <a href="mailto:Shivastravelguru@gmail.com">Shivastravelguru@gmail.com</a>',
        '                </li>',
        '            </ul>',
        '        </div>',
        '    </div>',
        '',
        '    <div class="footer-bottom">',
        '        <div class="container">',
        '            <p>&copy; <span id="year">2026</span> Shivas Travel Guru. All Rights Reserved.</p>',
        '        </div>',
        '    </div>',
        '</footer>'
    ].join('\n');

    /* Set year dynamically */
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

})();

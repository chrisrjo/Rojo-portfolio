document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');
    navLinks.forEach(a => a.onclick = e => {
        const el = document.querySelector(a.getAttribute('href'));
        if (el) {
            e.preventDefault();
            window.scrollTo({ top: el.offsetTop - nav.offsetHeight, behavior: 'smooth' });
        }
    });
    const observer = new IntersectionObserver(entries => {
        entries.filter(en => en.isIntersecting).forEach(en => {
            en.target.classList.add('visible');
            en.target.querySelectorAll('.project-item, .skills-icons img').forEach((item, i) => {
                setTimeout(() => Object.assign(item.style, { opacity: 1, transform: 'translateY(0)' }), i * 150);
            });
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    sections.forEach(s => observer.observe(s));

    // Scroll Highlight (Scroll Spy)
    window.onscroll = () => {
        const top = window.pageYOffset;
        sections.forEach(s => {
            const active = top > (s.offsetTop - 100) && top <= (s.offsetTop - 100 + s.offsetHeight);
            const link = document.querySelector(`nav a[href*=${s.id}]`);
            if (link) link.style.color = active ? '#007bff' : '#555';
        });
    };
});

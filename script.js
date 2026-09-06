const CURRENT_LANG = document.documentElement.lang === 'he' ? 'he' : 'en';
let resourcesData = null;

function formatResourceDate(dateStr, lang) {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    const year = parts[0];
    const month = parts[1] ? parseInt(parts[1], 10) : null;
    const day = parts[2] ? parseInt(parts[2], 10) : null;
    if (!month) return year;
    const monthNamesEn = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const monthNamesHe = ['ינואר','פברואר','מרץ','אפריל','מאי','יוני','יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר'];
    if (lang === 'he') {
        return day ? `${day} ב${monthNamesHe[month - 1]} ${year}` : `${monthNamesHe[month - 1]} ${year}`;
    }
    return day ? `${monthNamesEn[month - 1]} ${day}, ${year}` : `${monthNamesEn[month - 1]} ${year}`;
}

function renderResources(lang) {
    if (!resourcesData) return;
    const grid = document.getElementById('resource-grid');
    if (!grid) return;
    grid.innerHTML = [...resourcesData.resources].reverse().map(r => {
        const t = r[lang] || r['he'];
        const logoHtml = r.logo
            ? `<img src="${r.logo}" alt="" class="resource-logo" style="max-height: 28px; margin-bottom: 0.75rem;">`
            : '';
        const dateStr = formatResourceDate(r.date, lang);
        const dateHtml = dateStr
            ? `<div class="resource-date">${dateStr}</div>`
            : '';
        return `<a href="${t.link}" target="_blank" rel="noopener noreferrer" class="resource-card" style="background: ${r.cardBackground}; border-top: 6px solid ${r.cardBorderColor}; align-items: flex-start; text-align: right;">
            ${logoHtml}
            <div class="resource-title">${t.title}</div>
            ${dateHtml}
            <p style="font-size: 1rem; line-height: 1.7;">${t.description}</p>
            <div class="resource-btn" style="margin-top: 1.25rem;">${lang === 'he' ? 'להמשך קריאה...' : 'Read more...'}</div>
        </a>`;
    }).join('');
}

fetch('/resources.json')
    .then(r => r.json())
    .then(data => {
        resourcesData = data;
        renderResources(CURRENT_LANG);
    })
    .catch(err => console.error('Failed to load resources.json:', err));

const SOCIAL_ICONS = {
    instagram: 'fa-brands fa-instagram',
    facebook: 'fa-brands fa-facebook-f',
    linkedin: 'fa-brands fa-linkedin-in',
    x: 'fa-brands fa-x-twitter'
};

function renderTeam(lang) {
    const grid = document.getElementById('team-grid');
    if (!grid) return;
    const moreLabel = lang === 'he' ? 'קרא עוד' : 'Read more';
    const lessLabel = lang === 'he' ? 'קרא פחות' : 'Show less';
    fetch('/team.json')
        .then(r => r.json())
        .then(data => {
            grid.innerHTML = (data.team || []).map(member => {
                const t = member[lang] || member['he'];
                const social = member.social || {};
                const socialLinks = Object.keys(SOCIAL_ICONS)
                    .filter(key => social[key])
                    .map(key => `<a href="${social[key]}" target="_blank" rel="noopener noreferrer" class="team-card__social-link" title="${key}"><i class="${SOCIAL_ICONS[key]}"></i></a>`)
                    .join('');
                const emailHtml = member.email
                    ? `<a href="mailto:${member.email}" class="team-card__social-link" title="Email"><i class="fa-solid fa-envelope"></i></a>`
                    : '';
                return `<div class="team-card" aria-expanded="false">
                    <img src="${member.image}" alt="${t.name}" class="team-card__photo" loading="lazy">
                    <div class="team-card__name">${t.name}</div>
                    <div class="team-card__role">${t.role}</div>
                    <div class="team-card__desc-wrap">
                        <p class="team-card__desc">${t.description}</p>
                    </div>
                    <button type="button" class="team-card__toggle" data-more="${moreLabel}" data-less="${lessLabel}" aria-label="${moreLabel}" title="${moreLabel}"><i class="fa-solid fa-chevron-down"></i></button>
                    <div class="team-card__socials">${socialLinks}${emailHtml}</div>
                </div>`;
            }).join('');
            requestAnimationFrame(() => initTeamToggles(grid));
        })
        .catch(err => console.error('Failed to load team.json:', err));
}

function initTeamToggles(grid) {
    grid.querySelectorAll('.team-card').forEach(card => {
        const wrap = card.querySelector('.team-card__desc-wrap');
        const desc = card.querySelector('.team-card__desc');
        const btn = card.querySelector('.team-card__toggle');
        if (!wrap || !desc || !btn) return;
        if (desc.scrollHeight <= wrap.clientHeight + 1) {
            btn.remove();
            return;
        }
        btn.addEventListener('click', () => {
            const expanded = card.getAttribute('aria-expanded') === 'true';
            card.setAttribute('aria-expanded', String(!expanded));
            const label = expanded ? btn.dataset.more : btn.dataset.less;
            btn.setAttribute('aria-label', label);
            btn.setAttribute('title', label);
        });
    });
}

renderTeam(CURRENT_LANG);

// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Expandable aspect cards
document.querySelectorAll('.aspect-card--expandable').forEach(card => {
    const toggle = () => {
        const expanded = card.getAttribute('aria-expanded') === 'true';
        card.setAttribute('aria-expanded', String(!expanded));
    };
    card.addEventListener('click', toggle);
    card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
});

// Sticky Header effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.style.padding = '5px 0';
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.padding = '0';
        header.style.boxShadow = 'none';
    }
});

$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

});


if (document.querySelector('.typing-text')) {
    var typed = new Typed(".typing-text", {
        strings: ["Data Analysis", "Artificial Intelligence", "Data Science", "Machine Learning", "Deep Learning", "Neural Networks", "AI Development", "Blockchain Technology", "3D Animation", "VFX"],
        loop: true,
        typeSpeed: 50,
        backSpeed: 25,
        backDelay: 500,
    });
}
// <!-- typed js effect ends -->

async function fetchData(type = "skills") {
    const filename = type === "skills" ? "skills.json" : "achievements.json";
    const response = await fetch(`/${filename}`);

    if (!response.ok) {
        throw new Error(`Unable to load /${filename}: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
        throw new Error(`Expected /${filename} to contain a JSON array`);
    }

    return data;
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    if (!skillsContainer) return;
    let skillList = Array.isArray(skills) ? skills : [];
    let skillHTML = "";
    skillList.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img src="${skill.icon}" alt="skill" />
                <span>${skill.name}</span>
              </div>
            </div>`;
    });
    skillsContainer.innerHTML = skillHTML;

    // Ensure elements are visible
    let bars = skillsContainer.querySelectorAll('.bar');
    bars.forEach(bar => {
        bar.style.visibility = 'visible';
        bar.style.opacity = '1';
    });

    if (typeof ScrollReveal !== 'undefined') {
        const srtop = ScrollReveal({
            origin: 'top',
            distance: '80px',
            duration: 1200,
            reset: true,
            mobile: true,
            easing: 'cubic-bezier(0.5, 0, 0, 1)'
        });
        srtop.reveal('.skills .container .bar', { origin: 'bottom', interval: 60 });
    }
}

function showAchievements(achievements) {
    let achievementsContainer = document.querySelector("#achievements .box-container");
    if (!achievementsContainer) return;

    let achievementList = Array.isArray(achievements) ? achievements : [];

    let path = window.location.pathname.toLowerCase();
    let isAchievementsPage = path.includes("achievements");
    let isMainPage = !isAchievementsPage;

    let displayAchievements = isMainPage ? achievementList.slice(0, 3) : achievementList;

    let achievementHTML = "";
    displayAchievements.forEach(ach => {
        let achType = ach.type || "certificate";
        let descHtml = ach.desc ? `<p>${ach.desc}</p>` : '';

        if (achType === "badge") {
            achievementHTML += `
            <div class="box badge-card tilt ${achType}">
              <div class="badge-inner">
                <div class="badge-front">
                  <img draggable="false" src="${ach.image}" alt="badge" onerror="this.onerror=null; this.src='/assets/images/certificate-placeholder.svg';" />
                </div>
                <div class="badge-back">
                  <h3>${ach.name}</h3>
                  ${descHtml}
                  <div class="btns">
                    <a href="${ach.link}" class="btn" target="_blank"><i class="fas fa-external-link-alt"></i> Verify</a>
                  </div>
                </div>
              </div>
            </div>`;
        } else {
            achievementHTML += `
            <div class="box tilt ${achType}">
              <img draggable="false" src="${ach.image}" alt="achievement" onerror="this.onerror=null; this.src='/assets/images/certificate-placeholder.svg';" />
              <div class="content">
                <div class="tag">
                <h3>${ach.name}</h3>
                </div>
                <div class="desc">
                  ${descHtml}
                  <div class="btns">
                    <a href="${ach.link}" class="btn" target="_blank"><i class="fas fa-external-link-alt"></i> Verify</a>
                  </div>
                </div>
              </div>
            </div>`;
        }
    });
    achievementsContainer.innerHTML = achievementHTML;

    // Ensure elements are immediately visible even if ScrollReveal fails or is on mobile
    let boxes = achievementsContainer.querySelectorAll('.box');
    boxes.forEach(box => {
        box.style.visibility = 'visible';
        box.style.opacity = '1';
        box.style.display = 'block';
    });

    // tilt js effect
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".tilt"), {
            max: 15,
        });
    }

    // Simple flexbox-friendly filter
    if (document.querySelector('.work .button-group')) {
        let filterButtons = document.querySelectorAll('.work .button-group .btn');

        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('is-checked'));
                btn.classList.add('is-checked');

                let filterValue = btn.getAttribute('data-filter');

                boxes.forEach(box => {
                    if (filterValue === '*' || box.classList.contains(filterValue.replace('.', ''))) {
                        box.style.display = 'block';
                        box.style.visibility = 'visible';
                        box.style.opacity = '1';
                        box.style.transform = 'none';
                    } else {
                        box.style.display = 'none';
                    }
                });
            });
        });
    }

    /* ===== SCROLL REVEAL ANIMATION ===== */
    if (typeof ScrollReveal !== 'undefined') {
        const srtop = ScrollReveal({
            origin: 'top',
            distance: '80px',
            duration: 1200,
            reset: true,
            viewFactor: 0.1,
            mobile: true,
            easing: 'cubic-bezier(0.5, 0, 0, 1)'
        });
        srtop.reveal('.work .box', { origin: 'bottom', interval: 80 });
    }
}

fetchData("skills")
    .then(showSkills)
    .catch(error => console.error("Skills loading failed:", error));

fetchData("achievements")
    .then(showAchievements)
    .catch(error => console.error("Achievements loading failed:", error));

// <!-- tilt js effect starts -->
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
    });
}

// disable developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}

/* ===== SCROLL REVEAL ANIMATION ===== */
if (typeof ScrollReveal !== 'undefined') {
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1200,
        reset: true,
        mobile: true,
        easing: 'cubic-bezier(0.5, 0, 0, 1)'
    });

    srtop.reveal('.about .content h3', { origin: 'bottom' });
    srtop.reveal('.about .content .tag', { origin: 'bottom' });
    srtop.reveal('.about .content p', { origin: 'bottom' });
    srtop.reveal('.about .content .box-container', { origin: 'bottom' });
    srtop.reveal('.about .content .resumebtn', { origin: 'bottom' });
    srtop.reveal('.about .image', { origin: 'left' });
    srtop.reveal('.skills .container', { origin: 'bottom' });
    srtop.reveal('.education .box', { origin: 'bottom' });
    srtop.reveal('.contact .container', { origin: 'bottom' });
}
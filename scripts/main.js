async function loadComponent(id, filePaths) {
    const paths = Array.isArray(filePaths) ? filePaths : [filePaths];
    let html = "";

    for (const path of paths) {
        try {
            const response = await fetch(path);

            if (response.ok) {
                html = await response.text();
                break;
            }
        } catch (error) {
            // Try the next fallback path.
        }
    }

    if (!html) {
        return;
    }

    document.getElementById(id).innerHTML = html;

    if (window.lucide) {
        lucide.createIcons();
    }
}

async function init() {
    await loadComponent("navbar", ["./components/navbar.html", "../components/navbar.html"]);
    await loadComponent("footer", ["./components/footer.html", "../components/footer.html"]);

    const isNestedPage = /\/pages\/[^/]+$/i.test(window.location.pathname);
    const rootPrefix = isNestedPage ? "../" : "./";

    document.querySelectorAll("[data-site-href]").forEach((el) => {
        const sitePath = el.getAttribute("data-site-href");

        if (sitePath) {
            el.setAttribute("href", `${rootPrefix}${sitePath}`);
        }
    });

    document.querySelectorAll("[data-site-src]").forEach((el) => {
        const sitePath = el.getAttribute("data-site-src");

        if (sitePath) {
            el.setAttribute("src", `${rootPrefix}${sitePath}`);
        }
    });

    const normalizePath = (path) => {
        if (!path) {
            return "/";
        }

        const cleanedPath = path.replace(/\/Index\.html$/i, "/");
        return cleanedPath.length > 1 ? cleanedPath.replace(/\/$/, "") : cleanedPath;
    };

    const currentPath = normalizePath(window.location.pathname);
    const navLinks = document.querySelectorAll(".navbar-div-link");

    navLinks.forEach((link) => {
        const linkPath = normalizePath(new URL(link.getAttribute("href"), window.location.origin).pathname);
        link.classList.toggle("active", linkPath === currentPath);
    });

    const navbar = document.querySelector(".navbar-div");
    const navToggle = document.querySelector(".navbar-div-toggle");

    if (navbar && navToggle) {
        navToggle.addEventListener("click", () => {
            navbar.classList.toggle("navbar-div-active");

            document.body.style.overflow =
                navbar.classList.contains("navbar-div-active") ? "hidden" : "";
        });

        document.addEventListener("click", (event) => {
            if (!navbar.contains(event.target) && navbar.classList.contains("navbar-div-active")) {
                navbar.classList.remove("navbar-div-active");
                document.body.style.overflow = "";
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 968) {
                navbar.classList.remove("navbar-div-active");
                document.body.style.overflow = "";
            }
        });
    }
    window.addEventListener('scroll', function () {
        const heroImg = document.querySelector('.hero-image');
        const offset = window.pageYOffset;

        if (heroImg) {
            heroImg.style.transform = 'translateY(' + offset * 0.4 + 'px)';
        }
    });

    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-block').forEach((element) => {
        observer.observe(element);
    });
}

init();
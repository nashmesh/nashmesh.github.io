function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return undefined;
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

document.addEventListener("DOMContentLoaded", function () {
    // Tab URL hash tracking
    function slugify(text) {
        return text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }

    function activateTabFromHash() {
        var hash = window.location.hash.slice(1);
        if (!hash) return;

        // Hash format: "tabslug" or "tabslug.sectionid"
        var dotIdx = hash.indexOf('.');
        var tabSlug = dotIdx !== -1 ? hash.slice(0, dotIdx) : hash;
        var sectionId = dotIdx !== -1 ? hash.slice(dotIdx + 1) : null;

        var activeBlock = null;
        document.querySelectorAll('.tabbed-labels > label').forEach(function (label) {
            if (slugify(label.textContent.trim()) === tabSlug) {
                var input = document.getElementById(label.getAttribute('for'));
                if (input) {
                    input.checked = true;
                    var set = label.closest('.tabbed-set');
                    var labels = Array.from(set.querySelectorAll(':scope > .tabbed-labels > label'));
                    var idx = labels.indexOf(label);
                    var blocks = set.querySelectorAll(':scope > .tabbed-content > .tabbed-block');
                    if (blocks[idx]) activeBlock = blocks[idx];
                }
            }
        });

        if (sectionId && activeBlock) {
            requestAnimationFrame(function () {
                // Match exact ID or ID with _N suffix (MkDocs deduplication)
                var target = activeBlock.querySelector('[id="' + sectionId + '"]')
                    || activeBlock.querySelector('[id^="' + sectionId + '_"]');
                if (!target) target = document.getElementById(sectionId);
                if (target) target.scrollIntoView({ behavior: 'auto', block: 'start' });
            });
        }
    }

    document.querySelectorAll('.tabbed-labels > label').forEach(function (label) {
        label.addEventListener('click', function () {
            history.replaceState(null, '', '#' + slugify(label.textContent.trim()));
        });
    });

    activateTabFromHash();

    // TOC link: keep tab prefix in hash, activate tab if hidden
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            var rawId = this.getAttribute('href').slice(1);
            var sectionId = rawId.replace(/_\d+$/, ''); // strip MkDocs _N dedup suffix for clean URL
            var target = document.getElementById(rawId); // use original ID to find the right element
            if (!target) return;

            var block = target.closest('.tabbed-block');
            if (!block) return;

            var set = block.closest('.tabbed-set');
            var blocks = Array.from(set.querySelectorAll(':scope > .tabbed-content > .tabbed-block'));
            var idx = blocks.indexOf(block);
            var inputs = set.querySelectorAll(':scope > input[type="radio"]');
            var labels = set.querySelectorAll(':scope > .tabbed-labels > label');
            var tabSlug = labels[idx] ? slugify(labels[idx].textContent.trim()) : null;

            if (getComputedStyle(block).display === 'none') {
                if (inputs[idx]) inputs[idx].checked = true;
            }

            if (tabSlug) {
                e.preventDefault();
                history.replaceState(null, '', '#' + tabSlug + '.' + sectionId);
                requestAnimationFrame(function () {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                });
            }
        });
    });

    // Heading anchor links (skip home page, guard against double-injection)
    var isHomePage = window.location.pathname === '/' || window.location.pathname.endsWith('/index.html');
    if (!isHomePage) document.querySelectorAll('article h1[id], article h2[id], article h3[id], article h4[id]').forEach(function (heading) {
        if (heading.querySelector('.heading-anchor')) return;
        var anchor = document.createElement('a');
        anchor.className = 'heading-anchor';
        anchor.textContent = '#';
        anchor.href = '#' + heading.id;
        anchor.title = 'Copy link to this section';
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            var rawId = heading.id;
            var sectionId = rawId.replace(/_\d+$/, '');
            var block = heading.closest('.tabbed-block');
            var hash;
            if (block) {
                var set = block.closest('.tabbed-set');
                var blocks = Array.from(set.querySelectorAll(':scope > .tabbed-content > .tabbed-block'));
                var idx = blocks.indexOf(block);
                var labels = set.querySelectorAll(':scope > .tabbed-labels > label');
                var tabSlug = labels[idx] ? slugify(labels[idx].textContent.trim()) : null;
                hash = tabSlug ? '#' + tabSlug + '.' + sectionId : '#' + sectionId;
            } else {
                hash = '#' + sectionId;
            }
            history.replaceState(null, '', hash);
            heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        heading.appendChild(anchor);
    });

    // Mobile TOC — "On this page" collapsible bar
    (function () {
        var sidebarNav = document.querySelector('.sidebar .nav.flex-column');
        var post = document.querySelector('.post');
        if (!sidebarNav || !post || document.getElementById('mobile-toc')) return;

        var toc = document.createElement('div');
        toc.id = 'mobile-toc';
        toc.className = 'mobile-toc collapsed';

        var header = document.createElement('button');
        header.className = 'mobile-toc-header';
        header.innerHTML = '<span>On this page</span><span class="mobile-toc-arrow"></span>';

        var clonedNav = sidebarNav.cloneNode(true);
        // Strip collapsible classes so all items are visible in mobile TOC
        clonedNav.querySelectorAll('.toc-sub').forEach(function (el) {
            el.classList.remove('toc-sub', 'collapsed');
        });
        clonedNav.querySelectorAll('.toc-arrow').forEach(function (el) {
            el.remove();
        });

        var body = document.createElement('div');
        body.className = 'mobile-toc-body';
        body.appendChild(clonedNav);

        toc.appendChild(header);
        toc.appendChild(body);
        post.insertBefore(toc, post.firstChild);

        header.addEventListener('click', function () {
            var collapsed = toc.classList.toggle('collapsed');
            header.querySelector('.mobile-toc-arrow').classList.toggle('open', !collapsed);
        });

        // Stick below the sticky nav
        var nav = document.querySelector('header:first-of-type');
        if (nav) {
            toc.style.top = nav.offsetHeight + 'px';
        }
    })();

    // Wrap h2 sections in alternating background containers
    document.querySelectorAll('.tabbed-block').forEach(function (block) {
        var children = Array.from(block.children);
        var sections = [];
        var current = null;

        children.forEach(function (child) {
            if (child.tagName === 'H2') {
                current = { nodes: [child] };
                sections.push(current);
            } else if (current) {
                current.nodes.push(child);
            }
        });

        sections.forEach(function (section, idx) {
            var div = document.createElement('div');
            div.className = 'content-section content-section--' + (idx % 2 === 0 ? 'a' : 'b');
            block.insertBefore(div, section.nodes[0]);
            section.nodes.forEach(function (node) { div.appendChild(node); });
        });
    });

    // Copy buttons for explicitly marked code blocks
    document.querySelectorAll(".copyable-code pre").forEach(function (pre) {
        var btn = document.createElement("button");
        btn.className = "code-copy-btn";
        btn.textContent = "Copy";
        pre.style.position = "relative";
        pre.appendChild(btn);
        btn.addEventListener("click", function () {
            var code = pre.querySelector("code");
            navigator.clipboard.writeText(code ? code.innerText : pre.innerText).then(function () {
                btn.textContent = "Copied!";
                btn.classList.add("code-copy-btn--copied");
                setTimeout(function () {
                    btn.textContent = "Copy";
                    btn.classList.remove("code-copy-btn--copied");
                }, 2000);
            });
        });
    });


    let currentTheme = getCookie("nashmesh-theme");

    if (currentTheme === undefined) {
        setCookie("nashmesh-theme", "dark", 99999);
        currentTheme = "dark";
    }

    let t = {
        dark: {
            "--text": "white",
            "--title": "white",
            "--primary": "white",
            "--background": "black",
        },
        light: {
            "--text": "black",
            "--title": "black",
            "--primary": "black",
            "--background": "white",
        },
        retro: {
            "--text": "#aaaaff",
            "--title": "#aaaaff",
            "--primary": "#aaaaff",
            "--background": "#4040aa",
        }
    };


    function applyTheme(themeName) {
        let n = t[themeName];
        for (var r in n) document.documentElement.style.setProperty(r, n[r]);
        document.body.classList.toggle("retro-theme", themeName === "retro");
        document.body.setAttribute("data-theme", themeName);
    }

    applyTheme(currentTheme);

    // Floating theme switcher widget
    if (!document.getElementById('theme-switcher')) {
        var switcher = document.createElement('div');
        switcher.id = 'theme-switcher';
        switcher.innerHTML = `
            <div class="theme-switcher-options" id="theme-switcher-options">
                <button class="color-button theme-option" data-theme="light" title="Light">☀️</button>
                <button class="color-button theme-option" data-theme="dark" title="Dark">🌙</button>
                <button class="color-button theme-option" data-theme="retro" title="Retro">👾</button>
            </div>
            <button class="theme-switcher-toggle" id="theme-switcher-toggle" title="Change theme">🎨</button>
        `;
        document.body.appendChild(switcher);

        var toggle = document.getElementById('theme-switcher-toggle');
        var options = document.getElementById('theme-switcher-options');
        toggle.addEventListener('click', function (e) {
            e.stopPropagation();
            options.classList.toggle('open');
        });
        document.addEventListener('click', function () {
            options.classList.remove('open');
        });
    }

    [...document.querySelectorAll(".color-button")].forEach((e) => {
        e.addEventListener("click", () => {
            setCookie("nashmesh-theme", e.dataset.theme, 99999);
            applyTheme(e.dataset.theme);
            var options = document.getElementById('theme-switcher-options');
            if (options) options.classList.remove('open');
        });
    });

    var e = document.querySelectorAll("button[color-primary]");
    e.forEach(function (t) {
        t.addEventListener("click", function () {
            var t = this.getAttribute("color-primary");
            document.documentElement.style.setProperty("--primary", t);
        });
    });

    var e = document.querySelectorAll("button[color-text]");
    e.forEach(function (t) {
        t.addEventListener("click", function () {
            var t = this.getAttribute("color-text");
            document.documentElement.style.setProperty("--text", t);
        });
    });

    var e = document.querySelectorAll("button[color-title]");
    e.forEach(function (t) {
        t.addEventListener("click", function () {
            var t = this.getAttribute("color-title");
            document.documentElement.style.setProperty("--title", t);
        });
    });

    var e = document.querySelectorAll("button[color-background]");
    e.forEach(function (t) {
        t.addEventListener("click", function () {
            var t = this.getAttribute("color-background");
            document.documentElement.style.setProperty("--background", t);
        });
    });

    var e = document.querySelectorAll("button[style-site-name]");
    e.forEach(function (t) {
        t.addEventListener("click", function () {
            var t = this.getAttribute("style-site-name");
            (title = document.getElementById("component-site-name").classList).remove(
                "bold"
            ),
                title.remove("italic"),
                title.remove("scratched"),
                title.remove("underline"),
                title.remove("overline"),
                title.add(t);
        });
    });

    var e = document.querySelectorAll("button[style-title]");
    e.forEach(function (t) {
        t.addEventListener("click", function () {
            var t = this.getAttribute("style-title");
            (title = document.getElementById("component-title").classList).remove(
                "bold"
            ),
                title.remove("italic"),
                title.remove("scratched"),
                title.remove("underline"),
                title.remove("overline"),
                title.add(t);
        });
    });

    var e = document.querySelectorAll("button[component-id]");
    e.forEach(function (t) {
        t.addEventListener("click", function () {
            var t = this.getAttribute("component-id"),
                e = this.getAttribute("status");
            document.getElementById(t).hidden = JSON.parse(e);
        });
    });

    var sidebarTrue = document.getElementById("sidebar-true");
    if (sidebarTrue) {
        sidebarTrue.addEventListener("click", function () {
            document.getElementById("component-sidebar").style.display = null;
            document
                .getElementById("component-sidebar")
                .classList.replace("col-0", "col-3");
            document
                .getElementById("component-content")
                .classList.replace("col-12", "col-9");
        });
    }

    var sidebarFalse = document.getElementById("sidebar-false");
    if (sidebarFalse) {
        sidebarFalse.addEventListener("click", function () {
            document.getElementById("component-sidebar").style.display = "none";
            document
                .getElementById("component-sidebar")
                .classList.replace("col-3", "col-0");
            document
                .getElementById("component-content")
                .classList.replace("col-9", "col-12");
        });
    }
});
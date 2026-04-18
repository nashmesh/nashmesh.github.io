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

    [...document.querySelectorAll(".color-button")].forEach((e) => {
        e.addEventListener("click", () => {
            setCookie("nashmesh-theme", e.dataset.theme, 99999);
            applyTheme(e.dataset.theme);
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
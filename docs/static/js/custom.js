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

function scrollToEl(el, smooth) {
    var nav = document.querySelector('header:first-of-type');
    var mobileToc = document.getElementById('mobile-toc');
    var offset = nav ? nav.offsetHeight : 0;
    // Always include the mobile TOC height (header is always sticky, body adds more when open)
    if (mobileToc && mobileToc.offsetHeight) offset += mobileToc.offsetHeight;
    offset += 6;
    var top = el.getBoundingClientRect().top + window.scrollY - offset;

    if (!smooth) {
        window.scrollTo({ top: top, behavior: 'auto' });
        return;
    }

    // Native `behavior: 'smooth'` scales its duration with distance, which makes
    // jumping to a TOC section on a long page feel sluggish. Animate manually with
    // a short, fixed duration instead so every jump feels equally snappy.
    var startY = window.scrollY;
    var distance = top - startY;
    var duration = 60;
    var startTime = null;

    function easeOutQuad(t) { return t * (2 - t); }

    function step(timestamp) {
        if (startTime === null) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        window.scrollTo(0, startY + distance * easeOutQuad(progress));
        if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

document.addEventListener("DOMContentLoaded", function () {
    var bannerContainer = document.getElementById("banner-container");

    // Upcoming meetup callout (persistent - not dismissible, stays until the event passes)
    if (window.NASHME_MEETUPS && window.NASHME_MEETUPS.length) {
        var now = new Date();
        var upcomingMeetups = window.NASHME_MEETUPS.filter(function (m) {
            return new Date((m.event_date || m.date) + "T23:59:59") >= now;
        });
        upcomingMeetups.sort(function (a, b) {
            return new Date(a.event_date || a.date) - new Date(b.event_date || b.date);
        });
        var nextMeetup = upcomingMeetups[0];

        if (nextMeetup && bannerContainer && !document.querySelector(".new-meetup-banner")) {
            var meetupBanner = document.createElement("div");
            meetupBanner.className = "meetup-banner new-meetup-banner";
            var meetupText = document.createElement("div");
            meetupText.className = "meetup-banner-text";
            var meetupStrong = document.createElement("strong");
            meetupStrong.textContent = "Upcoming Meetup";
            meetupText.appendChild(meetupStrong);
            meetupText.appendChild(document.createElement("br"));
            meetupText.appendChild(document.createTextNode(nextMeetup.title));
            var meetupBtn = document.createElement("a");
            meetupBtn.className = "meetup-banner-btn";
            meetupBtn.href = nextMeetup.url;
            meetupBtn.textContent = "Learn More →";
            meetupBanner.appendChild(meetupText);
            meetupBanner.appendChild(meetupBtn);
            bannerContainer.appendChild(meetupBanner);
        }
    }

    // New post notification
    if (window.NASHME_POSTS && window.NASHME_POSTS.length) {
        var cutoff = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        var recentPost = null;
        for (var i = 0; i < window.NASHME_POSTS.length; i++) {
            var p = window.NASHME_POSTS[i];
            if (new Date(p.date + "T00:00:00") < cutoff) break;
            if (p.hideNewPostBanner) continue;
            recentPost = p;
            break;
        }
        if (recentPost) {
            var dismissKey = "new-post-dismissed:" + recentPost.url;
            if (!localStorage.getItem(dismissKey) && !document.querySelector(".new-post-banner")) {
                var banner = document.createElement("div");
                banner.className = "meetup-banner new-post-banner";
                var text = document.createElement("div");
                text.className = "meetup-banner-text";
                var strong = document.createElement("strong");
                strong.textContent = "New Post";
                text.appendChild(strong);
                text.appendChild(document.createElement("br"));
                text.appendChild(document.createTextNode(recentPost.title));
                var btn = document.createElement("a");
                btn.className = "meetup-banner-btn";
                btn.href = recentPost.url;
                btn.textContent = "Read More →";
                var dismiss = document.createElement("button");
                dismiss.className = "new-post-dismiss-btn";
                dismiss.textContent = "✕";
                dismiss.addEventListener("click", (function (key, el) {
                    return function () { localStorage.setItem(key, "1"); el.remove(); };
                })(dismissKey, banner));
                banner.appendChild(text);
                banner.appendChild(btn);
                banner.appendChild(dismiss);
                if (bannerContainer) bannerContainer.appendChild(banner);
            }
        }
    }

    // Featured guide banner (manually curated, dismissible - not tied to a blog post's date)
    (function () {
        var guide = {
            key: "regions-guide",
            title: "New Guide: Regions",
            text: "See how MeshCore regions scope traffic across Middle TN.",
            url: "/getting-started/meshcore/#regions",
        };
        var dismissKey = "guide-dismissed:" + guide.key;
        if (!bannerContainer || localStorage.getItem(dismissKey) || document.querySelector(".new-guide-banner")) return;

        var banner = document.createElement("div");
        banner.className = "meetup-banner new-post-banner new-guide-banner";
        var text = document.createElement("div");
        text.className = "meetup-banner-text";
        var strong = document.createElement("strong");
        strong.textContent = guide.title;
        text.appendChild(strong);
        text.appendChild(document.createElement("br"));
        text.appendChild(document.createTextNode(guide.text));
        var btn = document.createElement("a");
        btn.className = "meetup-banner-btn";
        btn.href = guide.url;
        btn.textContent = "Read More →";
        var dismiss = document.createElement("button");
        dismiss.className = "new-post-dismiss-btn";
        dismiss.textContent = "✕";
        dismiss.addEventListener("click", function () {
            localStorage.setItem(dismissKey, "1");
            banner.remove();
        });
        banner.appendChild(text);
        banner.appendChild(btn);
        banner.appendChild(dismiss);
        bannerContainer.appendChild(banner);
    })();

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
                if (target) scrollToEl(target, false);
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
    // Use event delegation so dynamically injected links (mobile TOC) are also handled.
    // Guard against double-firing from double script load.
    if (!document.__hashClickHandlerAttached) {
        document.__hashClickHandlerAttached = true;
        document.addEventListener('click', function (e) {
            var link = e.target.closest('a[href^="#"]');
            if (!link) return;

            var rawId = link.getAttribute('href').slice(1);
            if (!rawId) return;
            var sectionId = rawId.replace(/_\d+$/, '');
            var target = document.getElementById(rawId);
            if (!target) return;

            e.preventDefault();

            // Collapse mobile TOC if the clicked link is inside it
            var mobileToc = document.getElementById('mobile-toc');
            if (mobileToc && link.closest('#mobile-toc')) {
                // Force instant collapse (skip CSS transition) so layout is settled before scroll
                var tocBody = mobileToc.querySelector('.mobile-toc-body');
                if (tocBody) {
                    tocBody.style.transition = 'none';
                    tocBody.style.maxHeight = '0';
                    tocBody.style.paddingBottom = '0';
                }
                mobileToc.classList.add('collapsed');
                var arrow = mobileToc.querySelector('.mobile-toc-arrow');
                if (arrow) arrow.classList.remove('open');
                // Restore CSS control after scroll so the TOC can be reopened
                setTimeout(function () {
                    if (tocBody) {
                        tocBody.style.transition = '';
                        tocBody.style.maxHeight = '';
                        tocBody.style.paddingBottom = '';
                    }
                }, 50);
            }

            var block = target.closest('.tabbed-block');
            if (!block) {
                history.replaceState(null, '', '#' + sectionId);
                requestAnimationFrame(function () {
                    scrollToEl(target, true);
                });
                return;
            }

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
                history.replaceState(null, '', '#' + tabSlug + '.' + sectionId);
                requestAnimationFrame(function () {
                    scrollToEl(target, true);
                });
            }
        });
    }

    // Heading anchor links (skip home page, guard against double-injection)
    var isHomePage = window.location.pathname === '/' || window.location.pathname.endsWith('/index.html');
    if (!isHomePage) document.querySelectorAll('article h1[id], article h2[id], article h3[id], article h4[id], article h5[id]').forEach(function (heading) {
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
            scrollToEl(heading, true);
        });
        heading.appendChild(anchor);
    });

    // Mobile TOC — "On this page" collapsible bar
    (function () {
        if (isHomePage) return;
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

        // Fade the mobile TOC out when the main navbar opens, fade it back in when it closes.
        var navMenu = document.getElementById('navbarsMenu');
        if (navMenu) {
            navMenu.addEventListener('show.bs.collapse', function () {
                toc.classList.add('collapsed');
                var arrow = toc.querySelector('.mobile-toc-arrow');
                if (arrow) arrow.classList.remove('open');
                toc.style.opacity = '0';
                toc.style.pointerEvents = 'none';
            });
            navMenu.addEventListener('hide.bs.collapse', function () {
                toc.style.opacity = '';
                toc.style.pointerEvents = '';
            });
        }

        // It sticks below the nav via CSS `top: var(--header-height)`, which is
        // kept in sync with the live header height on resize (see below).
    })();

    // Expose the sticky header height so the desktop sidebar TOC can lock
    // just beneath it (kept in sync on resize).
    (function () {
        var nav = document.querySelector('header:first-of-type');
        if (!nav) return;
        function setHeaderHeight() {
            document.documentElement.style.setProperty('--header-height', nav.offsetHeight + 'px');
        }
        setHeaderHeight();
        window.addEventListener('resize', setHeaderHeight);
        // Re-measure once the logo image and web fonts have loaded — otherwise
        // a refresh while scrolled down pins the TOC to a too-short header and
        // it hides beneath the finished (taller) nav.
        window.addEventListener('load', setHeaderHeight);
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(setHeaderHeight);
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
            <button class="back-to-top" id="back-to-top" title="Back to top" aria-label="Back to top">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M8 13V3.5M8 3.5 3.5 8M8 3.5 12.5 8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <div class="theme-switcher-widget">
                <div class="theme-switcher-options" id="theme-switcher-options">
                    <button class="color-button theme-option" data-theme="light" title="Light"></button>
                    <button class="color-button theme-option" data-theme="dark" title="Dark"></button>
                    <button class="color-button theme-option" data-theme="retro" title="Retro"></button>
                </div>
                <button class="theme-switcher-toggle" id="theme-switcher-toggle" title="Change theme">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.5"/>
                        <path d="M8 1.5a6.5 6.5 0 0 1 0 13V1.5z" fill="currentColor"/>
                    </svg>
                </button>
            </div>
        `;
        document.body.appendChild(switcher);

        var toggle = document.getElementById('theme-switcher-toggle');
        var options = document.getElementById('theme-switcher-options');
        toggle.addEventListener('click', function (e) {
            e.stopPropagation();
            var open = options.classList.toggle('open');
            // Hide the back-to-top button while the theme options are expanded
            // so the popout doesn't collide with it.
            switcher.classList.toggle('options-open', open);
        });
        document.addEventListener('click', function () {
            options.classList.remove('open');
            switcher.classList.remove('options-open');
        });

        // Back-to-top button: reveal once the page has been scrolled down far
        // enough (about three-quarters of a viewport) to warrant it.
        var backToTop = document.getElementById('back-to-top');
        backToTop.addEventListener('click', function (e) {
            e.stopPropagation();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        var backToTopTicking = false;
        function updateBackToTop() {
            backToTopTicking = false;
            switcher.classList.toggle('show-back-to-top',
                window.scrollY > window.innerHeight * 0.75);
        }
        window.addEventListener('scroll', function () {
            if (!backToTopTicking) {
                backToTopTicking = true;
                window.requestAnimationFrame(updateBackToTop);
            }
        }, { passive: true });
        updateBackToTop();
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

    // Homepage posts + meetups lists
    (function () {
        function formatDate(dateStr) {
            var d = new Date(dateStr + 'T00:00:00');
            return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        }

        var hpPosts = document.getElementById('hp-posts');
        if (hpPosts && window.NASHME_POSTS && window.NASHME_POSTS.length) {
            hpPosts.innerHTML = window.NASHME_POSTS.slice(0, 5).map(function (p) {
                return '<a href="' + p.url + '" class="hp-post-item">' +
                    '<span class="hp-post-date">' + formatDate(p.date) + '</span>' +
                    '<span class="hp-post-title">' + p.title + '</span>' +
                    '</a>';
            }).join('');
        }

        var hpMeetups = document.getElementById('hp-meetups');
        if (hpMeetups && window.NASHME_MEETUPS && window.NASHME_MEETUPS.length) {
            hpMeetups.innerHTML = window.NASHME_MEETUPS.slice(0, 5).map(function (m) {
                return '<a href="' + m.url + '" class="hp-post-item">' +
                    '<span class="hp-post-date">' + formatDate(m.event_date || m.date) + '</span>' +
                    '<span class="hp-post-title">' + m.title + '</span>' +
                    '</a>';
            }).join('');
        }
    })();

    // Image lightbox
    if (!document.querySelector('.img-lightbox-overlay')) {
        var overlay = document.createElement('div');
        overlay.className = 'img-lightbox-overlay';
        var overlayImg = document.createElement('img');
        overlay.appendChild(overlayImg);
        document.body.appendChild(overlay);

        document.querySelectorAll('.img-thumbnail').forEach(function (img) {
            img.addEventListener('click', function (e) {
                e.stopPropagation();
                overlayImg.src = img.src;
                overlay.classList.add('open');
            });
        });

        overlay.addEventListener('click', function (e) {
            e.stopPropagation();
            overlay.classList.remove('open');
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') overlay.classList.remove('open');
        });
    }
});
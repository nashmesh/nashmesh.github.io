import os
import json
import shutil
import yaml


def on_post_build(env):
    site_dir = env.conf["site_dir"]
    built_404 = os.path.join(site_dir, "404", "index.html")
    if os.path.exists(built_404):
        shutil.copyfile(built_404, os.path.join(site_dir, "404.html"))


def define_env(env):
    @env.macro
    def recent_posts_json():
        docs_dir = env.conf["docs_dir"]
        posts_dir = os.path.join(docs_dir, "posts")
        posts = []
        if not os.path.isdir(posts_dir):
            return json.dumps(posts)
        for fname in os.listdir(posts_dir):
            if not fname.endswith(".md"):
                continue
            fpath = os.path.join(posts_dir, fname)
            with open(fpath, encoding="utf-8") as f:
                content = f.read()
            if not content.startswith("---"):
                continue
            parts = content.split("---", 2)
            if len(parts) < 3:
                continue
            try:
                meta = yaml.safe_load(parts[1])
                if meta and "date" in meta and "title" in meta:
                    slug = fname[:-3]
                    posts.append({
                        "title": str(meta["title"]),
                        "date": str(meta["date"])[:10],
                        "url": "/posts/" + slug + "/",
                        "hideNewPostBanner": bool(meta.get("hide_new_post_banner")),
                    })
            except Exception:
                pass
        posts.sort(key=lambda p: p["date"], reverse=True)
        return json.dumps(posts)

    @env.macro
    def recent_meetups_json():
        docs_dir = env.conf["docs_dir"]
        meetups_dir = os.path.join(docs_dir, "meetups")
        meetups = []
        if not os.path.isdir(meetups_dir):
            return json.dumps(meetups)
        for fname in os.listdir(meetups_dir):
            if not fname.endswith(".md"):
                continue
            fpath = os.path.join(meetups_dir, fname)
            with open(fpath, encoding="utf-8") as f:
                content = f.read()
            if not content.startswith("---"):
                continue
            parts = content.split("---", 2)
            if len(parts) < 3:
                continue
            try:
                meta = yaml.safe_load(parts[1])
                if meta and "date" in meta and "title" in meta:
                    slug = fname[:-3]
                    event_date = str(meta["event_date"])[:10] if "event_date" in meta else str(meta["date"])[:10]
                    meetups.append({
                        "title": str(meta["title"]),
                        "date": str(meta["date"])[:10],
                        "event_date": event_date,
                        "url": "/meetups/" + slug + "/",
                    })
            except Exception:
                pass
        meetups.sort(key=lambda m: m["event_date"], reverse=True)
        return json.dumps(meetups)

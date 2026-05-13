import os
import json
import yaml


def define_env(env):
    @env.macro
    def recent_posts_json():
        docs_dir = env.conf["docs_dir"]
        posts_dir = os.path.join(docs_dir, "posts")
        posts = []
        if not os.path.isdir(posts_dir):
            return json.dumps(posts)
        for fname in sorted(os.listdir(posts_dir), reverse=True):
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
                    })
            except Exception:
                pass
        return json.dumps(posts)

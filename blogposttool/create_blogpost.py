import os.path
from os import path
import json
from datetime import datetime, timezone
import shortuuid

from models.blog_post_meta_data import BlogPostMetaData

script_path = os.path.dirname(os.path.realpath(__file__))


def create():
    """
    Crates new blog post file with meta data
    """
    blogname = shortuuid.uuid()
    script_path = os.path.dirname(os.path.realpath(__file__))
    blogFilePath = f"{script_path}/../public/blogs/{blogname}.md"
    # Make sure file not already exists
    if path.exists(blogFilePath) == True:
        print(f"Blog with same file:{blogFilePath} already exists")
        return

    with open(blogFilePath, "w+") as f:
        f.write("```meta\n")
        f.write(
            json.dumps(
                BlogPostMetaData(
                    "[INSERT TITLE]",
                    "[INSERT DESCRIPTION]",
                    "GENERIC",
                    datetime.now(timezone.utc),
                    None,
                    shortuuid.uuid(),
                ).toJSON(),
                indent=4,
            )
        )
        f.write("\n```\n")
    print(f"New blog post created: {blogFilePath}")

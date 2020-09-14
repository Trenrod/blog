import os.path
from os import path
from typing import List, Dict
import json
from parse_data import collect_blogpost_metadata
from models.blog_post_meta_data import BlogPostMetaData

script_path = os.path.dirname(os.path.realpath(__file__))


def build():
    """
    Updates all meta files like and generates plantuml svg images to reference in the blog posts
    """
    blogpost_meta_data: List[BlogPostMetaData] = collect_blogpost_metadata()
    # Create last 10 Posts
    blogpost_meta_data.sort()
    with open(f"{script_path}/../public/data/home_data.json", "w+") as f:
        f.write(json.dumps([data.toJSON() for data in blogpost_meta_data], indent=4))

    # Create post groups
    tags: Dict[str, List[BlogPostMetaData]] = {}
    for blogpost_data in blogpost_meta_data:
        tag = blogpost_data.tag.lower()
        if not tag in tags:
            tags[tag] = []
        tags[tag].append(blogpost_data)

    # Create groups list
    with open(f"{script_path}/../public/data/tags.json", "w+") as f:
        f.write(json.dumps([value for value in tags.keys()], indent=4))

    # Create blogpost per group
    for tag in tags.keys():
        with open(f"{script_path}/../public/data/tag_{tag}.json", "w+") as f:
            f.write(json.dumps([data.toJSON() for data in tags[tag]], indent=4))

    # Create and replace ```plantuml with svg images

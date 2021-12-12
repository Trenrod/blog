import argparse

from build_meta import build
from create_blogpost import create


# create the top-level parser
parser = argparse.ArgumentParser(
    prog="Blog Post tool",
    usage="""
    Create new blog template:
    python3 main.py create

    Prepare for upload, creates meta data and plantuml svg images:
    python3 main.py build
    """,
)
subparsers = parser.add_subparsers(help="sub-command help")
# create the parser for the "a" command
parser_create = subparsers.add_parser("create", help="Creates a new blog post template")
parser_create.set_defaults(which="create")

# create the parser for the "b" command
parser_build = subparsers.add_parser(
    "build", help="Build blog post. Makes ready to upload."
)
parser_build.set_defaults(which="build")

if __name__ == "__main__":
    args = parser.parse_args()
    if args.which == "build":
        build()
    elif args.which == "create":
        create()
    else:
        parser.print_help()
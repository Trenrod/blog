import json
from typing import List
from models.blog_post_meta_data import BlogPostMetaData
from enum import Enum
import re, http.client, os.path, base64, string
from argparse import ArgumentParser
from io import open
from os import environ, path, makedirs
from zlib import compress
from os import path

script_path = os.path.dirname(os.path.realpath(__file__))
plantuml_alphabet = (
    string.digits + string.ascii_uppercase + string.ascii_lowercase + "-_"
)
base64_alphabet = string.ascii_uppercase + string.ascii_lowercase + string.digits + "+/"
b64_to_plantuml = bytes.maketrans(
    base64_alphabet.encode("utf-8"), plantuml_alphabet.encode("utf-8")
)


class CODE_TAG_TYPE(Enum):
    TEXT = 0
    META = 1
    PLANTUML = 2
    CODE = 3
    UNKNOWN = 4


def create_svg_from_plantumlcode(plantuml_code, filename):
    """
    Encodes given string to utf-8, compress
    """
    encode = compress(plantuml_code.encode("utf-8"))
    compressed_string = encode[2:-4]
    request_data = (
        base64.b64encode(compressed_string).translate(b64_to_plantuml).decode("utf-8")
    )
    conn = http.client.HTTPConnection("localhost:8080")
    conn.request("GET", f"/svg/{request_data}")
    r1 = conn.getresponse()
    with open(f"{script_path}/../public/images/{filename}", "w+b") as f:
        f.write(r1.read())
    conn.close()


def collect_blogpost_metadata() -> List[BlogPostMetaData]:
    """
    Collect all meta data from all blogs
    """
    blogpost_meta_data = []
    for filename in os.listdir(f"{script_path}/../public/blogs"):
        if filename.endswith(".md"):
            context = CODE_TAG_TYPE.UNKNOWN
            document = []
            is_valid = False
            plantuml_name = ""
            with open(f"{script_path}/../public/blogs/{filename}", "r+") as f:
                document = f.readlines()
                for index in range(len(document)):
                    line = document[index]
                    if is_valid or line.rstrip() == "```meta":
                        is_valid = True
                    else:
                        print(
                            f"ERROR - Currupt blogpost {filename}. Invalid header [```meta] != [{document[0].rstrip()}]"
                        )
                        exit()
                    if line.rstrip() == "```meta":
                        context = CODE_TAG_TYPE.META
                        meta_data = ""
                    else:
                        if re.match("^```plantuml.*", line.rstrip()):
                            context = CODE_TAG_TYPE.PLANTUML
                            plantuml_name = (
                                line.rstrip()
                                .replace("```plantuml", "")
                                .rstrip()
                                .lstrip()
                            )
                            meta_data = ""
                        else:
                            if line.rstrip() == "```":
                                if context == CODE_TAG_TYPE.META:
                                    try:
                                        blogpost_meta_data.append(
                                            BlogPostMetaData.fromJson(
                                                json.loads(meta_data)
                                            )
                                        )
                                    except Exception as e:
                                        try:
                                            print(
                                                f"ERROR - Failed to parse meta for file {filename}: {str(e)}"
                                            )
                                            exit()
                                        finally:
                                            e = None
                                            del e

                                elif context == CODE_TAG_TYPE.PLANTUML:
                                    image_filename = (
                                        f"{filename[:-3]}_{plantuml_name}.svg"
                                    )
                                    create_svg_from_plantumlcode(
                                        meta_data, image_filename
                                    )
                                    index += 1
                                    if not document[index].startswith("!["):
                                        document = (
                                            document[:index]
                                            + [
                                                f"![{plantuml_name}](/images/{image_filename})\n"
                                            ]
                                            + document[index:]
                                        )
                                    else:
                                        document = (
                                            document[:index]
                                            + [
                                                f"![{plantuml_name}](/images/{image_filename})\n"
                                            ]
                                            + document[index + 1 :]
                                        )
                                    meta_data = ""
                                context = CODE_TAG_TYPE.UNKNOWN
                            else:
                                meta_data += line

            with open(f"{script_path}/../public/blogs/{filename}", "w") as f:
                f.writelines(document)
    else:
        return blogpost_meta_data


# okay decompiling parse_data.cpython-38.pyc

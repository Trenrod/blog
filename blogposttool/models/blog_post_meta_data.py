from datetime import datetime


class BlogPostMetaData:
    def __init__(
        self, title, description, tag, created: datetime, updated: datetime, id
    ):
        self.title = title
        self.description = description
        self.tag = tag
        self.created: datetime = created
        self.updated: datetime = updated
        self.id = id
        self.raw_data = None

    @staticmethod
    def fromJson(jsonData: dict):
        return BlogPostMetaData(
            jsonData["title"],
            jsonData["description"],
            jsonData["tag"],
            datetime.fromisoformat(jsonData["created"]),
            datetime.fromisoformat(jsonData["updated"])
            if "updated" in jsonData and jsonData["updated"] != None
            else None,
            jsonData["id"],
        )

    def toJSON(self) -> dict:
        return {
            "title": self.title,
            "description": self.description,
            "tag": self.tag,
            "created": self.created.isoformat(),
            "updated": self.updated.isoformat() if self.updated != None else None,
            "id": self.id,
        }

    def __lt__(self, other):
        return self.created < other.created
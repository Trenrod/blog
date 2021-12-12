import moment from "moment";

export default class BlogData {
    title: string;
    description: string;
    tag: string;
    id: string;
    created: Date;
    updated!: Date;

    constructor(title: string, description: string, tag: string, created: Date, id: string) {
        this.title = title;
        this.description = description;
        this.tag = tag;
        this.created = created;
        this.id = id;
    }

    public static fromJsonObject(jsonData: any): BlogData {
        const blogData = new BlogData(
            jsonData.title,
            jsonData.description,
            jsonData.tag,
            moment(jsonData.created).toDate(),
            jsonData.id
        );
        if (jsonData.updated) {
            blogData.updated = moment(jsonData.updated).toDate()
        }
        return blogData;
    }
}
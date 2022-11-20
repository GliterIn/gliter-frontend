import { Reaction } from "./Reaction.model";

export class Post {
    id: number;
    likes: Reaction[];
    comments: Reaction[];
    timestamp: Date;
    content: string;
    is_visible: boolean;
    constructor(id: number, likes: Reaction[], comments: Reaction[], timestamp: Date, content: string, is_visible: boolean) {
        this.id = id;
        this.likes = likes;
        this.comments = comments;
        this.timestamp = timestamp;
        this.content = content;
        this.is_visible = is_visible;
    }
}
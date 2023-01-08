export class Post {
    id: number;
    timestamp: Date;
    content: string;
    is_visible: boolean;
    constructor(id: number, timestamp: Date, content: string, is_visible: boolean) {
        this.id = id;
        this.timestamp = timestamp;
        this.content = content;
        this.is_visible = is_visible;
    }
}
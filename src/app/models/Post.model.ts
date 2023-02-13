import { UserProfile } from "firebase/auth";

export class Post {
    id: number;
    timestamp: Date;
    content: string;
    is_visible: boolean;
    user: UserProfile;
    constructor(id: number, timestamp: Date, content: string, is_visible: boolean, user:UserProfile) {
        this.id = id;
        this.timestamp = timestamp;
        this.content = content;
        this.is_visible = is_visible;
        this.user = user;
    }
}
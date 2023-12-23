import { UserProfile } from "firebase/auth";
import { Post } from "./Post.model";

export interface Comment {
    id: number;
    post: Post;
    content: string;
    timestamp: Date;
    user: UserProfile;
}
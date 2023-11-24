import { Post } from "./Post.model";
import { UserProfile } from "./UserProfile.model";

export interface Reaction {
    reaction_type: string;
    user: UserProfile;
    post: Post;
    timestamp: Date;
}
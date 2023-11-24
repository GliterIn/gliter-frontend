import { UserProfile } from "firebase/auth";

export interface Post {
    id: number;
    timestamp: Date;
    content: string;
    is_visible: boolean;
    user: UserProfile;
    reactions: {[reaction_type:string]:string[]};
}
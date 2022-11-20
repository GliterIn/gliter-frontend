import { User } from "./User.model";

export enum ReactionTypes {
    Like,
    Comment,
}
export class Reaction {
    type: ReactionTypes;
    username: string;
    content: string;
    post_id: number;
    constructor(type: ReactionTypes, username: string, content: string, post_id: number) {
        this.type = type;
        this.username = username;
        this.content = content;
        this.post_id = post_id;
    }
}
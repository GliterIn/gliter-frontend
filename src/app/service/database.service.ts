import { Injectable } from '@angular/core';
import { Post } from '../models/Post.model';
import { Reaction, ReactionTypes } from '../models/Reaction.model';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {

  constructor() {

  }
  get_posts(username: string): Post[] {
    var dummy_data = [
      new Post(1,
        [
          new Reaction(ReactionTypes.Like, "test_user1", "", 1),
          new Reaction(ReactionTypes.Like, "test_user2", "", 1),
        ],
        [
          new Reaction(ReactionTypes.Comment, "test_user1", "nice", 1),
          new Reaction(ReactionTypes.Comment, "test_user2", "lol", 1),
        ]
        , new Date(), "Test Post 1", true
      ),
      new Post(2,
        [
          new Reaction(ReactionTypes.Like, "test_user1", "", 2),
          new Reaction(ReactionTypes.Like, "test_user2", "", 2),
        ],
        [
          new Reaction(ReactionTypes.Comment, "test_user1", "nice", 2),
        ]
        , new Date(), "Test Post 2", true
      ),
    ];
    return dummy_data;
  }
}

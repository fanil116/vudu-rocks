export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface PostCard extends Post {
  author: string;
}

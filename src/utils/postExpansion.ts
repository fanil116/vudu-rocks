import type { Post, PostCard } from "../types/Post";
import type { User } from "../types/User";
/**
 * Связывает посты с их авторами, добавляя поле `author` в каждый пост.
 * @param posts - массив постов
 * @param users - массив пользователей
 * @returns массив постов с добавленным полем `author`
 */
export function mapPostsWithAuthors(posts: Post[], users: User[]): PostCard[] {
  const userMap = new Map<number, string>();

  for (const user of users) {
    userMap.set(user.id, user.name);
  }

  return posts.map((post) => ({
    ...post,
    author: userMap.get(post.userId) || "Unknown",
  }));
}

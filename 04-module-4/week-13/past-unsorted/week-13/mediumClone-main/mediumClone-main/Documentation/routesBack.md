
# Routes - Backend

## Users
| HTTP Method | Path           | Action                                        |
|-------------|----------------|-----------------------------------------------|
| GET         | `/users/:id`   | Get User by User`:id`                         |
| POST        | `/users`       | Create User with provided `firstName`, `lastName`, `email`, and `password` |
| POST        | `/users/token` | Create JWT Token with provided `email` and `password` |
| PATCH       | `/users/:id`   | Edit User`:id` with provided `firstName`, `lastName`, and `email` |
| DELETE      | `/users/:id`   | Delete User`:id`                              |
> **NOTE** TODO Convert into soft delete.

## Stories
| HTTP Method | Path                         | Action                          |
|-------------|------------------------------|---------------------------------|
| GET         | `/stories`                   | Get an array of all Stories     |
| GET         | `/stories/:id`               | Get Story by Story`:id`         |
| GET         | `/users/:id/stories`         | Get an array of Stories written by User`:id` |
| GET         | `/users/:id/follows/stories` | Get an array of Stories written by Followed Users |
| POST        | `/stories`                   | Create Story with provided `title`, `body`, and `authorId` |
| PATCH       | `/stories/:id`               | Edit Story by Story`:id` with provided `title` and `body` |
| DELETE      | `/stories/:id`               | Delete Story`:id`               |

## Comments
| HTTP Method | Path                    | Action                               |
|-------------|-------------------------|--------------------------------------|
| GET         | `/comments/:id`         | Get Comment`:id`                     |
| GET         | `/users/:id/comments`   | Get an array of Comments by User`:id` |
| GET         | `/stories/:id/comments` | Get an array of Comments for Story`:id` |
| POST        | `/stories/:id/comments` | Create Comment for Story`:id` with provided `userId` and `body` |
| PATCH       | `/comments/:id`         | Edit Comment`:id` with provided `body` |
| DELETE      | `/comments/:id`         | Delete Comment`:id`                  |

<!-- MIRA Should 'get' be modified to end with a collection-type path instead? -->
<!-- MIRA Will the comments always be associated with a story in the path, like POST? -->
<!-- MIRA Bookmarks and Follows? -->

## Likes
| HTTP Method | Path                 | Action                               |
|-------------|----------------------|--------------------------------------|
| GET         | `/users/:id/likes`   | Get an array of Likes by User`:id`   |
| GET         | `/stories/:id/likes` | Get an array of Likes for Story`:id` |
| POST        | `/stories/:id/likes` | Create Like for Story`:id`           |
| DELETE      | `/stories/:id/likes` | Delete Like for Story`:id`           |

## Follows
| HTTP Method | Path                   | Action                                |
|-------------|------------------------|---------------------------------------|
| GET         | `/users/:id/follows`   | Get an array of Followed Users for User`:id` |
| GET         | `/users/:id/followers` | Get an array of Followers for User`:id` |
| POST        | `/users/:id/follows`   | Create Follow for User`:id` with provided `followingId` |
| DELETE      | `/users/:id/follows`   | Delete Follow for User`:id` with provided `followingId` |

## Bookmarks
| HTTP Method | Path                     | Action                              |
|-------------|--------------------------|-------------------------------------|
| GET         | `/users/:id/bookmarks`   | Get an array of Bookmarks from a User |
| GET         | `/stories/:id/bookmarks` | Get an array of Bookmarks for a Story |
| POST        | `/users/:id/bookmarks`   | Create Bookmark for User`:id` with provided `storyId` |
| DELETE      | `/users/:id/bookmarks`   | Delete Bookmark for User`:id` with provided `storyId` |

# Schema

![Schema](MVP-schema.JPG)

## List of Tables:
* Users
* Stories
* Comments
* Follows (join table)
* Bookmarks (join table)
* Likes (join table)

<br>
<br>
<br>

| Users     | Data Type                   |
|-----------|-----------------------------|
| id        | serial integer pk           |
| firstName | varchar(40)                 |
| lastName  | varchar(40)                 |
| username  | varchar(40)                 |
| email     | varchar(80)                 |
| hashedPassword | integer binary         |
| updatedAt | datetype default new Date() |
| createdAt | datetype default new Date() |
 
<br>
<br>
<br>

| Stories   | Data Type                     |
|-----------|-------------------------------|
| id        | serial integer pk             |
| title     | varchar(255)                  |
| body      | text                          |
| userId    | **references Users(id) fk**   |
| updatedAt | datetype default new Date()   |
| createdAt | datetype default new Date()   |

<br>
<br>
<br>

| Comments  | Data Type                     |
|-----------|-------------------------------|
| id        | serial integer pk             |
| body      | text                          |
| userId    | **references Users(id) fk**   |
| storyId   | **references Stories(id) fk** |
| updatedAt | datetype default new Date()   |
| createdAt | datetype default new Date()   |

<br>
<br>
<br>

| Likes     | Data Type                     |
|-----------|-------------------------------|
| id        | serial integer pk             |
| userId    | **references Users(id) fk**   |
| storyId   | **references Stories(id) fk** |
| updatedAt | datetype default new Date()   |
| createdAt | datetype default new Date()   |

<br>
<br>
<br>

| Follows     | Data Type                   |
|-------------|-----------------------------|
| id          | serial integer pk           |
| followerId  | **references Users(id) fk** |
| followingId | **references Users(id) fk** |
| updatedAt   | datetype default new Date() |
| createdAt   | datetype default new Date() |

<br>
<br>
<br>

| Bookmarks    | Data Type                     |
|--------------|-------------------------------|
| id           | serial integer pk             |
| userId       | **references Users(id) fk**   |
| storyId      | **references Stories(id) fk** |
| updatedAt    | datetype default new Date()   |
| createdAt    | datetype default new Date()   |

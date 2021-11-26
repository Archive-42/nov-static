---
*Books Table*
---

| **Name**      | **DataType** 	| **Details**  	|
|--------------	|----------	|----------	|
| id           	| integer  	| PK       	|
| name         	| string   	| not null 	|
| description  	| text     	|          	|
| releaseDate  	| date     	| not null 	|
| pageCount    	| integer  	| not null 	|
| publisherId  	| integer  	| not null, ref: (publisher(id)) 	|
| bookAuthorId 	| integer  	| not null, ref: (bookAuthor(id))	|
| bookGenreId  	| integer  	| not null , ref: (bookGenre(id))	|

---
*UserBooks Table*
---

| **Name**      | **DataType** 	| **Details**  	|
|--------------	|----------	|----------	|
| id           	| integer  	| PK       	|
| review  	| text     	|  	|
| rating    	| integer  	|  	|
| status  	| isIn : [haveRead, reading, wantToRead], maybe 2 states  | not null	|
| userId        | integer   	| not null, ref: (user(id)) 	|
| bookId  	| integer     	| not null, ref: (book(id))   	|

---
*Users Table*
---

| **Name**      | **DataType** 	| **Details**  	|
|--------------	|----------	|----------	|
| id           	| integer  	| PK       	|
| name  	| string     	| not null, unique |
| email    	| string(email?)| not null, unique |
| password  	| bytea | not null	|

---
*Authors Table*
---

| **Name**      | **DataType** 	| **Details**  	|
|--------------	|----------	|----------	|
| id           	| integer  	| PK       	|
| name  	| string     	| not null      |

---
*Genres Table*
---

| **Name**      | **DataType** 	| **Details**  	|
|--------------	|----------	|----------	|
| id           	| integer  	| PK       	|
| name  	| String     	| not null      |

---
*AuthorGenres Table*
---

| **Name**      | **DataType** 	| **Details**  	|
|--------------	|----------	|----------	|
| id           	| integer  	| PK       	|
| authorId  	| integer     	| not null, ref: (author(id))     |
| genreId       | integer       | not null, ref: (genre(id))      |

---
*BookGenres Table*
---

| **Name**      | **DataType** 	| **Details**  	|
|--------------	|----------	|----------	|
| id           	| integer  	| PK       	|
| bookId  	| integer     	| not null, ref: (book(id))      |
| genreId       | integer       | not null, ref: (genre(id))     |

---
*BookAuthors Table*
---

| **Name**      | **DataType** 	| **Details**  	|
|--------------	|----------	|----------	|
| id           	| integer  	| PK       	|
| bookId  	| integer     	| not null, ref: (book(id))      |
| authorId      | integer       | not null, ref: (author(id))    |

---
*Publishers Table*
---

| **Name**      | **DataType** 	| **Details**  	|
|--------------	|----------	|----------	|
| id           	| integer  	| PK       	|
| name 	        | string     	| not null, unique |
| location      | string        | not null         |

---
*Friends Table*
---

| **Name**      | **DataType** 	| **Details**  	|
|--------------	|----------	|----------	|
| id           	| integer  	| PK       	|
| userId  	| integer     	| not null, ref: (user(id))     |
| friendId      | integer       | not null, ref: (user(id))     |
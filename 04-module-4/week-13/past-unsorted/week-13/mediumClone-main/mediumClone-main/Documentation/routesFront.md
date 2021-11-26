
# Routes - Frontend
Returns HTML

| HTTP Method | Path        | Action |
|-------------|-------------|--------|
| GET         | `/`         | Show homepage |
| GET         | `/splash`   | Show splash page |

## Users
| HTTP Method | Path        | Action |
|-------------|-------------|--------|
| GET         | `/login`    | Show login form |
| POST        | `/login`    | Log in a User???     |
| GET         | `/signup`   | Show signup form |
| POST        | `/signup`   | Create a new User??? |
| GET         | `/users/:id`      | Show a User profile page |
| GET         | `/users/:id/edit` | Show a User profile edit form |

## Stories 
| HTTP Method | Path        | Action |
|-------------|-------------|--------|
| GET         | `/create`   | Show Story form |
| POST        | `/create`   | Create a new Story   |
| GET         | `/stories/:id/edit` | Show a Story edit form |
| GET         | `/stories/:id`      | Show a Story page |

<!-- MIRA stories/create, users/login, users/signup? -->
<!-- MIRA QUESTION Do we decide paths also based on readability?  -->

- `/`
  homepage --> splash.pug
- `/login`
- form --> login.pug
- `/signup`
  form --> signup.pug
- `/`
  Main content, Feed: all same for now, for logins only --> home.pug
- `/create`
  User-only, create a story, has story form --> create-story.pug
- `/stories/:id`
  Individual story page. --> story.pug
- `/users/:id`
  Individual user profile page --> user.pug

# API Documentation

---

## Models

  ### Technology

```typescript
{
  name: string;
  version: string;
}
```

  ### Profile

```typescript
  {
    id: string;
    admin: boolean;
    name: string;
    surname: string;
    password: string;
    role: string;
    bio: string;
    email: string;
    phone: string;
    photo: string;
    technologies: Technology[];
    isDeleted: boolean;
    validProfile: boolean;
    createdAt: date;
    updatedAt: date;
  }
```

  ### Project

```typescript
  {
    id: string;
    title: string;
    category: string;
    date: date;
    link: string;
    technologies: Technology[];
    authors: string[];
    description: string;
    photos: string[];
    isDeleted: boolean;
    createdAt: date;
    updatedAt: date;
  }
```

  ### UserRequests

```typescript
{
  id: string;
  userId: string;
  status: "pending" | "solved" | "cancelled";
  type: "Demande de support" |
    "Demande de verification" |
    "Plainte" |
    "Suggestion" |
    "Autre demande";
  message: string;
  createdAt: date;
  updatedAt: date;
}
```

## Endpoints Profiles

  ### Request all the profiles

- **POST** `/api/profiles/findAll`
- **Answer :**

  ```json
  [
    {
      "id": "1",
      "admin": false,
      "name": "John",
      "surname": "Smith",
      "email": "john.smith@email.com",
      "phone": "+1 444 987 6543",
      "role": "Full Stack Developer",
      "photo": "",
      "technologies": [
        { "name": "Vue.js", "version": 3.0 },
        { "name": "JavaScript", "version": "ES6" },
        { "name": "HTML5" },
        { "name": "CSS3" }
      ],
      "bio": "Full stack developer in web application development."
    },
    ...
  ]
  ```

  ### Create a profile

The backend will set the field validProfile to false and send an email to the user with a link to validate his profile.
After accessing the to the link, the field validProfile will be set to true and the profile will be validated.
The Profile should not be accessible until validated.
The profile can be deleted if not validated after X time.

- **POST** `/api/profiles/`
- **Body**
  ```json
  {
    "name": "John",
    "email": "john.smith@email.com",
    "password": "1234"
  }
  ```
- **Answer :**

  ```json
  {
    "id": "1"
  }
  ```

  ### Update a profile

- **PUT** `/api/profiles/:Id`
- **Body**
  ```json
  {
    "email": "john.smith@email.com"
  }
  ```
- **Answer :**

  ```json
  {
    "id": "1",
    "admin": false,
    "name": "John",
    "surname": "Smith",
    "email": "john.smith@email.com",
    "phone": "+1 444 987 6543",
    "role": "Full Stack Developer",
    "photo": "",
    "technologies": [
      { "name": "Vue.js", "version": 3.0 },
      { "name": "JavaScript", "version": "ES6" },
      { "name": "HTML5" },
      { "name": "CSS3" }
    ],
    "bio": "Full stack developer in web application development."
  }
  ```

  ### Delete (soft) a profile

- **PUT** `/api/profiles/:Id`
- **Answer :**

  ```json
  {
    "Profile deleted successfully"
  }
  ```

  ### Delete (Hard) a profile

- **DEL** `/api/profiles/:Id`
- **Answer :**

  ```json
  {
    "Profile permanently deleted successfully"
  }
  ```

## Sessions Endpoints:

  ### findAll

- **POST** `/api/sessions`
- **Body**
  ```json
  {}
  ``
  ```
- **Answer :**

```json
[
  {
      "_id": "6841dd0597c96a4095589912",
      "email": "emily.davis@gmail.com",
      "status": false,
      "createdAt": "2025-06-05T18:08:05.144Z",
      "updatedAt": "2025-06-05T18:47:12.545Z",
      "__v": 0
  },
  ..
]
```

  ### online

- **POST** `/api/sessions/online`
- **Body**
  ```json
  {}
  ``
  ```
- **Answer :**

```json
[
  {
      "_id": "6841dd0597c96a4095589912",
      "email": "emily.davis@gmail.com",
      "status": true,
      "createdAt": "2025-06-05T18:08:05.144Z",
      "updatedAt": "2025-06-05T18:47:12.545Z",
      "__v": 0
  },
  ..
]
```

  ### offline

- **POST** `/api/sessions/offline`
- **Body**
  ```json
  {}
  ``
  ```
- **Answer :**

```json
[
  {
        "_id": "683f341def92d5460daa0cf5",
        "admin": false,
        "name": "Kemper",
        "surname": "Edmund",
        "role": "UI/UX Designer",
        "bio": "UI/UX designer passionate about creating intuitive and visually appealing user interfaces.",
        "email": "emily.davis@gmail.com",
        "phone": "+1 444 987 6543",
        "photo": "",
        "technologies": [
            {
                "name": "Figma"
            },
            {
                "name": "Sketch"
            },
            {
                "name": "HTML5"
            },
            {
                "name": "CSS3"
            }
        ],
        "isDeleted": false,
        "createdAt": "2025-05-29T17:42:53.066Z",
        "updatedAt": "2025-06-11T22:27:08.823Z",
        "__v": 0
    },
  ..
]
```
  
## Authentification Endpoints

  For test purposes:
  {
  "email": "john.doe@gmail.com",
  "password": "newPassword321"
  }

  ### Change password

- **PUT** `/api/auth/changePassword/:id`

- **Body**
  ```json
{
    "currentPassword": "*old Password*",
    "newPassword": "*updated Password*"
}
  ```
- **Answer :**
  ```json
  {
    "the password of ${user.name} was successfully updated"
  }
  ```

  ### Authenticate a user

- **POST** `/api/auth/login`
  // route updated to fit with backend
- **Body**
  ```json
  {
    "email": "john.smith@email.com",
    "password": "1234"
  }
  ``
  ```
- **Answer :**

```json
{
    "message": "successfully authentificated",
    "user": {
        "id": "683f341def92d5460daa0cf5",
        "name": "John",
        "surname": "Smith",
        "admin": false,
        "role": "UI/UX Designer",
        "email": "john.smith@email.com",
        "createdAt": "2025-05-29T17:42:53.066Z"
    }
}
```

  ### Forgotten password (not implemented yet)

// Not implemented yet

- **POST** `/api/auth/sendResetPasswordEmail`
- **Body**
  ```json
  {
    "email": "john.smith@email.com",
  }
  ``
  ```
- **Answer :**

  ```json
  {
    "successfully sent email for reset password"
  }
  ```
  ### Reset Password (not implemented yet)

// not implemented yet
  
  ### Logout

- **POST** `/api/auth/logout`
- **Body**
  ```json
  {
    "email": "adress@email.com"
  }
  ``
  ```
- **Answer :**

```json

  {
      "logout successful !"
  }
```

## Endpoints Projects

  ### Request all the projects

- **POST** `/api/projects/findAll`
- **Answer :**

  ```json
  [
    {
    "id": 1,
    "title": "Portfolio Website",
    "category": "Technology",
    "description": "A portfolio website for a developer",
    "date": "2024-05-01T10:00:00Z",
    "technologies": [
      { "name": "HTML5" },
      { "name": "CSS3" },
      { "name": "Node.js", "version": 5 },
      { "name": "Express" },
      { "name": "MongoDB", "version": 11 }
    ],
    "link": "https://example.com/portfolio",
    "authors": ["1","2"],
    "photos": ["Screenshot1.png", "Screenshot2.png", "Screenshot3.png"],
  },
    ...
  ]
  ```

  ### Create a project

- **POST** `/api/projects/`
- **Body**
  ```json
  {
    "title": "Portfolio Website",
    "category": "Technology",
    "description": "A portfolio website for a developer",
    "technologies": [
      { "name": "HTML5" },
      { "name": "CSS3" },
      { "name": "Node.js", "version": 5 },
      { "name": "Express" },
      { "name": "MongoDB", "version": 11 }
    ],
    "authors": ["1", "2"],
    "photos": ["Screenshot1.png", "Screenshot2.png", "Screenshot3.png"]
  }
  ```
- **Answer :**

  ```json
  {
    "id": "1",
    "title": "Portfolio Website",
    "category": "Technology",
    "description": "A portfolio website for a developer",
    "technologies": [
      { "name": "HTML5" },
      { "name": "CSS3" },
      { "name": "Node.js", "version": 5 },
      { "name": "Express" },
      { "name": "MongoDB", "version": 11 }
    ],
    "authors": ["1", "2"],
    "photos": ["Screenshot1.png", "Screenshot2.png", "Screenshot3.png"],
    "isDeleted": "false",
    "createdAt": "2022-01-01T00:00:00.000Z",
    "updatedAt": "2022-01-01T00:00:00.000Z",
  }
  ```

  ### Update a project

- **PUT** `/api/projects/:Id`
- **Body**
  ```json
  {
    "link": "https://example.com/portfolio"
  }
  ```
- **Answer :**

  ```json
  {
    "title": "Portfolio Website",
    "technologies": [
      { "name": "HTML5" },
      { "name": "CSS3" },
      { "name": "Node.js", "version": 5 },
      { "name": "Express" },
      { "name": "MongoDB", "version": 11 }
    ],
    "link": "https://example.com/portfolio",
    "authors": ["1", "2"],
    "photos": [
      "assets/1/Screenshot1.png",
      "assets/1/Screenshot2.png",
      "assets/1/Screenshot3.png"
    ],
    "date": "2022-01-01T00:00:00.000Z"
  }
  ```

  ### Delete (soft) a project

- **PUT** `/api/projects/:Id`
- **Answer :**

  ```json
  {
    "Project deleted successfully"
  }
  ```

  ### Delete (hard) a project (not implemented yet)

- **DEL** `/api/projects/:Id`
- **Answer :**

  ```json
  {
    "Project deleted permenantly: successful"
  }
  ```


## Endpoints UserRequests

  ### Request all the user requests

- **POST** `/api/requests/findAll`

-  **Answer :** 
  ```json
  [
  {
    "_id": "683f4606ef92d5460daa0d36",
    "userId": {
        "_id": "683f3070ef92d5460daa0cbc",
        "name": "Tesla",
        "surname": "Nikola"
    },
    "status": "pending",
    "type": "Demande de support",
    "message": "Je rencontre un bug lors de la connexion.",
    "createdAt": "2025-06-03T18:59:18.787Z",
    "updatedAt": "2025-06-03T18:59:18.787Z",
    "__v": 0
  },
  ...
  ]

```

  ### Create new user request

- **POST** `/api/requests/`
  
- **Body**
  ```json
  {
    "userId": {
        "_id": "683f3070ef92d5460daa0cbc",
        "name": "Tesla",
        "surname": "Nikola"
    },
  "type": "Demande de support",
  "message": "Impossible de modifier mon profil depuis hier."
}
```

- **Answer :**

```json
{
  "_id": "683234abc456def7890abcd1",
  "_id": "683f4606ef92d5460daa0d36",
    "userId": {
        "_id": "683f3070ef92d5460daa0cbc",
        "name": "Tesla",
        "surname": "Nikola"
    },
  "status": "pending",
  "type": "Demande de support",
  "message": "Impossible de modifier mon profil depuis hier.",
  "createdAt": "2025-05-22T14:48:00.000Z",
  "updatedAt": "2025-05-22T14:48:00.000Z",
  "__v": 0
}
```

  ### Update an existant user request

- **PUT** `/api/requests/:id`

- **Body**

```json
{
  "status": "solved"
}
```

- **Answer :**

```json
{
  "message": "the request with id: 683234abc456def7890abcd1 was successfully updated",
  "updatedRequest": {
    "_id": "683f4606ef92d5460daa0d36",
    "userId": {
        "_id": "683f3070ef92d5460daa0cbc",
        "name": "Tesla",
        "surname": "Nikola"
    },
    "status": "solved",
    "type": "Demande de support",
    "message": "Impossible de modifier mon profil depuis hier.",
    "createdAt": "2025-05-22T14:48:00.000Z",
    "updatedAt": "2025-05-22T15:02:00.000Z",
    "__v": 0
  }
}
```

## Endpoints statistics

  ### request the statistics

- **GET** `/api/stats/`

- **Answer :**

```json
{
  "totalUsers": 158,
  "usersCreatedThisWeek": 12,
  "usersActiveThisWeek": "not implemented because activity needs to be defined",
  "userGrowthThisWeek": 8.2
}
```

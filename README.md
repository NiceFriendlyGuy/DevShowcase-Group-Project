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
  status: 'pending' | 'solved' | 'cancelled';
  type: 'Demande de support' | 'Demande de verification' | 'Plainte' | 'Suggestion' | 'Autre demande';
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
    "technologies": [{ "name": "Vue.js", "version": 3.0 }, { "name": "JavaScript", "version": "ES6" }, { "name": "HTML5" }, { "name": "CSS3" }],
    "bio": "Full stack developer in web application development."
  }
  ```

### Delete a profile

- **DEL** `/api/profiles/:Id`
- **Answer :**

  ```json
  {}
  ```
// update from backend: soft delete implemented -> Change the status of the profile with the field isDeleted to true

### Change password

- **PUT** `/api/auth/changePassword` 
// route updated to fit with backend
- **Body**
  ```json
  {
    "id": "1",
    "password": "1234",
    "newPassword": "12345678"
  }
  ```
- **Answer :**
  ```json
  {
    "valid": true
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
  "valid": true
}
```

### Logout

**POST** `/api/auth/logout`

  **Work still in progress**

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
    "technologies": [{ "name": "HTML5" }, { "name": "CSS3" }, { "name": "Node.js", "version": 5 }, { "name": "Express" }, { "name": "MongoDB", "version": 11 }],
    "link": "https://example.com/portfolio",
    "authors": ["1", "2"],
    "photos": ["Screenshot1.png", "Screenshot2.png", "Screenshot3.png"],
    "date": "2022-01-01T00:00:00.000Z"
  }
  ```
- **Answer :**

  ```json
  {
    "id": "1"
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
    "technologies": [{ "name": "HTML5" }, { "name": "CSS3" }, { "name": "Node.js", "version": 5 }, { "name": "Express" }, { "name": "MongoDB", "version": 11 }],
    "link": "https://example.com/portfolio",
    "authors": ["1", "2"],
    "photos": ["assets/1/Screenshot1.png", "assets/1/Screenshot2.png", "assets/1/Screenshot3.png"],
    "date": "2022-01-01T00:00:00.000Z"
  }
  ```

### Delete a project

- **DEL** `/api/projects/:Id`
- **Answer :**

  ```json
  {}
  ```

  (Change the status of the project with the field isDeleted to true)
  // update: turned into a PUT with isDeleted -> true

## Endpoints UserRequests

  ### Request all the user requests

-  **POST** `/api/requests/findAll`

-  **Answer :** 
  ```json
  [
  {
    "_id": "6831234567abc123456789ab",
    "userId": "682e417ac57f899365caa020",
    "status": "pending",
    "type": "Suggestion",
    "message": "Ajouter un mode sombre dans le dashboard.",
    "createdAt": "2025-05-20T14:32:00.000Z",
    "updatedAt": "2025-05-20T14:32:00.000Z"
  },
  ...
  ]

  ```

  ### Create a new user request

-  **POST** `/api/requests/`
  
-  **Body**
  ```json
  {
  "userId": "682e417ac57f899365caa020",
  "type": "Demande de support",
  "message": "Impossible de modifier mon profil depuis hier."
  }
  ```

-  **Answer :**
  ```json
  {
  "_id": "683234abc456def7890abcd1",
  "userId": "682e417ac57f899365caa020",
  "status": "pending",
  "type": "Demande de support",
  "message": "Impossible de modifier mon profil depuis hier.",
  "createdAt": "2025-05-22T14:48:00.000Z",
  "updatedAt": "2025-05-22T14:48:00.000Z",
  "__v": 0
  }
  ```

  ### Update an existant user request

-  **PUT** `/api/requests/:id`
  
-  **Body**
  ```json
  {
  "status": "solved"
  }
  ```

-  **Answer :**
  ```json
  {
  "message": "the request with id: 683234abc456def7890abcd1 was successfully updated",
  "updatedRequest": {
    "_id": "683234abc456def7890abcd1",
    "userId": "682e417ac57f899365caa020",
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

-  **GET** `/api/stats/`

-  **Answer :**
  ```json
  {
  "totalUsers": 158,
  "usersCreatedThisWeek": 12,
  "usersActiveThisWeek": "not implemented because activity needs to be defined",
  "userGrowthThisWeek": 8.2
  }
  ```


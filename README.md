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
    role: string;
    bio: string;
    email: string;
    phone: string;
    photo: string;
    technologies: Technology[];
  }
```

### Project

```typescript
  {
    id: string;
    title: string;
    link: string;
    category: string; // 
    technologies: Technology[];
    authors: string[];
    description: string;
    photos: string[];
    creationDate: Date;
  }
```

## Endpoints Profiles

### Request all the profiles

**POST** `/api/profiles/findAll`
- **Answer :**

  ```json
  [
    {
      "id": "1",
      "admin": false,
      "name": "John",
      "surname": "Smith",
      "email": "john.smith@email.com",
      "password": "1234",
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

**POST** `/api/profiles/`
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

**PUT** `/api/profiles/:Id`
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
    "password": "1234",
    "phone": "+1 444 987 6543",
    "role": "Full Stack Developer",
    "photo": "",
    "technologies": [{ "name": "Vue.js", "version": 3.0 }, { "name": "JavaScript", "version": "ES6" }, { "name": "HTML5" }, { "name": "CSS3" }],
    "bio": "Full stack developer in web application development."
  }
  ```

### Delete a profile

**DEL** `/api/profiles/:Id`
- **Answer :**

  ```json
  {}
  ```

## Endpoints Projects

### Request all the projects

**POST** `/api/projects/findAll`
- **Answer :**

  ```json
  [
    {
    "id": 1,
    "title": "Portfolio Website",
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
    "creation" : "2022-01-01T00:00:00.000Z"
  },
    ...
  ]
  ```

### Create a project

**POST** `/api/projects/`
- **Body**
  ```json
  {
    "title": "Portfolio Website",
    "technologies": [{ "name": "HTML5" }, { "name": "CSS3" }, { "name": "Node.js", "version": 5 }, { "name": "Express" }, { "name": "MongoDB", "version": 11 }],
    "link": "https://example.com/portfolio",
    "authors": ["1", "2"],
    "photos": ["Screenshot1.png", "Screenshot2.png", "Screenshot3.png"],
    "creation": "2022-01-01T00:00:00.000Z"
  }
  ```
- **Answer :**

  ```json
  {
    "id": "1"
  }
  ```

### Update a project

**PUT** `/api/projects/:Id`
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
    "photos": ["Screenshot1.png", "Screenshot2.png", "Screenshot3.png"],
    "creation": "2022-01-01T00:00:00.000Z"
  }
  ```

### Delete a project

**DEL** `/api/projects/:Id`
- **Answer :**

  ```json
  {}
  ```

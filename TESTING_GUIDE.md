# Testing Profile Endpoints Guide

## Server Setup
- **Base URL**: `http://localhost:3000` (or check your `.env` PORT)
- **Profile Routes Base**: `/api/profile`

## Available Endpoints

1. **GET** `/api/profile/avatar` - Search anime characters/anime (No auth needed)
2. **PUT** `/api/profile/profile/avatar` - Update avatar (Auth required)
3. **PUT** `/api/profile/upload` - Upload profile pic (Auth required)
4. **PUT** `/api/profile/profile/font` - Update font (Auth required)
5. **PUT** `/api/profile/proile/theme` - Update theme (Auth required) ⚠️ Note: Typo in route

---

## Method 1: Testing GET Endpoint in Browser (Easiest)

### Test `getAvatar` endpoint:

**In your browser address bar, type:**

```
http://localhost:3000/api/profile/avatar?query=Naruto&type=character&page=1
```

**Or try:**
```
http://localhost:3000/api/profile/avatar?query=One%20Piece&type=anime&page=1
```

**Parameters:**
- `query` (required) - Search term
- `type` (optional) - "character" or "anime" (default: "character")
- `page` (optional) - Page number (default: "1")

**Expected Response:**
```json
{
  "results": [
    {
      "id": 1,
      "name": "Naruto Uzumaki",
      "image": "https://...",
      "type": "character"
    }
  ],
  "pagination": { ... }
}
```

---

## Method 2: Testing with Browser Console (For POST/PUT)

### Step 1: Get Auth Token First

**Login to get token:**
```javascript
// Open browser console (F12) and run:
fetch('http://localhost:3000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'your-email@example.com',
    password: 'your-password'
  })
})
.then(res => res.json())
.then(data => {
  console.log('Token:', data.token);
  // Save this token for next requests
  localStorage.setItem('token', data.token);
});
```

### Step 2: Test Update Avatar

```javascript
const token = localStorage.getItem('token');

fetch('http://localhost:3000/api/profile/profile/avatar', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    avatarId: '12345',
    avatarUrl: 'https://cdn.myanimelist.net/images/characters/2/284121.jpg',
    avatarName: 'Naruto Uzumaki'
  })
})
.then(res => res.json())
.then(data => console.log('Success:', data))
.catch(err => console.error('Error:', err));
```

### Step 3: Test Update Theme

```javascript
const token = localStorage.getItem('token');

fetch('http://localhost:3000/api/profile/proile/theme', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    theme: 'light'
  })
})
.then(res => res.json())
.then(data => console.log('Success:', data))
.catch(err => console.error('Error:', err));
```

### Step 4: Test Update Font

```javascript
const token = localStorage.getItem('token');

fetch('http://localhost:3000/api/profile/profile/font', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    fontStyle: 'poppins'
  })
})
.then(res => res.json())
.then(data => console.log('Success:', data))
.catch(err => console.error('Error:', err));
```

---

## Method 3: Using Postman or Thunder Client (Recommended for PUT/POST)

### Setup:
1. **Install**: Postman (or Thunder Client extension in VS Code)
2. **Base URL**: `http://localhost:3000`

### Test GET Avatar (No Auth):
1. Method: **GET**
2. URL: `http://localhost:3000/api/profile/avatar?query=Naruto&type=character`
3. Click **Send**

### Test Update Avatar (With Auth):
1. Method: **PUT**
2. URL: `http://localhost:3000/api/profile/profile/avatar`
3. **Headers**:
   - `Content-Type`: `application/json`
   - `Authorization`: `Bearer YOUR_TOKEN_HERE`
4. **Body** (raw JSON):
```json
{
  "avatarId": "12345",
  "avatarUrl": "https://cdn.myanimelist.net/images/characters/2/284121.jpg",
  "avatarName": "Naruto Uzumaki"
}
```

### Test Upload Profile Pic (With Auth):
1. Method: **PUT**
2. URL: `http://localhost:3000/api/profile/upload`
3. **Headers**:
   - `Authorization`: `Bearer YOUR_TOKEN_HERE`
4. **Body** (form-data):
   - Key: `profilePic` (type: File)
   - Value: Select an image file

---

## Quick Test Checklist

✅ **GET /api/profile/avatar** - Test in browser directly
- [ ] `?query=Naruto&type=character`
- [ ] `?query=One Piece&type=anime`
- [ ] Test without query (should return error)

✅ **PUT /api/profile/profile/avatar** - Test with Postman/Console
- [ ] With valid token
- [ ] Without token (should return 401)
- [ ] Without avatarId (should return 400)

✅ **PUT /api/profile/profile/font** - Test with Postman/Console
- [ ] With valid token and fontStyle

✅ **PUT /api/profile/proile/theme** - Test with Postman/Console
- [ ] With valid token and theme

---

## Common Issues

1. **CORS Error**: Make sure `cors()` is enabled in `app.ts` ✅ (already enabled)

2. **401 Unauthorized**: 
   - Check if token is valid
   - Check if token is in header: `Authorization: Bearer TOKEN`

3. **404 Not Found**: 
   - Check server is running: `http://localhost:3000/`
   - Check route path matches exactly

4. **500 Server Error**: 
   - Check server console for error logs
   - Check database connection
   - Check if Prisma client is generated

---

## Note on Route Typo

There's a typo in your routes file:
- Line 10: `/proile/theme` should be `/profile/theme`

Fix it in `Backend/src/routes/profile.ts`:
```typescript
router.put("/profile/theme", authenticateToken, updateTheme);
```






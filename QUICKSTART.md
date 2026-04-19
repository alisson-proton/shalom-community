# Quick Start Guide - Shalom Community

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm start
```

### 3. Open in Browser
Navigate to: `http://localhost:4200`

## 🎯 Quick Demo Flow

### Test the Public Feed (No Login Required)
1. Open the app - you'll see the public feed
2. Click through the filter buttons to see different post types
3. Notice some posts are marked "🌍 Public" and others "🔒 Members Only"
4. Public visitors only see public posts

### Test the Members Area
1. Click "Members Area" in the navigation
2. Login with:
   - Email: `member@shalom.com`
   - Password: (any password)
3. Now you can see ALL posts including members-only content
4. Browse sermons, courses, prayer requests, and galleries

### Test the Admin Panel
1. Logout (click "Logout" button)
2. Click "Members Area" again
3. Login as admin:
   - Email: `admin@shalom.com`
   - Password: (any password)
4. Click "Admin Panel" in the navigation (visible only for admins)
5. Create a new post:
   - Fill in the title: "Test Post"
   - Add content: "This is a test from the admin panel"
   - Select a post type
   - Choose visibility
   - Optionally add an image URL from Unsplash
   - Click "Create Post"
6. Navigate back to the public or members feed to see your new post

## 📱 Key Features to Test

### Filter Bar
- Click different filters on the feed to see posts by type
- Try: All Posts, Announcements, Events, Sermons, Courses, Galleries

### Post Cards
- Hover over posts to see the lift effect
- Click navigation arrows on gallery posts (multiple images)
- Notice the icons for different post types
- Check the visibility badges

### Responsive Design
- Resize your browser window to see responsive behavior
- Try mobile viewport sizes (iPhone, Android)
- The layout adapts to all screen sizes

## 🎨 Sample Image URLs (for testing Admin Panel)

Use these Unsplash URLs when creating posts:

**Church/Worship:**
- `https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800`
- `https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800`

**Bible/Study:**
- `https://images.unsplash.com/photo-1519791883288-dc8bd696e667?w=800`
- `https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800`

**Community:**
- `https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800`
- `https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800`

**Events:**
- `https://images.unsplash.com/photo-1491677533189-49af0b46d5fb?w=800`
- `https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800`

## 💡 Tips

1. **Mock Data**: All data is stored in memory - refresh the page to reset
2. **No Real Auth**: Any password works for the demo accounts
3. **Instant Updates**: New posts appear immediately after creation
4. **Try Different Roles**: Test both member and admin accounts
5. **Explore All Routes**: 
   - `/` - Public feed
   - `/members` - Members area
   - `/admin` - Admin panel

## 🐛 Troubleshooting

**Port Already in Use?**
```bash
ng serve --port 4300
```

**Build Errors?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Want to Reset Data?**
Just refresh the page - all data is in-memory!

## 📚 Next Steps

After testing the prototype, consider:
1. Review the code structure in `src/app/`
2. Check out the models in `src/app/models/`
3. Explore the mock data service in `src/app/services/`
4. Plan backend integration
5. Design the database schema
6. Add real authentication

Enjoy exploring the Shalom Community prototype! 🏛️

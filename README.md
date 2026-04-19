# Shalom Community

## Church Community System Prototype - April 2026

A church community system prototype built with Angular 21. This application features a feed system where admin users can add and share content with the community.

## Features

### 🌍 Public Feed
- View public announcements and events
- No authentication required
- Filter posts by type (announcements, events, sermons, courses, galleries)
- Beautiful responsive card-based layout

### 🔒 Members Area
- Login required to access members-only content
- Access to exclusive sermons, courses, prayer requests, and galleries
- Personalized welcome message
- All posts (both public and members-only) visible to authenticated members

### 🛠️ Admin Panel
- Create new posts with different types:
  - 📢 Announcements
  - 🎤 Sermons
  - 📚 Courses
  - 📷 Galleries
  - 📅 Events
  - 🙏 Prayer Requests
- Set visibility (Public or Members-only)
- Add media (images/videos) with URLs
- Tag posts for better organization
- Rich content creation form

## Mock Data

The application uses mock data stored in the `MockDataService`. Sample posts include:
- Welcome announcements
- Sunday sermons
- Bible study courses
- Easter celebration events
- Youth ministry galleries
- Prayer requests
- Community outreach events

### Demo Credentials

**Member Login:**
- Email: `member@shalom.com`
- Password: any password

**Admin Login:**
- Email: `admin@shalom.com`
- Password: any password

## Tech Stack

- **Framework:** Angular 21
- **Styling:** SCSS with custom responsive design
- **Routing:** Angular Router for navigation
- **Data:** Mock service with in-memory data
- **Components:** Standalone components (no NgModule)

## Getting Started

You can run this application either with Docker (recommended for quick setup) or locally with Node.js.

### Option 1: Docker (Recommended)

#### Prerequisites
- Docker
- Docker Compose

#### Running with Docker

1. Clone the repository:
```bash
git clone https://github.com/alisson-proton/shalom-community.git
cd shalom-community
```

2. Build and run with Docker Compose:
```bash
docker-compose up -d
```

3. Open your browser and navigate to:
```
http://localhost:8080
```

4. To stop the application:
```bash
docker-compose down
```

#### Docker Commands

**Build the image manually:**
```bash
docker build -t shalom-community .
```

**Run the container manually:**
```bash
docker run -d -p 8080:80 --name shalom-app shalom-community
```

**View logs:**
```bash
docker-compose logs -f
```

**Restart the application:**
```bash
docker-compose restart
```

### Option 2: Local Development

#### Prerequisites
- Node.js (v24+)
- npm (v11+)

#### Installation

1. Clone the repository:
```bash
git clone https://github.com/alisson-proton/shalom-community.git
cd shalom-community
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm start
# or
ng serve
```

4. Open your browser and navigate to:
```
http://localhost:4200
```

#### Build

To build the application for production:
```bash
npm run build
# or
ng build
```

The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── feed/              # Public feed component
│   │   ├── post-card/         # Individual post card
│   │   ├── members-feed/      # Members-only feed
│   │   ├── admin-panel/       # Admin content creation
│   │   └── header/            # Navigation header
│   ├── models/
│   │   ├── post.model.ts      # Post data types
│   │   └── user.model.ts      # User data types
│   ├── services/
│   │   └── mock-data.service.ts  # Mock data provider
│   ├── app.routes.ts          # Application routing
│   └── app.ts                 # Root component
├── styles.scss                # Global styles
└── index.html                 # Main HTML file
```

## Features Overview

### Post Types
Each post can be one of the following types:
- **Announcement**: General community announcements
- **Sermon**: Recorded sermons and messages
- **Course**: Bible studies and educational content
- **Gallery**: Photo collections from events
- **Event**: Upcoming church events
- **Prayer**: Prayer requests and updates

### Filtering
Users can filter the feed by:
- All posts
- Specific post types
- The filter bar provides quick access to different content categories

### Media Support
- Image display with responsive sizing
- Video placeholder with play icon
- Multiple media carousel for galleries
- Media navigation controls

### Responsive Design
- Mobile-first approach
- Adapts to different screen sizes
- Touch-friendly controls
- Optimized for tablets and desktops

## How to Use

### As a Visitor (Public Access)
1. Navigate to the home page
2. Browse public announcements and events
3. Use the filter bar to view specific content types
4. Click "Members Area" to login

### As a Member
1. Click on "Members Area" in the navigation
2. Login with: `member@shalom.com` (any password)
3. Access all content including members-only posts
4. View sermons, courses, prayer requests, and galleries

### As an Admin
1. Login with: `admin@shalom.com` (any password)
2. Navigate to "Admin Panel"
3. Create new posts:
   - Fill in title and content
   - Select post type
   - Choose visibility (public or members-only)
   - Add media URL (optional)
   - Add tags (optional)
4. Click "Create Post" to publish

## Future Enhancements

This is a prototype. Potential enhancements include:
- Real backend API integration
- Database persistence (PostgreSQL/MongoDB)
- User registration system
- Real authentication with JWT/OAuth
- Comments and reactions on posts
- Real-time notifications
- Video streaming integration
- File upload functionality
- Advanced search and filtering
- User profiles and settings
- Email notifications
- Calendar integration for events
- Course progress tracking
- Live streaming for services

## License

This project is a prototype for demonstration purposes.

## Author

Built as a church community system prototype - April 2026

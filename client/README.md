# Property Listing Dashboard

A modern React TypeScript application with Express.js API for managing and displaying property listings with a beautiful, responsive UI and dark mode support.

## 🚀 Quick Start

### Single Command Setup

```bash
# Install all dependencies (both React app and API)
npm run install:all

# Start both servers with one command
npm run dev
```

This will start:
- **API Server**: `http://localhost:5001`
- **React App**: `http://localhost:3000`

## Features

### 🏠 Property Management
- **Property Listings**: Display properties in a responsive card layout
- **Property Details**: View detailed information in a modal popup
- **Add New Properties**: Form to add new properties with all required fields
- **Real API Integration**: Express.js backend with full CRUD operations

### 🔍 Search & Filtering
- **Search Bar**: Search properties by name, location, or description
- **Type Filtering**: Filter properties by type (House, Apartment, Condo, Townhouse, Villa)
- **Server-Side Filtering**: Efficient API-based filtering and search
- **Real-time Results**: Instant results as you type or change filters

### 🎨 User Interface
- **Dark Mode Toggle**: Switch between light and dark themes
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Modern UI**: Clean, professional design with smooth animations
- **Property Cards**: Beautiful cards with images, prices, and key details

### 🛠 Technical Features
- **React Context**: State management for properties, filters, and UI state
- **TypeScript**: Full type safety throughout the application
- **Express.js API**: RESTful backend with proper error handling
- **Lucide Icons**: Beautiful, consistent iconography
- **Responsive Grid**: Adaptive layout for different screen sizes

## Project Structure

```
property_listing/
├── src/                    # React application
│   ├── components/         # React components
│   ├── context/           # React Context for state management
│   ├── services/          # API service layer
│   ├── types/             # TypeScript interfaces
│   └── App.tsx           # Main application component
├── api/                   # Express.js API server
│   ├── server.js         # API server implementation
│   ├── package.json      # API dependencies
│   └── README.md         # API documentation
├── package.json          # Root package.json with scripts
└── README.md            # This file
```

## Available Scripts

### Root Directory (Main Project)

| Script | Description |
|--------|-------------|
| `npm run dev` | Start both API server and React app |
| `npm run client` | Start only the React app |
| `npm run server` | Start only the API server |
| `npm run api` | Alternative command for API server |
| `npm run install:all` | Install dependencies for both projects |
| `npm start` | Start React app (default) |
| `npm run build` | Build React app for production |

### API Directory

| Script | Description |
|--------|-------------|
| `npm run dev` | Start API server in development mode |
| `npm start` | Start API server in production mode |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/properties` | Get all properties (with filtering) |
| `GET` | `/api/properties/:id` | Get specific property |
| `POST` | `/api/properties` | Create new property |
| `PUT` | `/api/properties/:id` | Update property |
| `DELETE` | `/api/properties/:id` | Delete property |
| `GET` | `/api/health` | Health check |

## Property Types
- House
- Apartment
- Condo
- Townhouse
- Villa

## Property Fields
- Name
- Type
- Price
- Location
- Description
- Image URL
- Bedrooms (optional)
- Bathrooms (optional)
- Area in sq ft (optional)

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd property_listing
   ```

2. **Install all dependencies:**
   ```bash
   npm run install:all
   ```

3. **Start both servers:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   - React App: [http://localhost:3000](http://localhost:3000)
   - API Health: [http://localhost:5001/api/health](http://localhost:5001/api/health)

## Development Workflow

### Running Individual Servers

If you need to run servers separately:

```bash
# Terminal 1 - API Server
npm run server
# or
cd api && npm run dev

# Terminal 2 - React App
npm run client
# or
npm start
```

### API Development

```bash
# Navigate to API directory
cd api

# Install API dependencies
npm install

# Start API server
npm run dev
```

### React Development

```bash
# Install React dependencies
npm install

# Start React app
npm start
```

## Features in Detail

### Property Cards
- Display property image, name, type, price, and location
- Show bedroom/bathroom count when available
- "View Details" button to open modal
- Hover effects and smooth transitions

### Property Modal
- Full-screen modal with detailed property information
- Large property image
- Complete property details including area and listing date
- Contact agent button (placeholder functionality)

### Add Property Form
- Comprehensive form with all property fields
- Form validation for required fields
- Responsive grid layout
- Loading states during API calls
- Cancel and submit actions

### Search & Filter
- Real-time search across property name, location, and description
- Dropdown filter for property types
- Server-side filtering for better performance
- Empty state when no properties match criteria

### Dark Mode
- Toggle between light and dark themes
- Persistent theme preference (saved in localStorage)
- Smooth transitions between themes
- Custom scrollbar styling for dark mode

## Technologies Used

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type safety and better developer experience
- **Lucide React** - Beautiful, consistent icons
- **Create React App** - Zero-configuration build setup

### Backend
- **Express.js** - Fast, unopinionated web framework
- **CORS** - Cross-origin resource sharing
- **Node.js** - JavaScript runtime

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- Property editing functionality
- Property deletion with confirmation
- Image upload for new properties
- Advanced filtering (price range, location)
- Property favorites/bookmarks
- Contact form integration
- Property comparison feature
- Map integration for property locations
- Database integration (PostgreSQL, MongoDB)
- User authentication and authorization
- Real-time updates with WebSockets

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

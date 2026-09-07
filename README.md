# Bidora

**Bidora** is a student-focused auction marketplace built as a front-end web application for the Noroff Semester Project 2 assignment.

The application allows users to browse auction listings, search and filter products, create and manage their own listings, place bids using virtual credits, manage their profile, and save listings as favorites.

[View the live site](https://aw3stm.github.io/Anna_Vestman_SP2_MAR25FT/)

## Features

### Browse listings

- View active auction listings

- Search listings

- Filter listings by category

### Sort listings by:

- Newest

- Oldest

- Ending soon

- Ending last

- View detailed information about individual listings

- See current bids and remaining auction time

### User accounts

- Register a new account

- Sign in and sign out

- Continue browsing without signing in

- Authenticated routes for user-specific functionality

- Virtual credit balance displayed in the navigation

### Auctions and bidding

- Create new auction listings

- Add a title and description

- Select a category

- Set an auction deadline

- Add one or more listing images

- Place bids using virtual credits

- View bids associated with listings

- Edit your own listings

- Delete your own listings

### Profile

- View profile information

- Update profile bio

- Update profile avatar

- Update profile banner

- View your own listings

- View your placed bids

- View listing and win statistics

### 🧡 Favorites

- Save listings using the heart button

- Access saved listings from the navbar

- View saved listings on a dedicated Favorites page

- Remove listings from favorites

- Favorites are stored locally in the browser using localStorage

### Technologies

- TypeScript

- Vite

- Tailwind CSS v4

- Noroff Auction House API v2

- HTML

- CSS

- Material Symbols

- ESLint

- Prettier

# Getting started 🚀

### Prerequisites

You need to have Node.js and npm installed.

### Installation

Clone the repository and install the dependencies:

git clone https://github.com/aw3stm/Anna_Vestman_SP2_MAR25FT.git  
cd Anna_Vestman_SP2_MAR25FT\
npm install

### Run the development server

npm run dev

Vite will start a local development server. Open the URL shown in the terminal in your browser.

### Build the project

npm run build

### Preview the production build

npm run preview

### Lint the project

npm run lint\
Format the project\
npm run format

**Check formatting without changing files:**\
npm run format:check

### API

Bidora uses the Noroff API v2 for authentication, profiles, listings and bidding.

### The application uses the API for:

- User registration

- User login

- API key creation

- Profile data

- Profile updates

- Listing retrieval

- Listing creation

- Listing updates

- Listing deletion

- Bidding

Authenticated requests use the user's access token together with the Noroff API key.

### Authentication

After a successful login, Bidora stores the authentication information required for the current session in localStorage.

The application uses protected routes for actions that require authentication, including:

- Creating a listing

- Editing a listing

- Viewing the profile

- Placing bids

Users who are not logged in can still browse listings and view listing details.

### Favorites

Favorites are handled on the client side rather than through the Noroff API.

**The IDs of favorite listings are stored in:** \
localStorage

**under the key:**\
bidora-favorites

When the Favorites page is opened, the saved listing IDs are used to retrieve the current listing data from the API.

### Responsive design

Bidora was developed with a mobile-first approach.\
The interface adapts to different screen sizes and includes:

- Mobile navigation with a hamburger menu

- Responsive listing grids

- Responsive auction and profile layouts

- Separate desktop and mobile layouts for the authentication pages

- Responsive footer navigation

### Accessibility

-Accessibility considerations included in the project include:

- Semantic HTML elements

- Form labels connected to their inputs

- Descriptive alt text for relevant images

- aria-label attributes for icon-only buttons

- aria-live regions for important form feedback

- Keyboard-accessible buttons and form controls

- Clear visual focus and interaction states

### Design

Bidora uses a clean marketplace-inspired visual identity with:

- Orange accent color

- Neutral text and background colors

- Rounded cards and form elements

- Responsive layouts

- Material Symbols for interface icons

- Custom Bidora branding and imagery

The design was developed in Figma before being implemented in TypeScript and Tailwind CSS.

### Deployment

The project is configured for deployment with Vite and GitHub Pages.

The Vite base path is configured for:

/Anna_Vestman_SP2_MAR25FT/

The production build is generated in the `dist` directory.

### Known limitations

- Favorites are stored locally in the browser and are not connected to the Noroff API.

- Favorites therefore do not automatically sync between different browsers or devices.

- The newsletter and some footer navigation items are currently visual UI elements rather than implemented services.

- The project uses the functionality available through the Noroff Auction House API.

## Author

### Anna Vestman

Front-end development student

GitHub: aw3stm

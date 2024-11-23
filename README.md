# ☀️ Weather App

## Description

Weather App is a smooth and user-friendly **SPA** build with **Vue.js**. The user can get the weather forecast for a specific location, anywhere in the world. It utilises **Geocoding API** to match the location name with correct longitude and latitude, and **Open Meteo API** to get the forecast and meteorological conditions for a selected place.

[Live Demo](https://weather-app-ruby-iota-54.vercel.app/)

### Key Features

- **Search Weather by Location** - User can input a location to fetch and display real-time weather data.
- **Autocomplete** - Based on input, the user is presented with a shortlist of possible locations.
- **Dynamic Theme** - Application supports light and dark theme, changing dynamically based on the weather conditions in searched location.
- **API Integration** - Uses the Open Meteo API and Geocoding API to fetch weather and location data.
- **Fully Typed** – TypeScript implemented from day one for the error-free codebase.
- **UI Testing** - Automated tests for key user interactions to ensure reliability.
- **Containerized** - Runs seamlessly in a Docker container, enabling portability and consistent runtime environments.

### Technologies Used

- **TypeScript** – Fully typed to catch errors early and improve maintainability.
- **Vue.js** - Leveraged for its reactive and component-based architecture to build a dynamic single-page application.
- **Playwright** - Employed for end-to-end testing, ensuring the application behaves as expected across different scenarios.
- **Docker** - Used to containerize the app, ensuring a consistent development and production environment.

## Project Structure

## Installation

### Prerequisites

Make sure you have the following installed:

- Node.js - v22.11.0
- NPM - v9.6.7
- Docker - v27.3.1

### Setup

```bash
# Clone the repository
git clone https://github.com/lubanska/weather-app.git

# Change to the project directory
cd weather-app
```

For running the project locally:

```bash
# Install dependencies
npm install

# Start the project locally
npm run dev
```

For running the project in the Docker container, first make sure Docker daemon is running. Then:

```bash
# Build Docker image
npm run build:docker

# Run the project in the docker container
npm run run:docker
```

The application will be available at `https://localhost:8080`.

## How It Works

### Folder structure

```
.
├── .vscode                 # Recommended VSC extensions
├── e2e                     # Playwright tests
├── src
│   ├── assets              # CSS and styling
│   ├── components          # Vue.js components organised with Atomic Design principles
│   │   ├── 00-globals
│   │   ├── 01-atoms
│   │   ├── 02-molecules
│   │   └── 03-organisms
│   ├── composables         # Composables
│   ├── types               # TypeScript types
│   └── utils               # Helper functions
└── README.md
```

### User Flow

1. The user enters a location in the input field. After typing at least 3 characters, the input query is send to Geocoding API, which returns a list of up to 10 autocomplete suggestions. Each suggestion includes the location name, latitude, and longitude.

2. The user selects a location by clicking on the autocomplete item in the dropdown menu. This behaviour prevents searching for non-existent locations. This ensures that only valid locations are used in the search, preventing errors caused by non-existent locations.

3. Upon selection, the application retrieves the location's coordinates to send a request to the Open Meteo API to fetch real-time weather data.

4. Weather data is dynamically displayed on the page. If no input is provided (for example on the initial page load), the location will default to Copenhagen.

5. The theme of the application will toggle between light and dark, depending on the time of day at the searched location (day or night).

6. The user can perform additional searches or refresh the page to start over.

### Testing

This project includes UI tests written in Playwright. To execute tests in the local environment, use the following command:

```
npm run test:e2e
```

To execute tests in the containerized environment, run the following command:

```
npm run test:e2e:docker
```

Tests include:

- **Core functionality** - Data visibility, autocomplete, location search
- **UI & A11Y** - Keyboard navigation, loaders
- **Edge cases** - Error display

### Limitations

- _Open Meteo API Query Limits_ - The Open Meteo API enforces rate limits, which may restrict the number of queries you can make within a given timeframe.
- _Geocoding API Query Limits_ - Similar query limitations apply to the Geocoding API.
- _Vuetify Accessibility Issues_ - The application uses Vuetify, which may have some accessibility shortcomings, particularly in handling keyboard navigation or screen readers.

### Design Decisions

- **Vuetify** - This application is using Vuetify, a well-known design framework for Vue.js, to streamline the development of the responsive and consistent UI components.
- **Material Design** - This application is using Material Design Icons, a well-documented icon library, recommended by Vuetify. The icons provide an intuitive visual language, guiding the user through the app.

## Resources

- [Vuetify Docs](https://vuetifyjs.com/en/)
- [Playwright Doc](https://playwright.dev/)
- [Icons Preview](https://pictogrammers.com/library/mdi/)
- [Open Meteo API](https://open-meteo.com/en/about)
- [Geocoding API](https://open-meteo.com/en/docs/geocoding-api)

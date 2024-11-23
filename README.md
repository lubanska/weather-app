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
- **Containerized** -

### Technologies Used

- **TypeScript** – Fully typed to catch errors early and improve maintainability.
- **Vue.js** -
- **Playwright** -
- **Docker** -

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
npm run build-docker-image

# Run the project in the docker container
npm run run-docker-container
```

The application will be available at `https://localhost:8080`.

## How It Works

### User Flow

1. The user enters a location in the input field. After typing at least 3 characters, the input query is passed to Geocoding API to provide the list of 10 autocomplete items - possible locations matching a search query, accompanied by their latitude and longitude.

2. The user selects a location by clicking on the autocomplete item in the drop down. This behaviour prevents searching for non-existent locations.

3. Upon selection, the application uses the coordinates of the location to send a request to the Open Meteo API to fetch real-time weather data.

4. Weather details are displayed on the page. If no input is provided (for example on the initial page load), the location will default to Copenhagen.

5. The theme of the application will toggle between light and dark, depending on whether it's day or night at the searched location.

6. The user can perform additional searches or refresh the page to start over.

### Testing

This project includes UI tests written in Playwright. To execute tests, use the following command:

```
npm run test
```

Tests include:

### Limitations

- Open Meteo API query
- Geocoding API query
- Vuetify accessibility issues

### Design Decisions

- **Vuetify** - This application is using Vuetify, a well-known design framework for Vue.js.
- **Material Design** - This application is using Material Design Icons, a well-documented icon library, recommended by Vuetify.

## Resources

- [Vuetify Docs](https://weather-app-ruby-iota-54.vercel.app/)
- [Playwright Doc](https://weather-app-ruby-iota-54.vercel.app/)
- [Icons Preview](https://weather-app-ruby-iota-54.vercel.app/)
- [Open Meteo API](https://weather-app-ruby-iota-54.vercel.app/)
- [Geocoding API](https://weather-app-ruby-iota-54.vercel.app/)

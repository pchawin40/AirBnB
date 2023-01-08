# AirBnB
*By Chawin Pathompornvivat - [Visit AirBnB Clone](https://airbnb-project-chawin.herokuapp.com/)*

**Table of Contents**
* [Getting Started](#getting-started)
* [AirBnB at a Glance](#airbnb-at-a-glance)
* [Application Architecture & Technologies Used](#application-architecture) 
* [Frontend Overview](#frontend-overview)
* [Backend Overview](#backend-overview)
* [Conclusion & Next Steps](#conclusion-and-next-steps)

## Getting Started
You'll need both the backend and the frontend for the AirBnB clone application. Take a moment to clone it from https://github.com/pchawin40/AirBnB. 

In both frontend and backend repository, run `npm install` for backend and frontend as it runs on React version 17. Next, run `npm install react-chrome-dino` to add a Resource Not Found component npm package (https://www.npmjs.com/package/react-chrome-dino). After installing, start both the backend server and frontend server by running 'npm start'.

Once you have run npm installation for both the backend and the frontend, run npm start in both repository to start your fullstack app.

### Configuration
In the `backend` folder, create a `.env` file that will be used to define your environment variables.

Populate the `.env` file based on the example below:

```plaintext
PORT=8000
DB_FILE=db/dev.db
JWT_SECRET=«generate_strong_secret_here»
JWT_EXPIRES_IN=604800
AWS_ACCESS_KEY_ID=«input_aws_access_key_id_here»
AWS_SECRET_ACCESS_KEY=«input_aws_secret_access_key_here»
AWS_BUCKET_NAME=«input_aws_bucket_name_here»
AWS_REGION=«input_aws_region_here»
MAPS_API_KEY=«input_maps_api_key_here»
```

Assign `PORT` to `8000`, and a strong JWT secret.

> Recommendation to generate a strong secret: create a random string using
> `openssl` (a library that should already be installed in your Ubuntu/MacOS
> shell). Run `openssl rand -base64 10` to generate a random JWT secret.

### Migrating and Seeding Database
Additionally, to set up backend database server. In the backend repository, run the following commands:

`dotenv npx sequelize db:migrate`: This command will migrate the data from the migrations files
`dotenv npx sequelize db:seed:all`: This command will seed the data from the seeders files

### Explore the reference application
* `App`: Does the browser routing
* `LandingPage`: The browser that users first see when they start up the webpage.
* `HostSpot`: Create AirBnB spot rendered on `LandingPage`
* `Spot`: Makes a fetch to the backend on mount and update to load the details of the selected Spot.
* `BookingModal`: A modal to show the current booking by the current logged-in user
* `ResourceNotFound`: An easter egg for when the resource that user attempt to load but is not found

### Proxy
In this project, two servers will be run on the following addresses:

* `http://localhost:8000` for your frontend
* `http://localhost:8000` for your backend

## AirBnB at a Glance
AirBnB is a fullstack [MERN](https://www.geeksforgeeks.org/mern-stack/) app that lets the user 
(i.e. the property owners and property renter) rent out their spaces to travelers looking
for a space to stay or to book their travels to one of the rent property.

##### AirBnB at a glance
![AirBnB at a glance](/readme-resources/airbnb-demo-1.png)

AirBnB is also integrated with the [Google Maps API](https://developers.google.com/maps/get-started). When users click on the 'Show Map' button in the landing page, it shows a map of earth and allow users to visualize where they'll be staying.

![AirBnB at a glance](/readme-resources/airbnb-demo-2.png)

## Application Architecture
As noted above, AirBnB is a fullstack MERN application. The majority of the application logic occurs within front end's [Redux](https://redux.js.org/) store and its interactions with the [Google Maps Javascript API](https://developers.google.com/maps/documentation/javascript/tutorial) via the [react-google-maps](https://www.npmjs.com/package/react-google-maps) library. 

The backend serves the frontend, responds to frontend requests, acts as an intermediary to serve spots data to the frontend, and fetches data from the SQLite and PostgreSQL database. 

## Frontend Overview
AirBnB is very frontend heavy application. It makes extensive use of 3rd-party APIs and resources to create a dynamic and data-rich experience. Below are the frontend technologies that make this application possible. 

### Frontend Technologies Used:
#### React
At its core, AirBnB is a React application. It uses very little of the core React library besides passing a few props, but makes extensive use of the technologies and libraries of the React ecosystem. Without the robust and well-documented React ecosystem, creating AirBnB would have been a substantially more challenging enterprise. 

#### Redux
[Redux](https://redux.js.org/) and the [react-redux](https://react-redux.js.org/) library were used to manage application state and make fetch requests to the server for data. 

All artist information is fetched on page load and kept in the Redux store. While this expensive operation lengthens the initial load time, it also allows for a snappy experience after that load.

Redux also stores and sets information about the `activeSpot`, whichever spot has been selected by the user. By managing this state in Redux, it provides easy access to the information across components without prop threading. This was particularly important because there were so many components in the application, largely due to all the spots being individual components, that if too many components were re-rendering constantly because of state change it would cause significant performance issues or crash the application completely. Redux provided a relatively simple way to manage this point of complexity. 

Redux also allows for a lot of extendibility if new features are to be implemented (additional feature wish-list discussed in [conclusion](#conclusion-and-next-steps)). 

## Backend Overview
AirBnB uses an Express server with SQLite and PostgreSQL as the database. Compared to the frontend, the backend of AirBnB is fairly simple, with the server sending the front end to the client, receiving requests, and sending data to the frontend. Below are the backend technologies used with some notes regarding their implementation. 

### Backend Technologies Used
#### ExpressJS
[Express](https://expressjs.com/) was the natural choice for AirBnB's server-side framework. The minimalism of Express lent itself to the very light-weight responsibilities of AirBnB's server. The server is just a couple of routes and a connection to the database, with a few utilities to facilitate this. 

## Conclusion and Next Steps
AirBnB Clone was fun to build. It opened my eyes to see the many functionalities that goes on with
the actual AirBnB website. It made me appreciate the efforts that went into building the popular modern app of today.

This also marks the first time that I've built a fullstack app solo, and my first project of significant scope where I originated the idea and brought it into existence. AirBnB has been an incredibly rewarding to create. 

While making AirBnB, I got to play with a whole bunch of new technologies and get better at programming even more. At the beginning of the project, I'd only learned React 2 weeks previously, and Redux 1 week before. I've come out of it stronger with both, and eager to continue getting better with React and creating cool stuff with the many amazing libraries and technologies of the React ecosystem. 

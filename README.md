# LEAFT
Catch a ride, save a leaf!

## Contributors
- [Vinh Huynh](https://github.com/VinhH2402)
- [Sunik Kim](https://github.com/sunikkim)
- [Salma Noe](https://github.com/Sanoe9)
- [Chris McGee](https://github.com/cmac0351)
- [Richard Medina](https://github.com/richard960)
- [Ryan Lott](https://github.com/ryanlott168)

## What is LEAFT?
LEAFT is a full-stack application built under a 4 week constraint at the request of a hypothetical client at Hack Reactor. The app is a green-focused carpool/ridesharing service along the lines of Uber, Lyft, etc., but with the goal of reducing emissions and fostering community.

## What does LEAFT do?
LEAFT was built in order to fill a gap in the current rideshare market. While most other rideshare apps treat drivers as independent contractors who provide a service to individual customers, LEAFT opts for a more flexible and community oriented model that is built around the idea of carpooling.

The app offers two basic roles to every user: driver and rider. Drivers can submit routes that they are planning to drive, where they can specify pick-up and drop-off locations as well as the pick-up date and time. Riders can then see all driver-submitted routes in their area and select any of them. After selection, the driver is notified that their route has been confirmed, and both driver and rider then meet at the location/time as specified in the driver’s route.

Because drivers create the routes rather than riders, the app encourages carpooling for trips that were already planned, versus the creation of many new individual trips. This allows drivers and riders to build a sense of community while also reducing the number of redundant trips—and the associated carbon emissions!

The app itself involves two main components, a large map that displays selected routes—including an optimized path between pick-up and drop-off locations—and a list of submitted routes. There is also a balance feature that allows users to deposit money into a LEAFT account, which can then be used to tip drivers and compensate them for gas.

## Tech Stack
- **Design/UI/UX**
  - Figma
- **Front-end**
  - React
  - React Router
  - Sass
  - Socket.io
  - react-table
  - google-map-react
- **Back-end**
  - Node.js
  - Express
  - Sequelize + MySQL
  - dotenv
  - bcrypt
  - passport
  - Socket.io
- **CI/CD**
  - Nginx
  - GitHub Actions
- **Testing**
  - Jest
- **Hosting**
  - AWS EC2

## Technical Challenges/Research
**Challenge:** Balancing the amount of driver-rider interactivity with the given time constraints.

**Lesson learned:** A comprehensive, deliberate planning phase before writing any code allowed our team to deliver a fully functional app that could get drivers and riders connected as quickly and easily as possible.

**Challenge:** Navigating API key security when using the Google Maps API to geocode user-submitted routes.

**Lesson learned:** Our team learned that environment variables stored in the React front-end are not secure in production and can be accessed by malicious users. We decided to 1) store our API key in an .env file in the back-end, and 2) restrict the API key itself to limit potential use by malicious users.

## Demo/Walkthrough
Cancel route
![](https://drive.google.com/uc?export=view&id=1oAqiesMR5tvSxN_Lje_iIuRlpSyNV0br)
Select driver route
![](https://drive.google.com/uc?export=view&id=1bzWGJ87aXJAtgVTwHfUOf3qpBX97EEWH)
Tip driver
![](https://drive.google.com/uc?export=view&id=1l09tZCvw6NbfdO6A1bNBpJyzMXf--516)
Select and deselect route
![](https://drive.google.com/uc?export=view&id=1BcDCRZUfmFQ5z9NDzQ0sWTc5TxsjoLoq)
Cancel confirmed route
![](https://drive.google.com/uc?export=view&id=1GN0TjizlyUZ4cKjo2HwWZ-xWg9Q99bOC)
Withdraw funds
![](https://drive.google.com/uc?export=view&id=1g2aqYyK-g3_FFqmRHkqqprwfI6e6k_op)
Deposit funds
![](https://drive.google.com/uc?export=view&id=1HWDAjSbXQKHHVghsMCujbEK8qaAmSb0J)
Add route
![](https://drive.google.com/uc?export=view&id=1lwh_zFNn1XgdyoWepQK-gj-EBSzNfD1Q)
Login
![](https://drive.google.com/uc?export=view&id=1pCWNyTNixuOpt3DXSFmY8jSaUryFksc5)
Register
![](https://drive.google.com/uc?export=view&id=1u-LOa6soiLDIPXPbLy-segkycTCm_RaN)

## How does LEAFT work?
Users must create an account and log in to use LEAFT. After logging in, the user can select whether they want to be a driver or rider (a user can switch freely between the two roles).

As a driver, the user can submit a new route by inputting a pick-up and drop-off location, as well as the pick-up date and time. The given addresses are then sent through a Google Maps geocoding API, which converts human-readable addresses into latitude and longitude coordinates. These coordinates are stored together with the rest of the route data in the database. The driver can also browse a list of their own routes and select any of them to display them on the map. Any route whose date/time has passed is automatically deleted from the database for convenience.

As a rider, the user can see all driver-submitted routes within their area and select any of them. Upon selection, the route will display on the map with further details on pick-up and drop-off. The rider can then confirm that route, which will immediately notify the driver. After confirmation, the rider can also tip the driver using their account balance.

## Development Workflow
Our team of 6 opted to utilize the Agile method of development. This involved team standup meetings at least 3 times a week to provide updates on specific features, bugs and technical decisions/dilemmas. It also involved an iterative style of development, where the team first identified the essential User Stories and Acceptance Criteria for an MVP version of the app before diving into the code itself. This was essential because of our short timeframe and the relative complexity of even a basic, functional version of the app as envisioned by the client. Finally, all teamwork was tracked and ticketed via [GitHub projects](https://github.com/BOC-LightSalmon/hr-rpp29-leaft/projects/1) to ensure efficiency and organization.

We also decided to elect three members to specific leadership roles in order to streamline the development process:

**Product Manager:** [Sunik Kim](https://github.com/sunikkim)

**Architecture Owner:** [Chris McGee](https://github.com/cmac0351)

**UI Owner:** [Ryan Lott](https://github.com/ryanlott168)

The product manager helped facilitate work efforts, managed project tickets, and tracked progress towards completing all tasks scheduled for the current sprint. More specifically, major responsibilities included:

- Running standups
- Overseeing the [ticketing system](https://github.com/BOC-LightSalmon/hr-rpp29-leaft/projects/1)
- Meeting with clients
- Guiding User Story & Product Acceptance Criteria creation

The architecture owner helped the team agree upon the overall tech stack and made sure the team was informed of any system changes. They also ensured that team members were consistent with build tools, linters, workflow, and commits. The architecture owner was responsible for ensuring the project was set up for continuous integration, continuous deployment, and ensuring the engineering team met 60% test coverage.

The UI owner was responsible for delivering the initial wireframes that helped generate and ultimately accompany the planned user stories. They also facilitated and delegated among team members to have wireframes ready to present during the client proposal meeting.

All team members helped each other with specific blockers/bugs throughout the process in paired and sometimes group coding sessions.
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
<table>
  <tbody>
    <tr>
      <td>Front End Languages</td>
      <td>
        <img alt="JavaScript" src="https://img.shields.io/badge/-Javascript-F7DF1E?style=for-the-badge&labelColor=black&logo=javascript&logoColor=F7DF1E" />
        <img alt="HTML" src="https://img.shields.io/badge/-HTML%205-E34F26?style=for-the-badge&labelColor=black&logo=html5&logoColor=E34F26" />
        <img alt="CSS" src="https://img.shields.io/badge/-SASS-CC6699?style=for-the-badge&labelColor=black&logo=html5&logoColor=CC6699" />
      </td>
    </tr>
    <tr>
      <td>Frameworks & Libraries</td>
      <td>
        <img alt="React" src="https://img.shields.io/badge/react-61DAFB?&style=for-the-badge&logo=react&labelColor=black&logoColor=61DAFB" />
        <img alt="React Router" src="https://img.shields.io/badge/react%20router-CA4245?&style=for-the-badge&logo=react-router&labelColor=black&logoColor=CA4245" />
        <img alt="Bootstrap" src="https://img.shields.io/badge/-Bootstrap-7952B3?style=for-the-badge&labelColor=black&logo=bootstrap&logoColor=7952B3" />
        <img alt="React Table" src="https://img.shields.io/badge/-React%20Table-FF4154?style=for-the-badge&labelColor=black&logo=react-table&logoColor=FF4154" />
        <img alt="Socket.io" src="https://img.shields.io/badge/-Socket.io-010101?style=for-the-badge&labelColor=black&logo=socket.io&logoColor=white" />
        <img alt="Passport" src="https://img.shields.io/badge/-Passport-34E27A?style=for-the-badge&labelColor=black&logo=passport&logoColor=34E27A" />
      </td>
    </tr>
      <td>Database & Back End</td>
      <td>
        <img alt="MySQL" src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white&labelColor=black"/>
        <img alt="Sequelize" src="https://img.shields.io/badge/-Sequelize-52B0E7?&style=for-the-badge&labelColor=black&logo=sequelize&logoColor=52B0E7"/>
        <img alt="NodeJS" src="https://img.shields.io/badge/-Node.js-339933?&style=for-the-badge&labelColor=black&logo=node.js&logoColor=339933"/>
      </td>
    </tr>
      <td>Design</td>
      <td>
        <img alt="Figma" src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&labelColor=black&logo=figma&logoColor=F24E1E" />
      </td>
    </tr>
    <tr>
      <td>Utilities</td>
      <td>
        <img alt="Create React App" src="https://img.shields.io/badge/create%20react%20app-09D3AC?&style=for-the-badge&logo=create-react-app&labelColor=black&logoColor=09D3AC" />
        <img alt="Create React App" src="https://img.shields.io/badge/npm-CB3837?&style=for-the-badge&logo=npm&labelColor=black&logoColor=09D3AC" />
      </td>
    </tr>
         <tr>
      <td>Testing</td>
      <td>
        <img alt="Jest" src="https://img.shields.io/badge/jest-C21325?&style=for-the-badge&logo=jest&labelColor=black&logoColor=C21325" />      
        </td>
    </tr>
     <tr>
      <td>Workflow</td>
      <td>
        <img alt="Github" src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"/>
        <img alt="Slack" src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white"/>
        <img alt="Zoom" src="https://img.shields.io/badge/Zoom-2D8CFF?style=for-the-badge&logo=zoom&logoColor=white"/>
      </td>
    </tr>
    <tr>
      <td>Deployment</td>
      <td>
        <img alt="GitHub Actions" src="https://img.shields.io/badge/githubactions-2088FF?style=for-the-badge&labelColor=black&logo=githubactions&logoColor=2088FF"/>
        <img alt="AWS" src="https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&labelColor=black&logo=amazon-aws&logoColor=white" />
      </td>
    </tr>
  </tbody>
</table>

## Technical Challenges/Research
**Challenge:** Balancing the amount of driver-rider interactivity with the given time constraints.

**Lesson learned:** A comprehensive, deliberate planning phase before writing any code allowed our team to deliver a fully functional app that could get drivers and riders connected as quickly and easily as possible.

**Challenge:** Navigating API key security when using the Google Maps API to geocode user-submitted routes.

**Lesson learned:** Our team learned that environment variables stored in the React front-end are not secure in production and can be accessed by malicious users. We decided to 1) store our API key in an .env file in the back-end, and 2) restrict the API key itself to limit potential use by malicious users.

## Demo/Walkthrough
**Cancel route:**

![](https://drive.google.com/uc?export=view&id=1oAqiesMR5tvSxN_Lje_iIuRlpSyNV0br)

**Select driver route:**

![](https://drive.google.com/uc?export=view&id=1bzWGJ87aXJAtgVTwHfUOf3qpBX97EEWH)

**Tip driver:**

![](https://drive.google.com/uc?export=view&id=1l09tZCvw6NbfdO6A1bNBpJyzMXf--516)

**Select and deselect route:**

![](https://drive.google.com/uc?export=view&id=1BcDCRZUfmFQ5z9NDzQ0sWTc5TxsjoLoq)

**Cancel confirmed route:**

![](https://drive.google.com/uc?export=view&id=1GN0TjizlyUZ4cKjo2HwWZ-xWg9Q99bOC)

**Withdraw funds:**

![](https://drive.google.com/uc?export=view&id=1g2aqYyK-g3_FFqmRHkqqprwfI6e6k_op)

**Deposit funds:**

![](https://drive.google.com/uc?export=view&id=1HWDAjSbXQKHHVghsMCujbEK8qaAmSb0J)

**Add route:**

![](https://drive.google.com/uc?export=view&id=1lwh_zFNn1XgdyoWepQK-gj-EBSzNfD1Q)

**Login:**

![](https://drive.google.com/uc?export=view&id=1pCWNyTNixuOpt3DXSFmY8jSaUryFksc5)

**Register:**

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

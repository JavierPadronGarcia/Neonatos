# MetaHospitalFP

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#introduction">Introduction</a>
    </li>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <span>Diagrams</span>
      <ul>
        <li><a href="#use-case-diagram">Use case diagram</a></li>
        <li><a href="#class-diagram">Class diagram</a></li>
        <li><a href="#class-diagram">Entity-relation diagram</a></li>
      </ul>
    </li>
    <li><a href="#usability-and-accessibility">Usability and accessibility</a></li>
    <li><a href="#figma-prototype">Figma prototype</a></li>
    <li><a href="#user-requirements">User requirements</a></li>
    <li>
      <span>Getting started</span>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#open-the-project">Open the project</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

# Introduction

This project is an application about the administration an creation of activities and assigments of 
students, teachers and more, the objective is to create a system that can be used by all users in the school. 

This app will have different modules for each role (teacher, student, director, guest ... ). In the application, actions can be performed for each role. Among these, we can highlight the creation of activities for teachers, in addition to being able to assign students to their courses. On the other hand, we would emphasize the possibility of creating courses and assigning teachers and students to these courses, this being done by administrators.

As seen in the previous paragraph, the need arises to facilitate the management and viewing of students' grades, as they can quickly access their pending activities and exercises. This enables them to easily manage the courses assigned to teachers.

The project is not developed for a specific company; it is a public project. However, recommendations and assistance are provided by Fidenet, and for the development of another section of the application, the company Scott&Irwin is involved.

In conclusion, the main idea is to develop an easy-to-use and intuitive application for use in an educational setting.

# About The Project

To provide context for the upcoming diagrams, we will explain in more detail the actions that users will perform in the app.

This project is an application about the administration of activities, the users have some roles like students, that can complete exercises and read files and see their punctuations in the activities.

The teachers can assign activities and exercises to their students. The last user is the administrator, he is the only user that can create cases, which will be assigned to students by their teachers and can assign students and teachers to a classroom.

The cases will be evaluated based on a set of criteria ("Items"). The criteria will be used to determine the grade for each case.

In addition, there will be a guest user. This guest user will only be able to access public cases.
Any changes they make will not be saved to the database.

# Diagrams

### Use case diagram

As explained in the previous section, we visually illustrate in the following diagram all the actions that each of the roles can perform.

<div style="text-align: center; height: fit-content; margin: 20px 0">
  <img src="./readmeImages/useCaseDiagram.png" alt="use case diagram" width="70%">
</div>

### Class diagram

<div style="text-align: center; height: fit-content; margin: 20px 0">
  <img src="./readmeImages/classDiagram.png" alt="class diagram" width="70%"/>
</div>

Thanks to the class diagram, we can start identifying the different
entities that need to be created to create the database. However,
we still need one last diagram, which is the Entity-Relation diagram, in than diagram I will explain in detail all the entities and relations

### Entity-relation diagram

<div style="text-align: center; height: fit-content; margin: 20px 0">
  <img src="./readmeImages/entityRelationDiagram.png" alt="entity-relation diagram" width="70%">
</div>

The design of the entity-relationship (E/R) model is customized to support the management of activities and exercises within an educational environment. The subsequent sections elaborate on the E/R structure, its entities, relationships, as well as considerations and modifications made to ensure the application's flexibility and scalability.

### Users
The "Users" entity encompasses various roles within the application, including administrators, teachers, directors, and students. Each user can be affiliated with a course, and for students, the date of course enrollment is stored to manage repetitions.

**Relationships:**
- **Users-Courses:** Establishes a relationship assigning users (teachers and students) to courses.
- **Students-Exercises:** Designates the assignment of exercises to students by the faculty of their respective courses.

### Course Evaluation
Course evaluation involves three components: "Items," representing evaluation criteria for a case, and "Grades," where student grades are recorded. Each exercise is linked to a case, and grades are correlated with "Items" to identify the evaluated aspects.

**Entities:**
- **Items:** Represents the evaluation criteria for a case.
- **Grades:** Stores student grades, correlated with "Items."

### Work Units and Colors
"Work Units" establish connections between cases and courses, enabling teachers to access student evaluations. The introduction of the "Color" entity allows the assignment of identifying colors to work units, enhancing accessibility and promoting intuitive navigation.

**Relationships:**
- **Work Units-Courses:** Forms a relationship connecting cases with courses.
- **Work Units-Colors:** Establishes a relationship for assigning identifying colors to work units.


### Relational model

<div style="text-align: center; height: fit-content; margin: 20px 0">
  <img src="./readmeImages/RelationalModel.png" alt="entity-relation diagram" width="50%">
</div>


<p align="right">(<a href="#metahospitalfp">back to top</a>)</p>

## Considerations for the Future

**Separation of the Users table:**
The Users table has been separated to adapt to specific fields for each type of user, allowing empty fields according to the role.

**Roles and Users in Separate Tables:**
The creation of separate tables for roles is proposed, allowing greater flexibility of permissions between users and facilitating access management to different pages of the application.


### Scalability:
Designed with future expansions in mind, avoiding unnecessary modifications to existing fields and tables.

### Customization of Colors:
The "Color" table has been incorporated to enable customization of course colors, considering a future section for teachers to customize the interface.

## Additional Proposals to Enhance the Model

### Course History for Students

**Proposal:** Add a "CourseHistory" entity to store the courses a student has taken over time.

**Justification:** Facilitate tracking and management of students' academic progression, offering a complete history of completed courses.

### Communication Module

**Proposal:** Introduce a "Communication" entity to manage communication between teachers, students, and administrators.

**Justification:** Improve interaction within the application, allowing messages, announcements, and notifications among different roles, contributing to a more collaborative and efficient experience.

### Activity Records

**Proposal:** Include "ActivityRecords" and "ExerciseRecords" entities to maintain a history of activities and exercises performed by students.

**Justification:** Facilitate analysis and tracking of individual student progress, providing detailed information on activities performed.

### Audit of Changes

**Proposal:** Implement an audit mechanism to record changes in the database, such as permission modifications, course creation, or exercise assignment.

**Justification:** Provide transparency and traceability, crucial for change management and identifying potential security issues.

### Enhancements in Customization

**Proposal:** Expand customization by allowing teachers to define additional fields for courses and exercises.

**Justification:** Increase the versatility of the application by adapting to specific needs of each course, giving teachers more control over the structure of information.

### Calendar Integration

**Proposal:** Integrate a "Calendar" entity to manage events, deadlines, and important dates related to courses and activities.

**Justification:** Improve planning and coordination, providing users with a comprehensive view of academic events and relevant deadlines.

These proposals integrate into the existing project to enrich functionality, adapting it to evolving educational needs and providing a more comprehensive and customizable experience.

<p align="right">(<a href="#metahospitalfp">back to top</a>)</p>

# Figma prototype

Once that I have a first view of the application, I can start to create the prototype, to create it I used Figma, here is the prototype. [Figma prototype]

# Usability and accessibility

Los formularios están validados proporcionando sus respectivos mensajes al usuario, entre los mensajes que podemos ver en este caso, el inicio de sesión son:

- message when a field is empty:

In this message the empty fields fill the border in red to show the user exactly where is the problem: 

<div style="text-align: center; height: fit-content; margin: 20px 0">
  <img src="./readmeImages/usabilityAndAccesibility/loginNoDataInForm.png" alt="login error, no data in form" width="35%"/>
  <img src="./readmeImages/usabilityAndAccesibility/loginNoDataInForm2.png" alt="login error, no data in form" width="35%"/>
</div>

- message when the user is not found:

<div style="text-align: center; height: fit-content; margin: 20px 0">
  <img src="./readmeImages/usabilityAndAccesibility/loginNoUserFound.png" alt="login error, no user found" width="40%"/>
</div>

- message when there is no connection to the server:

<div style="text-align: center; height: fit-content; margin: 20px 0">
  <img src="./readmeImages/usabilityAndAccesibility/loginNoConnectionToServer.png" alt="login error, no connection to server" width="40%"/>
</div>

The last two images has error control, the first the error is generated in the backend an is catched in the frontend to show the message and the last one is generated when the user try to get informacion from the backend and there is no response:

<div style="text-align: center; height: fit-content; margin: 20px 0">
  <img src="./readmeImages/usabilityAndAccesibility/handleLoginCodeImage.png" alt="image of the code where the error is catched" width="59%"/>
   <img src="./readmeImages/usabilityAndAccesibility/loginCatchingErrorsCodeImage.png" alt="image of the code where the error message is shown" width="40%"/>
</div>

##

After that, when the user is correctly logged it shows a success message like this:

<div style="text-align: center; height: fit-content; margin: 20px 0">
  <img src="./readmeImages/usabilityAndAccesibility/loginSuccessfull.png" alt="image of the code where the error message is shown" width="50%"/>
</div>

##

Another aspect is the interfaces, which are simple and uncluttered, in addition to being intuitive with pleasant colors and good contrast between text, buttons, and the background. Here, we present several images of interfaces for different types of users:

<div style="text-align: center; height: fit-content; margin: 20px 0">
  <img src="./readmeImages/usabilityAndAccesibility/adminInterfaceAspect.png" alt="admin interface" width="45%"/>
  <img src="./readmeImages/usabilityAndAccesibility/adminGroupsInterface.png" alt="admin interface" width="50%"/>
  <img src="./readmeImages/usabilityAndAccesibility/teacherMainInterface.png" alt="teacher interface" width="50%"/>
</div>

The interfaces are also responsive, allowing them to adapt to various devices, including mobile phones:

<div style="text-align: center; height: fit-content; margin: 20px 0">
  <img src="./readmeImages/usabilityAndAccesibility/adminInterfaceAspectMobile.png" alt="admin interface" width="30%"/>
  <img src="./readmeImages/usabilityAndAccesibility/adminGroupsInterfaceMobile.png" alt="admin interface" width="30%"/>
  <img src="./readmeImages/usabilityAndAccesibility/teacherMainInterfaceMobile.png" alt="teacher interface" width="30%"/>
</div>

##

Furthermore, for options that can significantly impact data, a confirmation message is displayed to allow the user to cancel the action:

<div style="text-align: center; height: fit-content; margin: 20px 0">
  <img src="./readmeImages/usabilityAndAccesibility/eliminationQuestion.png" alt="elimination confirmation message" width="80%"/>
  <img src="./readmeImages/usabilityAndAccesibility/logoutQuestion.png" alt="logout confirmation message" width="50%"/>
</div>

<p align="right">(<a href="#metahospitalfp">back to top</a>)</p>

##

Other aspects of accessibility are tested with Lighthouse, it gives a max punctuation of 100:

<div style="text-align: center; height: fit-content; margin: 20px 0">
  <img src="./readmeImages/usabilityAndAccesibility/lighthouseAccesibility.png" alt="accessibility punctuation of 100" width="80%"/>
</div>

This is because the interfaces have a good contrast, all the images and icons have an alt text, all text sizes are relative, this allows the user to zoom in on the browser, and the font size increases appropriately.

##

In addition, the users can use the tab key to move through the application, they don't necessary need to use the mouse, here is an image of the function:

<div style="text-align: center; height: fit-content; margin: 20px 0">
  <img src="./readmeImages/usabilityAndAccesibility/focusDemostration.png" alt="an item beign focused when tab key is used" width="40%"/>
</div>

And when you tap the enter key it executes the action, in this case it goes to the groups page:

<div style="text-align: center; height: fit-content; margin: 20px 0">
  <img src="./readmeImages/usabilityAndAccesibility/focusDemostration2.png" alt="an item beign focused when tab key is used" width="90%"/>
</div>

Here is the code for this interactions: 

tabIndex is added to be focusable and onKeyDown to listen to the enter key, when it's focus check if the key is the enter key and if it's the correct key navigate to the new page

<div style="text-align: center; height: fit-content; margin: 20px 0">
  <img src="./readmeImages/usabilityAndAccesibility/focusDemostration3.png" alt="code of the container focusable" width="90%"/>
  <img src="./readmeImages/usabilityAndAccesibility/focusDemostration4.png" alt="code of the function that navigate when is the correct key pressed" width="60%"/>
</div>

##

Finally, all the pages have restricted access exept the login page, when the user is logged in takes a token with the user information including the role of the user, this role is used to navigate to the user page and can't  change to a page that is not allowed to go, this is implementet with private routes, here is an image of all the pages and their roles allowed:

<div style="text-align: center; height: fit-content; margin: 20px 0">
  <img src="./readmeImages/usabilityAndAccesibility/privateRoutes.png" alt="code of the private routes" width="70%"/>
</div>

<p align="right">(<a href="#metahospitalfp">back to top</a>)</p>

## User Requirements

  1. To use the application the user must have an account

  2. The application will work in all plattforms

  3. Administration <br />
    3.1 Log in securely to the platform. <br/>
    3.2 Once logged in, the system should show the dashboard with all functionalities available. <br/>

  4. Teacher <br />
    4.1 Create activities and assign them to students.<br/>
    4.2 Assign exercises and set deadlines.<br/>
    4.3 Change the visibility of the workUnits in the group


<p align="right">(<a href="#metahospitalfp">back to top</a>)</p>

## Getting Started

### Prerequisites

- Have a text editor like [Visual Studio Code]

- Have installed the lastest lts version of node js

you can see what version is installed with:

 ```sh
  node --version
  ```

If you don't have node js <a href='https://nodejs.org/en'>click here</a> to install it

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/JavierPadronGarcia/Neonatos.git
   ```

2. Go to the new folder and Install NPM packages for the frontend
    ```sh
    cd Neonatos/frontend
    npm install
    ```

3. Go to the backend folder and install the npm packages:

    ```sh
    cd Neonatos/backend
    npm install
    ```

4. Finnaly you need to create the .env file in the main folder in the backend:

    ```sh
    cd Neonatos/backend
    ```

You will have the folder like this:

![Image of the folder directoy backend](/readmeImages/BackendFolderDotenv.png)

In the .env you need to put the following lines, this are an example,

 ```sh
  JWT_SECRET= #a difficult password for the JWT token

  MYSQL_DATABASE=db_metahospitalfp
  MYSQL_TEST_DATABASE=db_metahospitalfp_test
  MYSQL_USER= #your mysql user, usually is root
  MYSQL_PASSWORD= #your mysql password
  MYSQL_ROOT_PASSWORD= #the mysql root password

  DB_HOST=localhost

  NODE_ENV=development
```
Once you have all the data here, you will need to create the mysql database:

Open mysql workbench and login to your account.

Now, in the toolbar clic here to create a database 

![Image of the toolbar in mysql workbench](/readmeImages/MysqlToolbar.png)

And put the same database name that you have in the .env:

![Image of the creation of the database in mysql workbench](/readmeImages/MysqlCreateDatabase.png)

Clic on apply and you have finished the set up of the proyect.

<p align="right">(<a href="#metahospitalfp">back to top</a>)</p>

### Open the project

 Now we have installed the proyect you need to start it like this:

  - Start the backend:

  To start the backend, go to the backend folder in the terminal an put this:
  ```sh
    npm start
  ```
  This command will run the server and show you something like this:

  ![Image of the console when you start the server](/readmeImages/ConsoleStartServer.png)

  And if it's the first time starting the backend it will create all the tables and relations.

  Now, mysql workbench will show all the tables created:

  ![Image of the tables created in mysql workbench after running the server](/readmeImages/TablesCreatedAfterRunningTheServer.png)

  If you want to check the created endPoints of the backend 
  <a href='https://documenter.getpostman.com/view/29809597/2s9YeD8DNB'>click here</a>

  In the link you will see all the endpoints in the database with folders for each table, if you want to see a description of the table, clic in the folder and you will see this:

  ![Image of the description of a table in postman](/readmeImages/DescriptionOfATableInPostman.png)

  - Start the frontend:

  Starting the frontend is very simmilar to the backend, you only need to go to the frontend directory
  and run this command in the terminal:

  ```sh
    npm start
  ```

  Now it will start a localhost server in the port 3000 and you can start to use it:

  ![Image of the console when you start the frontend server](/readmeImages/FrontendConsoleStartingTheServer.png)

## Organization

I have organized my work following the Scrum methodology, breaking down tasks into the smallest possible issues to maintain a high level of organization. This approach enables me to track and understand my weekly progress effectively.


## Pila tecnológica:

[![React][React.js]][React-url]
[![Node.js](https://img.shields.io/badge/Node.js-<VERSION>-green?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)


## Conclusión

Este proyecto me ha gustado mucho, ha sido complicado ya que tuve que es un proyecto bastante grande, pero he aprendido mucho. Además, me tocó con una pila tecnológica que me parece muy cómoda, sobre todo porque ya había practicado con react, por lo que se me ha hecho mucho mas llevadero. Lo más tedioso es la documentación

<!-- CONTACT -->
## Contact

Javier Padrón García -- padrongarciajavier04@gmail.com

Project Link: [https://github.com/JavierPadronGarcia/Neonatos.git](https://github.com/JavierPadronGarcia/Neonatos.git)

<p align="right">(<a href="#metahospitalfp">back to top</a>)</p>

<!-- URL for images and links -->

[Figma prototype]: https://www.figma.com/file/kgVO2ubTzYIx4k8zKhmsPT/Activities-Application?type=design&node-id=0%3A1&mode=design&t=GwbDayW38fcjR2gf-1

[Visual Studio Code]: https://code.visualstudio.com
[postman]: https://www.postman.com
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
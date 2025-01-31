# Smart Genesis Frontend Assignemnt

This project is basically a web application in which there is google authentication using next auth and simple CRUD operations of content in a Rich Text Editor (react-quill). Also I'm using mongo db for database and storing the collections - user and content.

# Files and Folder
The files and folder structure is not very complicated because this is an next js application -

1. There is a main src directory in which app folder is there containig all routes.
2. Inside the app folder there is a folder for auth in which handler is implmented by creatino of auth options.
3. Then there is a content folder in which contains API endpoints for managing the content - dynamic routing is there for updation and deletion of  specific content via id's
4. There is a editor folder which is a /editor route in which we are doing our CRUD operation of content from a rich text editor.
5. Component folder contains a error page component and Navbar component for easily signing in and signing out.
6. There is also a lib folder inside the src directory which has a file responsible for database connection.
7. models folders in the src contains the User and Contentt schema.

# Installation

#### To run this application locally, you'll need to have - 
1. GOOGLE ID and GOOGLE SECRET for Oauth.
2. MONGODB_URI - this is a connection string to connect your cluster with the database.
3. NEXTAUTH_URL can be http://localhost:3000


#### Here are the steps to run this repository if you have the above keys -

1. Down the .zip or clone this repository.
2. Navigate to the project directory.
3. Install dependencies: `npm install`
4. Make an .env file in the root directory with keys as MONGODB_URI, GOOGLE_ID, GOOGLE_SECRET and NEXTAUTH_URL and the values would be their respective keys
5. Run the development server: `npm run dev`
6. Open your browser and navigate to `http://localhost:3000` to view the application :)
## Contributing

Contributions are welcome!

 For major changes or bugs or have suggestions for improvement, please open an issue first to discuss what you would like to change.

# README

## How to run the backend project
1. Create a new database in MSSQL.
2. Run the SQL scripts 
    - Navigate to the **backend/CafeEmployee.Scripts**. 
    - Execute the SQL scripts located in this folder. These scripts will create the necessary database tables and insert random data.
3. Update the connection strings.
    - Open the **appsettings.json** file located in the **backend/CafeEmployee.API** folder.
    - Update the two connection strings.
        - **MasterDbConnection**: Used for write and update operations
        - **SlaveDbConnection**: Used for read operations
4. Run the API project.
    - Open a terminal in the **backend/CafeEmployee.API** folder.
    - Run the command: **dotnet run**
    - The API should now be hosted at **http://localhost:5074**.

## How to run the frontend project
1. Install the npm dependencies. 
    - Navigate to the **frontend** folder 
    - Open a terminal and run the command **npm install**.
2. Run the frontend application.
    - After the dependencies are installed, run the command **npm start**.
    - The frontend application should now be accessible at **http://localhost:3000**.
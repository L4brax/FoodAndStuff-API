
# FoodAndStuff-API

## Installation

  - Install dependencies before starting the server :
  ```
  npm install
  ```

  - Install MongoDB Compass for database management.

  User : userFS
  https://www.mongodb.com/download-center?filter=enterprise#compass


## Development

  - You must have nodemon installed
  ```
  npm install nodemon -g
  ```

  - Usefull commmands :

  Start the server :
  ```
  npm start
  ```

  - If you want to install a new dependency, fix the version with the option -E and -S to save it in the package.json file. 
  ```
  // Exemple for a general dependency :
  npm install mydependency@version -SE

  // Exemple for a dev dependency :
  npm install mydependency@version -DE
  ```

## Possible Data Model

  - **User** 
    - **_id** *unique auto-generated*
    - **email** *required*
    - **birth**
    - **first_name**
    - **last_name**
    - **username** *unique required*
    - **password** *required*
    - **creation** *auto-generated*
    - **update** 
    - **active**
    - **type** *default : "basic"*

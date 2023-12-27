# Project Title

Space service.

## Description

Simple service for loading planets data from csv file and allowing accessing it via api.

### Running

After cloning the project on your computer you basiclly have 2 options.

#### Option1 - Docker:

On Windows - Just double click the start.bat/stop.bat files in the scripts/bat folder to run or stop the service.

On Linux based - Just run "bash start.sh/stop.sh" inside the scripts/bash folder to run or stop the service.

#### Option2 - Locally:

 - Run "npm i" for installing all dependencies. 
 - Run "npm run build" for compiling the project.
 - Copy the assets folder from src to dist.
 - Edit MONGO_URI in the .env file to your mongo uri. 
 - Edit PLANETS_FILE_PATH in the .env file to the path of your dist/assets/planets.csv file.
 - Run "npm start" for running the service.

### Dependencies

#### Option1:
- Git installed.
- Docker installed.

#### Option2:
- Git installed.
- Node + Npm + Typescript installed.
- Mongo installed.




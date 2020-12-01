# SZKT Timetable backend

Application for viewing GTFS timetable of Szeged Transport Company. The frontend is based in Angular 8 and the backend is made in Express.js.

## Features
* PWA support
* Docker with [backend](https://github.com/akoselek273/szkt-timetable-backend) (available soon)
* [Available in cloud](https://szkt-timetable-webapp.netlify.app/)
## Usage

1. Clone repository
  ```shell
  git clone https://github.com/akoselek273/szkt-timetable-webapp
  ```
2. Install packages
  ```shell
  npm install
  ```
3. Run Angular

Use external API server
  ```shell
  npm start
  ```
Use own API server
  ```shell
  ng serve --proxy-config proxy.json
  ```
## Run with backend in Docker
1. Clone repository
    ```shell
    git clone https://github.com/akoselek273/szkt-timetable-webapp
    ```
2. Build Docker image
    ```shell
    cd szkt-timetable-webapp
    docker build -t szkt-timetable-webapp .
    ```
3. Start container
    ```shell
    docker run -d -p 4200:4200 -p 3000:3000 szkt-timetable-webapp
    ```

## License

This project is based on the MIT license

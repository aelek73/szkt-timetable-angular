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
## License

This project is based on the MIT license

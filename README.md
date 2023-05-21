# Information

This is part of a bachelor thesis done by the authors in 2023.

A link to the other parts of the project can be found below:

- [VR-Demo](https://github.com/Bacheloroppgave-Kystverket/Unity-VR-Eye-Tracking-Demo)
- [Frontend](https://github.com/Bacheloroppgave-Kystverket/Frontend)
- [Backend](https://github.com/Bacheloroppgave-Kystverket/Backend)

# Setting up website

The website can be run in two modes. Either development mode or production mode.

## Production

This project utilizes a docker container to run the final product. Before the website is ran on a docker go to src/App.js and change the host IP address or port.

Following command builds the docker container.

### docker build . -t react

When the docker container is built run this command to check that the image is made. It should be named react.

### docker images

And then to run the docker container

### docker run react

## Development setup

In order to run this project as a development setup the following commands needs to be done:

### "npm install"

And

### "npm start"

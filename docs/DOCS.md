# RCE Documentation

## Setting up the application

> NOTE: As mentioned before, set up is not required. This guide is aimed at development, contribution and testing of the service rather than for the end user.
>
> This file describes the local machine setup. Both the server and client will be created on localhost. As such, the installation will also take place on the user's machine. Please refer to [SERVER.md](https://github.com/nafees87n/codebox/blob/main/docs/SERVER.md) to learn about hosting the applcation remotely

### Installation:

The application can be installed locally by cloning this repository, and checking out the `main` branch.

For **Linux** users who do not have docker engine and docker-compose set up on their device, the provided convenience script `setup.sh` can be used to quickly install the dependencies by running the following command:

```
$ sudo bash ./setup.sh
```

> NOTE: This script will also handle the permissions for docker to function normally. You will be prompted to reboot your device at the end, it is advisable to accept as a reboot is required to apply all the changes.

---

In case you cannot, or choose to not run the bash script, you can follow the steps below, including the "Permissions" section.

The project requires the host machine to have docker and docker-compose installed. Follow the official installation guide available at [Install Docker Engine](https://docs.docker.com/engine/install/ubuntu/) and [Install Docker Compose](https://docs.docker.com/compose/install/).

> NOTE: docker-compose depends on docker engine to function.

#### Permissions:

Docker may return a Permission Denied error without being run as `sudo`. To fix this, we do the following:

```
$ sudo groupadd docker
$ sudo usermod -aG docker $USER
$ newgrp docker
$ docker run hello-world
```

Alternatively, we can prepend all docker commands with `sudo`, or run them in a root terminal (not recommended).

Reboot the host machine.

---

### Windows Set Up

Docker must be installed as per the instructions on the website.

- Docker Desktop (Includes docker engine and compose): https://docs.docker.com/desktop/windows/install/

> To confirm that you have docker-compose after installing Docer Desktop, simply run `docker-compose --version` in a terminal.

## Starting the application

> The API will be available on `localhost:9000` and the client app on `localhost:3000`

Start a terminal and redirect into the project repository:

```
$ cd /path/to/repo/codebox/
```

### Using the Bash Script [Linux/Unix only]:

Run the provided `start.sh` bash script:

```
$ ./start.sh
Select mode [P]roduction / [d]evelopment: d
```

Providing input as `d` starts the application in development mode, and reflects all the changes made before starting. Providing `p` as the input starts the application without rebuilding, any changes made will not be reflected.

The mode can directly be provided to the command as an argument:

```
$ ./start.sh p
```

### Using Docker Commands [**Windows Compatible**, Linux/Unix]:

> If you cannot run the bash script, the following commands may be used to start the application.

The project uses a docker volume called `userdata` to store any user generated files [code, input, a.out files]. We can create this volume as follows:

```
$ docker volume create --name=userdata
```

The rest of the setup is handled by docker-compose:

```
$ docker-compose up
```

The containers are built from scratch only for the first time we run this command. Any subsequent attempts will simply start the existing container. To rebuild the containers (in case of any changes to the source), we can run:

```
$ docker-compose up --build
```

## How it works

The back-end functionality is provided by means of two docker services that run node applications -- `server` and `executor`, each in its own container. The containers are linked by the `userdata:/storage` mounted volume, as well as over a network, thanks to docker-compose.

Starting the application in any of the above listed methods starts both of these services simultaneously. The `server` listens on port 9000, while the `executor` listens on port 8080.

### The Executor:

`executor` is an express server API that accepts a POST request at `/code/<lang>`, where the language is simply the file extension used by that programming language (py, cpp, js).

The request body contains a single key `filePath` which is the path to the user's files in the mounted volume `/storage/`. These files are generated by the `server` container and will be explained later.

This service simply executes the code file at the given location and returns the result as a JSON response.

All user files generated for this execution are deleted by this service.

The executor service doesn't create any files and it's purpose is simply to execute any file that it is requested to. For this reason, a client may not directly communicate with this service. Only the server can send requests over the container network.

### The Server:

`server` is also an express API. The client can send a POST request to the `/code` endpoint.

The React app for the client is now available, and will communicate with this server through the `axios` library.

The request body here contains 4 keys:

- `key <String>` - A random string to uniquely identify each request

- `language <String>` - Represents the programming language to be used. Value is identical to the file extension used by the language

- `code <String>` - User provided code

- `input <String>` - User provided input for their code

`key` can be entered manually as any random string using Postman or cURL. It can also be obtained by sending a GET request to `/code`. This system is utilised by the client to obtain a unique identifier for the session, which can be used for future expansion of RCE's features (for example an interview tool).

The server also makes use of `socket.io` to maintain a realtime connection with a client. It makes a room for a new user, and allows other users to join these rooms.

### The Client:

`client` is any independent service capable of sending `GET` and `POST` requests. However, to be able to utilise the full feature set, a proper frontend is required. We have developed a React app for this purpose.

The client maintains locally the session key and the user input data, in it's localStorage. `axios` is used to communicate with the server for http actions. This involves obtaining a key and sending code to be executed.

It also utilises the `socket.io` client for a realtime communication with the server. This is used to create a realtime room with other client instances.

#### Significance of the key:

The `key` is the string that acts as the name of all the files a user's request generates. For example, if a user sends a C++ program along with a key of `abcde` then the following files are generated:

```
storage
├── abcde.cpp (source code file)
├── abcde (input text file)
└── abcde.out (output file, generated on compilation)
```

The `key` is thus also used to generate the `filePath` variable that we saw in the executor service. The `filePath` is simply given (from root) as -- `/storage/${key}` without any file extension.

It is also the `sessionId` of the user. It can be obtained by sending a GET request to `localhost:9000/code` or `http://13.235.81.188/code`.

The `sessionId` enables users to uniquely identify their room. It can be shared to other people. It essentially represents the room, and so you can enter a `sessionId` to join another person's room for a live session.

# Remote Code Executer

This RCE project currently provides a basic API to execute programs on a remote server. Basic code validation is performed to prevent potentially malicious code.

## Functioning:

The API accepts POST requests to the `localhost:9000/code` endpoint. Check out DOCS.md for a detailed reference

### Request Body Keys:

- `key <String>` - A random string to uniquely identify each request

- `language <String>` - Represents the programming language to be used. Value is identical to the file extension used by the language

- `code <String>` - User provided code

- `input <String>` - User provided input for their code

### Supported Languages:

- Python3 (use: _py_)

- C++ (use: _cpp_)

- Node/Javascript (use: _js_)

## Code Validation:

Currently, code validation takes place by selectively rejecting or accepting libraries depending on the language. The list of libraries of concern are listed below

#### Python (Rejected Libraries):
```
os | subprocess | shlex | xml | pickle
```
#### C++ (Accepted Libraries):
```
iostream | algorithm | stdio    | cstdio | vector | math | cmath | cstring | string
deque    | iomanip   | iterator | map    | queue  | set  | stack | conio   | ctype
```
#### Node/Javascript (Accepted Libraries):
```
readline | buffer | string_decoder | timers | stream | util
```
## Tech Stack:

This RCE project combines various different technologies:

- Node and Express - Server and Executer services are written using these

- React - Client application is written with React

- Docker/docker-compose - Containerising of the services and providing an isolated sandbox for code execution

- Bash scripting - Convinience scripts for environment setup and project execution
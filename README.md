# Remote Code Executer

This RCE project currently provides a basic API to execute programs on a remote server. Basic code validation is performed to prevent potentially malicious code.

## Functioning:

The API accepts POST requests to the `/code` endpoint.

### Request Body Keys:

- Key- A random string to uniquely identify each request
- Languge
- Code String
- Input String

### Supported Languages:

- Python3 (use: _py_)
- C++ (use: _cpp_)
- Node/Javascript (use: _js_)

## Code Validation:

Currently, code validation takes place by selectively rejecting or accepting libraries depending on the language. The list of libraries of concern are listed below

#### Python (Rejected Libraries):

- os
- subprocess
- shlex
- xml
- pickle

#### C++ (Accepted Libraries):

- iostream
- algorithm
- stdio
- cstdio
- vector
- math
- cmath
- cstring
- string
- deque
- iomanip
- iterator
- map
- queue
- set
- stack
- conio
- ctype

#### Node/Javascript (Accepted Libraries):

- readline
- buffer
- string_decoder
- timers
- stream
- util

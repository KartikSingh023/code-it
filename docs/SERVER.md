# RCE Server Setup

## Our Setup

> NOTE: This guide is for remote server deployment. We have already performed these steps and hosted the project.

> If you wish to attempt at hosting this, replace all server URLs with the public IPv4 or correspondig DNS host name provided by AWS EC2, and replace the client app URLs with the one for your own heroku app.

The `server` (and `executor`), make up the API. This is hosted on an AWS Elastic Cloud Compute (EC2) instance, available [here](http://13.235.81.188/) (http). The API listens over HTTP (on port 80).

The `client` is hosted via Heroku, deployed [here](http://codebox.herokuapp.com) (http). Heroku also builds an HTTPS site, however it is currently incompatible with our API.

### Setup Process:

The repository has a `production` branch available for hosting on the EC2 instance; with the following changes:

```
/docker-compose.yml:
-> server: ports updated to '80:9000'


/server/app.js:
-> using client url http://codebox.herokuapp.com instead of localhost:3000.
-> using the same as origin for cors middleware


/server/routes/handler.js:
-> using cors middleware with http://codebox.herokuapp.com as origin
```
On EC2, make an Ubuntu Server Instance and SSH into it using the steps provided by AWS.
```
$ ssh -i /path/to/privatekey.pem ubuntu@amazon-provided-dns.url
$ sudo apt update
$ sudo apt upgrade
```

Then make a new directory and initialise it as a git repository.
```
$ mkdir codebox
$ cd codebox
$ git init
```

Then add the repository's origin as a remote, and checkout the production branch.
```
$ git remote add origin https://github.com/nafees87n/codebox.git
$ git pull origin production
$ git checkout production
```

Lastly, we run the setup and start bash scripts to start the API.
```
$ sudo bash ./setup.sh

=> instance will reboot here, SSH in again

$ sudo bash ./start.sh p
```

***

For the client, a [seperate repository](https://github.com/aaryak-shah/rce-client) has been set up, that uses `heroku` as a remote. In essence, it is a very simple express application that serves the /build/index.js file of the client.

The same code, however can be found in the `production` branch of the current repo, in the `client` folder.

The client's request URLs have been updated to the IP address of the API: `http://13.235.81.188`

To host this, we perform the following actions:

First, we enter the project repository and create a heroku app
```
$ cd rce-client/
=> Copy or pull client code into this folder's main branch.

$ heroku login
=> Complete login procedure and return to the terminal

$ heroku create $APP_NAME
```

Confirm that the heroku remote has been added
```
$ git remote
=> If heroku is not listed, run:
$ heroku git:remote -a $APP_NAME
```

Lastly, assuming there are no untracked changes, we push the main branch to Heroku
```
$ git push heroku main
```
> NOTE: Do **NOT** use `$ heroku open` in the terminal or "Open app" on the Heroku dashboard to run the client app. It defaults to the `https` site that is currently incompatible. Instead follow this link http://codebox.herokuapp.com/

#!/bin/bash

# this bash script will perform necessary steps to run the server and executor containers
# script currently requires docker and docker-compose to be installed

# docker volume is created
docker volume create --name=userdata

clear

# check arguments
if [[ $1 = "d" ]] || [[ $1 = "D" ]]
then
  docker-compose up --build # dev mode, container rebuilt to accomodate changes
elif [[ $1 = "P" ]] || [[ $1 = "p" ]]
then
  docker-compose up # production mode, container started directly
else
  echo -n "Select mode [P]roduction / [d]evelopment: "
  read MODE
  if [[ $MODE = "P" ]] || [[ $MODE = "p" ]]
  then
    docker-compose up
  elif [[ $MODE = "D" ]] || [[ $MODE = "d" ]]
  then
    docker-compose up --build
  fi
fi
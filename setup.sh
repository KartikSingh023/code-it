#!/bin/bash

# Install docker engine
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install docker-compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose

# reboot service
echo "A reboot is required for changes to take effect..."
echo "Reboot now? [Y/n]"
read REBOOT
if [[ $REBOOT = 'y' ]] || [[ $REBOOT = 'Y' ]]
then
  reboot
else
  echo "Reboot before starting server."
fi
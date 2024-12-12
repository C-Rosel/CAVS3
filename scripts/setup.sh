#! /bin/bash

sudo apt-get update && sudo apt-get upgrade -y

sudo apt install curl
sudo apt-get install npm

curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash 
source ~/.profile || echo "source ~/.profile"

nvm install 16 -y
nvm use 16

npm install
npm install roslib
npm install chart.js react-chartjs-2

npm run dev

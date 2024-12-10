#!/bin/bash

# Add ROS package repository
echo "Adding ROS Melodic repository..."
sudo sh -c 'echo "deb http://packages.ros.org/ros/ubuntu $(lsb_release -sc) main" > /etc/apt/sources.list.d/ros-latest.list'
curl -sSL http://packages.ros.org/ros.key | sudo apt-key add -

# Update and install ROS Melodic
echo "Installing ROS Melodic desktop full..."
sudo apt-get update
sudo apt-get install -y ros-melodic-desktop-full

# Install rosbridge_server and more
echo "Installing rosbridge_server..."
sudo apt-get install -y ros-melodic-rosbridge-server
sudo apt-get install ros-melodic-rqt
sudo apt-get install ros-melodic-rqt-common-plugins

# Initialize rosdep
echo "Initializing rosdep..."
sudo apt-get install -y python3-rosdep
sudo rosdep init
rosdep update

# Add ROS environment setup to bashrc
echo "Sourcing ROS environment in .bashrc..."
echo "source /opt/ros/melodic/setup.bash" >> ~/.bashrc
source ~/.bashrc

echo "ROS Melodic and rosbridge_server installation complete!"

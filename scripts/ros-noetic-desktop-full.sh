#!/usr/bin/env bash
set -eu

[[ "$(lsb_release -sc)" == "focal" ]] || exit 1
ROS_DISTRO=noetic

sudo sh -c 'echo "deb http://packages.ros.org/ros/ubuntu $(lsb_release -sc) main" > /etc/apt/sources.list.d/ros-latest.list'

sudo apt-get install -y curl
curl -s https://raw.githubusercontent.com/ros/rosdistro/master/ros.asc | sudo apt-key add -
sudo apt-get update || echo ""

sudo apt-get install -y ros-${ROS_DISTRO}-desktop-full
sudo apt-get install -y python3-rosdep

source /opt/ros/noetic/setup.bash

grep -F "source /opt/ros/${ROS_DISTRO}/setup.bash" ~/.bashrc ||
echo "source /opt/ros/${ROS_DISTRO}/setup.bash" >> ~/.bashrc

sudo apt install python3-rosdep python3-rosinstall python3-rosinstall-generator python3-wstool build-essential

ls /etc/ros/rosdep/sources.list.d/20-default.list > /dev/null 2>&1 && sudo rm /etc/ros/rosdep/sources.list.d/20-default.list
sudo rosdep init 
rosdep update



grep -F `catkin locate --shell-verbs` ~/.bashrc ||
echo "source `catkin locate --shell-verbs`" >> ~/.bashrc

grep -F "ROS_IP" ~/.bashrc ||
echo "export ROS_IP=127.0.0.1" >> ~/.bashrc

grep -F "ROS_MASTER_URI" ~/.bashrc ||
echo "export ROS_MASTER_URI=http://\$ROS_IP:11311" >> ~/.bashrc

echo ""
echo "Success installing ROS ${ROS_DISTRO}"
echo "Run 'source ~/.bashrc'"
echo ""
# bin/bash!

# This is a set up file for installing Apptainer on Ubuntu 18.04 systems.

# Dependencies
sudo apt update && sudo apt upgrade -y
sudo apt-get install build-essential libseccomp-dev pkg-config uidmap squashfs-tools squashfuse fuse2fs fuse-overlayfs fakeroot cryptsetup curl wget git -y

# Install Go
wget https://go.dev/dl/go1.20.5.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.20.5.linux-amd64.tar.gz
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc
source ~/.bashrc
go version

# Clone Apptainer Repo
git clone https://github.com/apptainer/apptainer.git
cd apptainer
git checkout v1.2.1
./mconfig
make -C builddir
sudo make -C builddir install

apptainer --version

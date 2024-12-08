Human-Computer Interactions Project Fall 2025 Team: CAVS 3

This is an application to interface with ROS topics running on CAVS vehicles for viewing purposes.

# Instructions to run front-end locally

Requirements:


## Requirements

### Client System
- **ROS Version**: ROS 1 Noetic
- **OS**: Ubuntu 20.04 or compatible
- **Node.js**: Node: v16.20.2 | Npm: 8.19.4 
- **rosbridge_suite**: Installed and running on the ROS system.

### Host System
- **Apptainer**: Installed for running the containerized application.

---

1. **Clone the Repository**
   ```
   git clone https://github.com/C-Rosel/CAVS3.git
   ```

2. **Navigate to the project directory**

Edit the config.json file located in frontend/public/:

   * Update rosMasterIP to the IP of their ROS Master.
   * Update rosBridgePort to the port rosbridge_suite is using.
   * Add/remove topics and their message types as needed.
   * Restart the container after making changes to the configuration file.

3. **Build the Apptainer image**
   ```
   sudo apptainer build CAVS3.sif apptainer.def
   ```

4. **Start rosbridge_suite on the ROS System**
   ```
   sudo apt install ros-noetic-rosbridge-server
   roslaunch rosbridge_server rosbridge_websocket.launch
   ```

5. **Run the container**
   ```
   apptainer run CAVS3.sif
   ```

# For Development
- Navigate to the project's frontend:
   ```
   cd CAVS3
   ```
- Run Dev:
   ```
   ./scripts/setup.sh
   ```
- Install Apptainer and ROS 1 Noetic for testing:
   ```
   ./scripts/apptainer_install.sh
   ./scripts/ros-noetic-desktop-full.sh
   ```




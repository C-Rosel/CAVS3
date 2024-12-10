# Human-Computer Interactions Project Fall 2025 Team: CAVS 3

This is an application to interface with ROS topics running on CAVS vehicles for monitoring purposes and showcasing.

# Instructions to run front-end locally

## Requirements

### Client System
- **ROS Version**: ROS 1 Melodic
- **OS**: Ubuntu 18.04 or compatible
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
   ```
   cd CAVS3
   ```

   Edit the config.json file located in frontend/public/:

   * Add/remove topics and their message types as needed.
   * Restart the container after making changes to the configuration file.

3. **Build the Apptainer image**
   ```
   sudo apptainer build CAVS3.sif apptainer.def
   ```

4. **Start rosbridge_suite on the ROS System**
   ```
   source /opt/ros/melodic/setup.bash
   sudo apt install ros-melodic-rosbridge-server
   roslaunch rosbridge_server rosbridge_websocket.launch
   ```

5. **Run the container**
   ```
   apptainer run CAVS3.sif
   ```

# For Development
- Navigate to the project's frontend:
   ```
   cd CAVS3/frontend
   ```
- Run Dev:
   ```
   sudo ./../scripts/setup.sh
   ```
- Install Apptainer and ROS 1 Noetic for testing:
   ```
   sudo ./../scripts/apptainer_install.sh
   sudo ./../scripts/ros-melodic-desktop-full.sh
   ```




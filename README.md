# MyoGrind

EE/BIOEN 461/561: Neural Engineering Tech Studio

## Overview

MyoGrind is a project designed to manage bruxism by using the MyoWare EMG Sensor Ecosystem to collect and transmit EMG data via Bluetooth. EMG sensors are placed along the masseter muscles of the human face to record and detect teeth grinding events, making this project clinically relevant for bruxism management.

## Authors

This code and project was completed by UW students listed below:
-Aditya Krishna 
-Elijah Reeb
-Emily Rodgers
-Frenda Lin

## Table of Contents

- [Setup](#setup)
- [Repository Structure](#repository-structure)
- [Arduino Code](#arduino-code)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Setup

### Prerequisites

- Arduino IDE
- MyoWare 2.0 Muscle Sensor and Wireless Shield
- Bluetooth-enabled device for receiving data (e.g., smartphone, laptop)
- **Libraries:**
  - ArduinoBLE
  - MyoWare

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/aditya-uw/MyoGrind.git
    cd MyoGrind
    ```

2. **Install Arduino IDE:**

    Download and install the [Arduino IDE](https://www.arduino.cc/en/software).

3. **Install required libraries:**

    Open Arduino IDE, go to **Sketch** -> **Include Library** -> **Manage Libraries...**, then search for and install:
    - ArduinoBLE
    - MyoWare

4. **Open the Arduino code:**

    Navigate to the `code` directory and open the Arduino sketch in the Arduino IDE.

5. **Upload the code to your Arduino:**

    Connect your Arduino board to your computer and upload the sketch.

## Repository Structure
- **app:** This folder contains the application components including:
  - **Display:** User interface for visualizing data and interactions.
  - **Login Screen:** Secure access to the application.
  - **Teeth Grinding Visualization:** A screen to visualize the number of teeth grinding events in a table and a bar graph showing the number of events per day.
  - **Settings Page:** Interface to adjust the vibration level and display the MyoGrind device battery level.
- **code:** This folder contains all the code related to the project:
  - **dev_code:** Contains Arduino code used during the development phase. This code was written and uploaded to Arduino using the Arduino IDE.
  - **DEPLOYED:** Code that was deployed on the Arduino on the day of the demo.
  - **data_collection:** Code to read data from the serial monitor and collect it into .json files for use in machine learning to detect teeth grinding activities compared to other oral activities.
- **data:** This folder contains the .json files collected during data collection, which have been converted into .csv files for further analysis.

- **notebooks:** This folder contains Jupyter notebooks used to open .json files and plot the EMG data to observe teeth grinding events.

- **notes:** Design process notes including device specifications, troubleshooting tips, achievements, and other project-related information.

- **pics:** Contains images documenting the project development process.

## Arduino Code

The Arduino code is located in the `code` directory. It configures the MyoWare sensor to read EMG data and transmit it via Bluetooth.

### Key Features

- Reads ENV, RAW, and REF data from the MyoWare sensor.
- Transmits data via Bluetooth with the local name "MyoGrind".

## Usage

### Running the Arduino Code

1. **Connect the MyoWare sensor to your Arduino.**
2. **Upload the code from the `code/DEPLOYED` directory.**
3. **Place the EMG sensors along the masseter muscles to detect bruxism events.**
4. **Power on the device and ensure it is broadcasting as "MyoGrind".**

### Verifying Bluetooth Broadcasting

To ensure the MyoGrind is broadcasting using Bluetooth Low-Energy:

1. **Download the LightBlue app on your smartphone.**
2. **Open the app and scan for nearby Bluetooth devices.**
3. **Find and select "Arduino" or "MyoGrind" in your list of peripherals.**

## Data Collection

The `data_collection` folder contains code for collecting EMG data via the Arduino serial monitor. This data is stored in .json files and can be uploaded to Edge Impulse to train a machine learning model. This model can potentially be quantized and deployed on the Arduino to perform on-board predictions of teeth-grinding, talking, chewing, or other oral activities.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss your ideas.

## License

This project is licensed under the MIT License.

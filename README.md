# MyoGrind

EE/BIOEN 461/561: Neural Engineering Tech Studio

## Overview

MyoGrind is a project designed to manage bruxism by using the MyoWare EMG Sensor Ecosystem to collect and transmit EMG data via Bluetooth. EMG sensors are placed along the masseter muscles of the human face to record and detect teeth grinding events, making this project clinically relevant for bruxism management.

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

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/aditya-uw/MyoGrind.git
    cd MyoGrind
    ```

2. **Open the Arduino code:**

    Navigate to the `code` directory and open the Arduino sketch in the Arduino IDE.

3. **Upload the code to your Arduino:**

    Connect your Arduino board to your computer and upload the sketch.

## Repository Structure

- **code:**
  - **DEPLOYED:** Contains the deployed Arduino code that makes the system work.
  - **dev_code:** Contains development code and experiments.

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

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss your ideas.

## License

This project is licensed under the MIT License.

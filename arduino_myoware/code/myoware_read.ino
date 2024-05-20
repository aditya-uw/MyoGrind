/*
  MyoWare Example_01_analogRead_SINGLE
  SparkFun Electronics
  Pete Lewis
  3/24/2022
  License: This code is public domain but you buy me a beverage if you use this and we meet someday.
  This code was adapted from the MyoWare analogReadValue.ino example found here:
  https://github.com/AdvancerTechnologies/MyoWare_MuscleSensor

  This example streams the data from a single MyoWare sensor attached to ADC A0.
  Graphical representation is available using Serial Plotter (Tools > Serial Plotter menu).

  *Only run on a laptop using its battery. Do not plug in laptop charger/dock/monitor.

  *Do not touch your laptop trackpad or keyboard while the MyoWare sensor is powered.

  Hardware:
  SparkFun RedBoard Artemis (or Arduino of choice)
  USB from Artemis to Computer.
  Output from sensor connected to your Arduino pin A0

  This example code is in the public domain.
*/

#include <SPI.h> // for communicating with the SD card
#include <SD.h> // for reading and writing to the SD card

const int chipSelect = 10; // chip select pin for the SD card

int sensorPin = A0; // select the input pin for the MyoWare sensor
int sensorValue = 0; // variable to store the value coming from the sensor
int sensorThreshold = 300; // threshold value to start recording
bool isRecording = false; // flag to indicate if recording is in progress
unsigned long lastTimeAboveThreshold = 0;  // variable to store the last time the sensor value was above stated threshold
unsigned long interval = 100;  // interval set to 100 milliseconds (0.1 second)
unsigned long lastSampleTime = 0; // variable to store the last time a sample was taken

int eventNumber = 0;
File dataFile;


void setup() {
  Serial.begin(115200); // start serial communication at 115200 bps
  
  // wait for serial port to connect
  while (!Serial); // optionally wait for serial terminal to open
  Serial.println("MyoWare Sensor Data Logging");

  // initialize the SD card
  if (!SD.begin(chipSelect)) {
    Serial.println("Card initialization failed!");
    return;
  }
  Serial.println("Card initialized."); // print message to serial terminal

  // Create or open the file
  dataFile = SD.open("data.csv", FILE_WRITE);
  if (dataFile) {
    // Check if the file is empty, if so, write headers
    if (dataFile.size() == 0) {
      dataFile.println("EventID,CurrentTime,SensorValue");
    }
    dataFile.close();
  } else {
    Serial.println("Error opening data.csv");
  }
}

void loop() {
  unsigned long currentTime = millis(); //TODO: get actual time on arduino board, need to setup wifi for this???
  sensorValue = analogRead(sensorPin); // read the input on analog pin A0
  // Serial.println(sensorValue); // print out the value you read

  // Start Recording: When sensorValue first exceeds 300 and you are not already recording, 
  //                   start recording, increment event number
  if (sensorValue > sensorThreshold && !isRecording) {
    // Start recording
    isRecording = true;
    eventNumber++; // Increment event number for a new event
  }

  // If recording is in progress, write sensor values to the SD card
  if (isRecording) {
    // Check if it is time to take a sample.  We want to take a recording every 0.1 seconds.
    if (currentTime - lastSampleTime >= interval) {
      dataFile = SD.open("data.csv", FILE_WRITE);
      if (dataFile) {
        // Write each sensor value on a new line with the event number, timestamp, and sensor value
        dataFile.print(eventNumber);
        dataFile.print(",");
        dataFile.print(currentTime);
        dataFile.print(",");
        dataFile.println(sensorValue);
        dataFile.close();
      }
      lastSampleTime = currentTime; // Update last sample time
    }

    // Check if sensor values stay below threshold for more than one second (1000 milliseconds)
    if (sensorValue > sensorThreshold) {
      lastTimeAboveThreshold = currentTime; // Update last time above threshold
    } else if (currentTime - lastTimeAboveThreshold > 1000) { 
      isRecording = false; // End the recording session
    }
  }

  delay(50);  // small delay to stabilize readings to avoid overloading the serial terminal
}

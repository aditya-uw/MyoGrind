#include <ArduinoBLE.h>  // Include the ArduinoBLE library

bool crossed = 0;
int threshold = 14;
int maxthreshold = 700;
int timeOn = 2500;
int counter = 0;

// set up holding values for threshold detection
int sensorHoldingA0 = 0;
int sensorHoldingA1 = 0;
int setHolding = 0;
int setTime = 50;

int A0Enable = 1;
int A1Enable = 1;

// Define the BLE service and characteristic
BLEService eventService("180D"); // Custom service UUID
BLECharacteristic eventCharacteristic("2A37", BLERead | BLENotify, 20); // Custom characteristic UUID

void setup() 
{
  Serial.begin(115200);
  // while (!Serial); // optionally wait for serial terminal to open
  Serial.println("MyoGrind Headset Control");
  
  // set up pins to be ready to vibrate
  pinMode(11, OUTPUT);
  pinMode(6, OUTPUT);
  digitalWrite(11, HIGH);
  digitalWrite(6, LOW);

  // Initialize BLE
  if (!BLE.begin()) {
    Serial.println("Starting BLE failed!");
    while (1);
  }

  // Set up BLE service and characteristic
  BLE.setLocalName("MyoGrind Headset");
  BLE.setAdvertisedService(eventService);
  eventService.addCharacteristic(eventCharacteristic);
  BLE.addService(eventService);

  BLE.advertise();
  Serial.println("BLE device initialized and advertising");
}

void loop() 
{
  // read from both EMG sensors
  int sensorValueA0 = analogRead(A0) - 20;
  int sensorValueA1 = analogRead(A1);
  unsigned long timestamp = millis(); //- 5000;
  
  Serial.print(timestamp);
  Serial.print(",");
  Serial.print(sensorValueA0);
  Serial.print(",");
  Serial.println(sensorValueA1);

  // update the sensorHolding Values
  if(setHolding < setTime) {
    sensorHoldingA0 = sensorHoldingA0 + sensorValueA0;
    sensorHoldingA1 = sensorHoldingA1 + sensorValueA1;
    setHolding = setHolding + 1;

  }else if(setHolding == setTime) {
    sensorHoldingA0 = sensorHoldingA0 / setTime;
    sensorHoldingA1 = sensorHoldingA1 / setTime;
    setHolding = setHolding + 1;

  } else {
    sensorHoldingA0 = (sensorHoldingA0 + sensorValueA0) / 2;
    sensorHoldingA1 = (sensorHoldingA1 + sensorValueA1) / 2;
  }
  // Serial.print(sensorHoldingA0);
  // Serial.print(", holding ,");
  // Serial.println(sensorHoldingA1);


  // check if both sensors are valid datapoints

  // is holding value < max threshold
  if(sensorHoldingA0 > maxthreshold) {
    // Serial.println("Disabling A0");
    A0Enable = 0;
  } else {
    // Serial.println("Enabling A0");
    A0Enable = 1;
  }
  if(sensorHoldingA1 > maxthreshold) {
    A1Enable = 0;
    // Serial.println("Disabling A1");
  } else {
    // Serial.println("Enabling A1");
    A1Enable = 1;
  }

// now for the function to turn on the vibrational motors
  if (((sensorValueA0 * A0Enable) > threshold || (sensorValueA1 * A1Enable) > threshold) && crossed == 0)  {
    digitalWrite(6,HIGH);
    crossed = 1;
    // Serial.println("Turning on");

    // Notify connected devices
    eventCharacteristic.writeValue("Grinding detected!");
    
  } else if (crossed == 1 && counter < timeOn) {
    counter = counter + 25;

  } else {
    digitalWrite(6,LOW);
    counter = 0;
    crossed = 0;
    // Serial.println("Turning off");
  }

  BLE.poll();
  delay(25); // to avoid overloading the serial terminal

}
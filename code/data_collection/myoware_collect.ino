void setup() {
  Serial.begin(115200);
  delay(2000);
}

void loop() {
  int sensorValueA0 = analogRead(A0);
  int sensorValueA1 = analogRead(A1);
  int sensorValueA2 = analogRead(A2);
  unsigned long timestamp = millis() - 2000;

  if(sensorValueA2 > 100){
    Serial.print(timestamp);
    Serial.print(",");
    Serial.print(sensorValueA0);
    Serial.print(",");
    Serial.print(sensorValueA1);
    Serial.print(",");
    Serial.println(sensorValueA2);
  }

  delay(10);  // Adjust as necessary
}


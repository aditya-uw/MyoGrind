void setup() 
{
  Serial.begin(115200);
  while (!Serial); // optionally wait for serial terminal to open
  Serial.println("MyoWare Example_01_analogRead_SINGLE");
  pinMode(11, OUTPUT);
  pinMode(6, OUTPUT);

}

void loop() 
{
  digitalWrite(11, LOW);
  digitalWrite(6, LOW);

  int sensorValue = analogRead(A0); // read the input on analog pin A0

  Serial.println(sensorValue); // print out the value you read

  delay(25); // to avoid overloading the serial terminal

  if (sensorValue > 300) {
    digitalWrite(11, HIGH);
    delay(100);
  }
  delay(25);

}
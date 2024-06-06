void setup() 
{
  Serial.begin(115200);
  Serial.println("MyoWare Example_01_analogRead_SINGLE");
  pinMode(11, OUTPUT);
  pinMode(6, OUTPUT);

}

void loop() 
{
  digitalWrite(11, LOW);
  digitalWrite(6, LOW);

  int sensorValueA0 = analogRead(A0); // read the input on analog pin A0
  int sensorValueA1 = analogRead(A1);
  int threshold = 300;

  Serial.print(sensorValueA0); // print out the value you read
  Serial.print(",");
  Serial.println(sensorValueA1);

  if (sensorValueA0 > threshold || sensorValue A1 > threshold) {
    digitalWrite(6, HIGH);
    delay(100);
  }
  delay(10);

}
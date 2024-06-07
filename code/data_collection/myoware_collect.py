import serial
import time
import json
import csv
import keyboard  # To detect key presses
from threading import Thread


from datetime import datetime

# Get the current local date and time
now = datetime.now()

# Format the date and time as a string
date_time_str = now.strftime("%Y%m%d_%H%M00")


# Replace 'COM3' with the appropriate port for your system
ser = serial.Serial('COM11', 115200)
time.sleep(2)  # Give the connection a second to settle

# Function to clear the serial buffer
def clear_serial_buffer():
    while ser.in_waiting > 0:
        ser.read()

# Clear the serial buffer before starting sampling
clear_serial_buffer()

file_name = 'talkData' + date_time_str

csv_filename = file_name + '.csv'
json_filename = file_name +'.json'

# Initialize CSV file
with open(csv_filename, mode='w', newline='') as csv_file:
    csv_writer = csv.writer(csv_file)
    csv_writer.writerow(['Timestamp', 'SensorValueA0', 'SensorValueA1', 'SensorValueA2'])

# Initialize JSON file
data_list = []

# Flag to control the recording
recording = False

# Function to handle key press for stopping recording
def check_stop_key():
    global recording
    while recording:
        if keyboard.is_pressed('s'):
            print("Stopping data recording...")
            recording = False
        time.sleep(0.01)  # Small delay to reduce CPU usage

# Wait for 'g' key press to start sampling
print("Press 'g' to start sampling...")
while True:
    if keyboard.is_pressed('g'):
        print("Starting data sampling...")
        recording = True
        break
    time.sleep(0.1)  # Small delay to reduce CPU usage

# Start a thread to check for the stop key press
stop_key_thread = Thread(target=check_stop_key)
stop_key_thread.start()

try:
    print("Recording data... Press 's' to stop.")
    while recording:
        if ser.in_waiting > 0:
            line = ser.readline().decode('utf-8').strip()
            if line:
                print(line)  # For debugging purposes
                timestamp, sensorValueA0, sensorValueA1, sensorValueA2 = line.split(',')
                sensorValueA0 = int(sensorValueA0)
                sensorValueA1 = int(sensorValueA1)
                sensorValueA2 = int(sensorValueA2)
                timestamp = int(timestamp)
                
                # Write to CSV file
                with open(csv_filename, mode='a', newline='') as csv_file:
                    csv_writer = csv.writer(csv_file)
                    csv_writer.writerow([timestamp, sensorValueA0, sensorValueA1, sensorValueA2])
                
                # Write to JSON file
                data_list.append({
                    'timestamp': timestamp,
                    'sensorValueA0': sensorValueA0,
                    'sensorValueA1': sensorValueA1,
                    'sensorValueA2': sensorValueA2
                })
                
                with open(json_filename, mode='w') as json_file:
                    json.dump({'data': data_list}, json_file, indent=4)
        time.sleep(0.01)  # Small delay to reduce CPU usage
except KeyboardInterrupt:
    print("Data recording stopped by keyboard interrupt.")
finally:
    ser.close()
    print("Serial connection closed.")
    stop_key_thread.join()  # Ensure the stop key thread has finished

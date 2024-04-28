/* 
this code is no longer valid since optimizing code to remove startTime and endTime 
*/

CREATE TABLE events (
  event_id SERIAL PRIMARY KEY,
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL
);

CREATE TABLE sensor_readings (
  reading_id SERIAL PRIMARY KEY,
  event_id INTEGER NOT NULL,
  timestamp TIMESTAMP NOT NULL,
  sensor_value INTEGER NOT NULL,
  FOREIGN KEY (event_id) REFERENCES events(event_id)
);

/*

Notes for later:::

Transferring Data to PostgreSQL
    Once data is captured:
        1. Transfer to a Server: Use a script or manual process to upload your CSV files to a server or directly to your database system.
        2. Import CSV Data: Use PostgreSQL's COPY command to import data from the CSV files into the respective tables. 

COPY events(event_id, start_time, end_time) FROM '/path_to_csv/events.csv' DELIMITER ',' CSV HEADER;
COPY sensor_readings(event_id, timestamp, sensor_value) FROM '/path_to_csv/sensor_readings.csv' DELIMITER ',' CSV HEADER;
*/

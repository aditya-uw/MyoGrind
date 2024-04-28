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

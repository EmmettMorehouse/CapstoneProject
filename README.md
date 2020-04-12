# CapstoneProject
This project is a group capstone project for Kent State University.
## Flask Setup
To run project, install locally using pip

$ pip install -r requirements.txt

$ flask run

## Arduino Requirements
This project requires additional libraries that may be installed from the Arduino IDE using Tools -> Manage Libraries...
The following libraries must be included:
<SPI.h>
<WiFiNINA.h>
<PubSubClient.h>

It is also recommended to create a connections file for your WiFi information and MQTT information if it is not locally hosted.
"connections.h"

## Mosquitto MQTT Setup
Install Nodejs from this site: https://nodejs.org/en/download/
This project uses Node v10.16.0

Install Mosquitto MQTT from this site: https://mosquitto.org/download/
This project uses Mosquitto mqttv311

## MongoDB Setup
Install MongoDB from this site: https://docs.mongodb.com/manual/administration/install-community/
Once installed create a MongoDB Atlas account and download MongoDB Compass for linking local database to Atlas cloud.
https://www.mongodb.com/download-center
https://docs.mongodb.com/compass/current/
Once your MongoDB is created along with a collection you may use MongoDB Charts to create graphical displays and filter data. 
https://docs.mongodb.com/charts/saas/
This project uses Mongo v4.2.3, this is a community version.

## Project Specific Topics
This project for demonstration purposes is running on a local Macintosh machine and the todb.js file must be started manually. The Arduino sensor system must also be connected to the machine via USB port. If used elsewhere it is recommended to create a virtual server and setup the Arduino in a way to run while connected to a separate power supply such as a traditional wall socket. The todb.js program would have to run forever on a server to send database from the MQTT it is subscribed to to the MongoDB collection.
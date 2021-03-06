/*
 * Emmett Morehouse/John Yun/Jessica Warren/Brayton Rider
 * 03/28/2020
 * Kent State University Capstone Project
 */
 
#include <SPI.h>
#include <WiFiNINA.h>
#include <PubSubClient.h>
#include "connections.h"

//////Variables////////////////////////////

// WiFi Connection Variables
const char* ssid = mySSID;        
const char* pass = myPASS;    
int status = WL_IDLE_STATUS;

// MQTT Connection Variables
const char* mqtt_server = "192.168.1.184";

const char* subTopic = "arduino/sound/sensor";
const char* pubTopic = "arduino/sound/sensor";

// Sensor Variables
int sensorPin = A0;
int sensorValue = 0;

///////////////////////////////////////////

WiFiClient wifiClient;
PubSubClient client(wifiClient);

//Connect to WiFi
void setup_wifi() {
  delay(10);
  
  // We start by connecting to a WiFi network
  Serial.print("Connecting to network");

  WiFi.begin(ssid, pass);

  while (WiFi.status() != WL_CONNECTED) 
  {
    delay(10000);
    Serial.print(".");
  }

  Serial.println("WiFi connected");
}

void callback(char* topic, byte* payload, unsigned int length) 
{
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) 
  {
    Serial.print((char)payload[i]);
  }
  Serial.println();
}

//Resubscribe to MQTT
void reconnect() 
{
  // Loop until we're reconnected
  while (!client.connected()) 
  {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    if (client.connect("Mosquitto"))
    {
      Serial.println("connected");
      client.subscribe(subTopic);
    } 
    else 
    {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(9600);
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
}

void loop() {
  if (!client.connected()) 
  {
    reconnect();
  }
  client.loop();
  
  sensorValue = analogRead(sensorPin);
  
  char message[56];
  sprintf(message, " %d ", sensorValue);
  Serial.println(message);
  client.publish(pubTopic, message);

  delay(5000); // read once per 5 second
}
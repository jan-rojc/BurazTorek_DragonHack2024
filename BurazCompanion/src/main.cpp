#include <Arduino.h>
#include <NimBLEDevice.h>
#include <NimBLEServer.h>
#include <NimBLEUtils.h>


// Recieveing string commands:
//  "blink"
//  "toggle"

// TODO
// Animation states:
//  "on"
//  "off"
//  "blink"
//  "breathe" TODO
//  "loop" TODO



#define LED_PIN 1
// #define LED1_PIN 1
// #define LED2_PIN 1
// #define LED3_PIN 1
// #define LED4_PIN 1

#define SERVICE_UUID "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
#define CHARACTERISTIC_UUID "beb5483e-36e1-4688-b7f5-ea07361b26a8"

NimBLEServer *pServer = NULL;
NimBLECharacteristic *pCharacteristic = NULL;

bool deviceConnected = false;
std::string animationState = "blink";


// LED functions
void blink() {
  Serial.println("Blinking LED");
  digitalWrite(LED_PIN, HIGH);
  delay(1000);
  digitalWrite(LED_PIN, LOW);
  delay(1000);
}

void toggle() {
  Serial.println("Toggling LED");
  if (animationState == "on") {
    animationState = "off";
  } else {
    animationState = "on";
  }
}

void connected() {
  Serial.println("Connected");
  digitalWrite(LED_PIN, HIGH);
  delay(100);
  digitalWrite(LED_PIN, LOW);
  delay(100);
  digitalWrite(LED_PIN, HIGH);
  delay(100);
  digitalWrite(LED_PIN, LOW);
  delay(100);
  digitalWrite(LED_PIN, HIGH);
  delay(100);
  digitalWrite(LED_PIN, LOW);
  delay(100);
  digitalWrite(LED_PIN, HIGH);
  delay(100);
  digitalWrite(LED_PIN, LOW);
}

void advertising() {
  Serial.println("Advertising");
  digitalWrite(LED_PIN, HIGH);
  delay(100);
  digitalWrite(LED_PIN, LOW);
}

class MyServerCallbacks : public NimBLEServerCallbacks
{
  void onConnect(NimBLEServer *pServer)
  {
    Serial.println("Device connected");
    deviceConnected = true;
    connected();
  }

  void onDisconnect(NimBLEServer *pServer)
  {
    Serial.println("Device disconnected");
    deviceConnected = false;
    connected();
  }
};

class MyCallbacks: public NimBLECharacteristicCallbacks {
  void onWrite(NimBLECharacteristic *pCharacteristic) {
    std::string value = pCharacteristic->getValue();

    Serial.print("Received value: ");
    Serial.println(value.c_str());

    if (value == "blink") {
      blink();
    } else if (value == "toggle") {
      toggle();
    } else {
      Serial.println("Unknown value received");
    }
  }
};

void setup()
{
  Serial.begin(115200);
  // while(!Serial);  // wait for serial monitor to connect

  Serial.println("Starting BLE work!");

  pinMode(LED_PIN, OUTPUT); // Set LED_PIN as output
  digitalWrite(LED_PIN, LOW); // Initially turn off LED

  NimBLEDevice::init("BurazCompanion");
  pServer = NimBLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());

  NimBLEService *pService = pServer->createService(SERVICE_UUID);

  pCharacteristic = pService->createCharacteristic(
      CHARACTERISTIC_UUID,
      NIMBLE_PROPERTY::READ | NIMBLE_PROPERTY::WRITE);

  pCharacteristic->setValue("Hello World");
  pCharacteristic->setCallbacks(new MyCallbacks());

  pService->start();
  pServer->getAdvertising()->start();
  Serial.println("BLE server started");
}

void loop()
{
  // Blink LED when not connected
  if (!deviceConnected) {
    advertising();
  }

  delay(1000);
}
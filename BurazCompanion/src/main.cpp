#include <Arduino.h>
#include <NimBLEDevice.h>
#include <NimBLEServer.h>
#include <NimBLEUtils.h>


// Recieveing string commands:
//  "blink"
//  "toggle"
//  "breathe"
//  "loop_leds"


// Animation states:
//  "on"
//  "off"
//  "blink"
//  "breathe"
//  "loop_leds"


#define BUTTON_PIN 10

#define LED1_PIN 1
#define LED2_PIN 2
#define LED3_PIN 3
#define LED4_PIN 4

#define SERVICE_UUID "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
#define CHARACTERISTIC_UUID "beb5483e-36e1-4688-b7f5-ea07361b26a8"

NimBLEServer *pServer = NULL;
NimBLECharacteristic *pCharacteristic = NULL;

bool deviceConnected = false;
std::string animationState = "off";



// LED functions
void on_leds() {
  analogWrite(LED1_PIN, 255);
  analogWrite(LED2_PIN, 255);
  analogWrite(LED3_PIN, 255);
  analogWrite(LED4_PIN, 255);
}

void off_leds() {
  analogWrite(LED1_PIN, 0);
  analogWrite(LED2_PIN, 0);
  analogWrite(LED3_PIN, 0);
  analogWrite(LED4_PIN, 0);
}

void blink() {
  analogWrite(LED1_PIN, 255);
  analogWrite(LED2_PIN, 255);
  analogWrite(LED3_PIN, 255);
  analogWrite(LED4_PIN, 255);
  delay(100);
  analogWrite(LED1_PIN, 0);
  analogWrite(LED2_PIN, 0);
  analogWrite(LED3_PIN, 0);
  analogWrite(LED4_PIN, 0);
  delay(100);
}

void breathe(int min_val, int max_val) {
  for (int i = min_val; i < max_val; i++) {
    analogWrite(LED1_PIN, i);
    analogWrite(LED2_PIN, i);
    analogWrite(LED3_PIN, i);
    analogWrite(LED4_PIN, i);
    delay(5);
  }
  for (int i = max_val; i >= min_val; i--) {
    analogWrite(LED1_PIN, i);
    analogWrite(LED2_PIN, i);
    analogWrite(LED3_PIN, i);
    analogWrite(LED4_PIN, i);
    delay(5);
  }
  delay(20);
}


int brightness(int value, int max_value) {
  // returns beightness value between 0 and max_value/2
  if (value > max_value) {
    value = value % max_value;
  }

  if (value > max_value/2) {
    value = max_value - value;
  }

  value = value - 96;
  if (value < 0) {
    value = 0;
  }
  value = 255*value/159;  // normalize to 0-255

  return value;
}

void loop_leds(int max_value) {
  int led1_shift = 0;
  int led2_shift = max_value/4;
  int led3_shift = max_value/2;
  int led4_shift = 3*max_value/4;

  for (int i = 0; i < max_value; i++) {
    analogWrite(LED1_PIN, brightness(i + led1_shift, max_value));
    analogWrite(LED2_PIN, brightness(i + led2_shift, max_value));
    analogWrite(LED3_PIN, brightness(i + led3_shift, max_value));
    analogWrite(LED4_PIN, brightness(i + led4_shift, max_value));
    delay(5);
    // Serial.print(brightness(i + led1_shift, max_value));
    // Serial.print(" ");
    // Serial.print(brightness(i + led2_shift, max_value));
    // Serial.print(" ");
    // Serial.print(brightness(i + led3_shift, max_value));
    // Serial.print(" ");
    // Serial.print(brightness(i + led4_shift, max_value));
    // Serial.println();
  }
  // delay(50000);

}

void connected() {
  Serial.println("Connected");
  analogWrite(LED1_PIN, 255);
  analogWrite(LED2_PIN, 255);
  analogWrite(LED3_PIN, 255);
  analogWrite(LED4_PIN, 255);
  delay(100);
  analogWrite(LED1_PIN, 0);
  analogWrite(LED2_PIN, 0);
  analogWrite(LED3_PIN, 0);
  analogWrite(LED4_PIN, 0);
  delay(100);
  analogWrite(LED1_PIN, 255);
  analogWrite(LED2_PIN, 255);
  analogWrite(LED3_PIN, 255);
  analogWrite(LED4_PIN, 255);
  delay(100);
  analogWrite(LED1_PIN, 0);
  analogWrite(LED2_PIN, 0);
  analogWrite(LED3_PIN, 0);
  analogWrite(LED4_PIN, 0);
  delay(100);
  analogWrite(LED1_PIN, 255);
  analogWrite(LED2_PIN, 255);
  analogWrite(LED3_PIN, 255);
  analogWrite(LED4_PIN, 255);
  delay(100);
  analogWrite(LED1_PIN, 0);
  analogWrite(LED2_PIN, 0);
  analogWrite(LED3_PIN, 0);
  analogWrite(LED4_PIN, 0);
  delay(100);
  analogWrite(LED1_PIN, 255);
  analogWrite(LED2_PIN, 255);
  analogWrite(LED3_PIN, 255);
  analogWrite(LED4_PIN, 255);
  delay(100);
  analogWrite(LED1_PIN, 0);
  analogWrite(LED2_PIN, 0);
  analogWrite(LED3_PIN, 0);
  analogWrite(LED4_PIN, 0);
}


// animation handler
void animation(std::string state) {
  if (state == "on") {
    on_leds();
  } else if (state == "off") {
    off_leds();
  } else if (state == "blink") {
    blink();
  } else if (state == "breathe") {
    breathe(0, 128);
  } else if (state == "loop_leds") {
    loop_leds(512);
  } else if (state == "connected") {
    connected();
    animationState = "off";
  } else {
    Serial.println("Unknown animation state");
  }
}




class MyServerCallbacks : public NimBLEServerCallbacks
{
  void onConnect(NimBLEServer *pServer)
  {
    Serial.println("Device connected");
    deviceConnected = true;
    animationState = "connected";
  }

  void onDisconnect(NimBLEServer *pServer)
  {
    Serial.println("Device disconnected");
    deviceConnected = false;
  }
};

class MyCallbacks: public NimBLECharacteristicCallbacks {
  void onWrite(NimBLECharacteristic *pCharacteristic) {
    std::string value = pCharacteristic->getValue();

    Serial.print("Received value: ");
    Serial.println(value.c_str());

    if (value == "blink") {
      Serial.println("Blinking LED");
      animationState = "blink";
    } else if (value == "toggle") {
      Serial.println("Toggling LED");
      if (animationState == "on") {
        animationState = "off";
      } else {
        animationState = "on";
      }
    } else if (value == "breathe") {
      Serial.println("Breathing LED");
      animationState = "breathe";
    } else if (value == "loop_leds") {
      Serial.println("Looping LEDs");
      animationState = "loop_leds";
    } else {
      Serial.println("Unknown value received");
    }
    Serial.print("animationState: ");
    Serial.println(animationState.c_str());
  }
};

void setup()
{
  Serial.begin(115200);
  // Serial.begin(460800);

  // while(!Serial);  // wait for serial monitor to connect

  Serial.println("Starting BLE work!");


  pinMode(LED1_PIN, OUTPUT); // Set LED_PIN as output
  pinMode(LED2_PIN, OUTPUT); // Set LED_PIN as output
  pinMode(LED3_PIN, OUTPUT); // Set LED_PIN as output
  pinMode(LED4_PIN, OUTPUT); // Set LED_PIN as output
  analogWrite(LED1_PIN, 0); // Initially turn off LEDs
  analogWrite(LED2_PIN, 0);
  analogWrite(LED3_PIN, 0);
  analogWrite(LED4_PIN, 0);

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

  pinMode(BUTTON_PIN, INPUT_PULLUP); // Set button pin as input with internal pull-up resistor
}

void loop()
{
  // Blink LED when not connected
  if (!deviceConnected) {
    Serial.println("Advertising");
    animation("loop_leds");
  } else {
    animation(animationState);
  }


  // animation("loop_leds");

  // for (int i = 0; i < 128; i++) {
  //   Serial.print(digitalRead(BUTTON_PIN));
  //   Serial.print(" ");
  //   Serial.println(i);
  // }

  // digitalWrite(LED1_PIN, HIGH);
  // digitalWrite(LED2_PIN, HIGH);

  if (digitalRead(BUTTON_PIN) == LOW) {
    // digitalWrite(LED2_PIN, LOW);
    Serial.println("BUTTON PRESSED (leds off)");
    animationState = "off";
  }

  // } else {
  //   digitalWrite(LED2_PIN, HIGH);
  // }
  // delay(100);
}
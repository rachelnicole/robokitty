# robokitty
Is a DIY cat (or dog, I GUESS) feeder controlled over the web (locally for now) for less than $50.

There are two different feeding methods: feed instantly with the press of a button, or set up a CRON job to feed at hourly intervals.

The idea behind the project is over the past few years all of the feeders I've came across have had a level of complication that weren't very user-friendly to new coders, and I wanted to make something that is hopefully easy enough for everyone to use.

Let's get started!

![alt tag](https://raw.githubusercontent.com/rachelnicole/robokitty/master/robokitty-logo.jpg?token=AAN7hh6VHaGZUCrl5r8YB_-Y3t5pAD4Jks5WQ_dzwA%3D%3D)


## Part list

| Part  | Where to Buy / Price |
| ------------- | ------------- |
| Particle Photon Kit (comes with breadboard and USB cable, you can get just the board if you have these other items handy)  | [Particle.io / $29 / $19 for just the board](https://store.particle.io/)  |
| Male to Male jumper wires  | [Adafruit / $3.95 to $7.95 depending on length](http://www.adafruit.com/search?q=male+male+jumper&b=1)  |
| 4xAA Battery Pack with ON/OFF Switch  | [Adafruit / $2.95](https://www.adafruit.com/products/830)  |
| 4xAA Batteries  | Buy these wherever. $4 - 8  |
| 4xAA Battery Pack with ON/OFF Switch  | [Adafruit / $2.95](https://www.adafruit.com/products/830)  |
| Continuous Rotation Servo  | [Adafruit / $11.95](https://www.adafruit.com/products/154)  |
| 4xAA Battery Pack with ON/OFF Switch  | [Adafruit / $2.95](https://www.adafruit.com/products/830)  |
| Dry Goods Dispenser (last I checked I bought the last one... Sorry D:) | [Amazon / $24.99](http://www.amazon.com/gp/product/B00TECVEQE?psc=1&redirect=true&ref_=oh_aui_detailpage_o02_s00)  |
| USB Cube Charger (like for an iphone) | [Amazon / $8.29](http://www.amazon.com/Apple-Authentic-Adapter-iPhone-Touch/dp/B010NYA6VK/ref=sr_1_5?ie=UTF8&qid=1448330240&sr=8-5&keywords=usb+cube+charger)  |

*Additional Needs*
* Soldering Iron
* Solder
* Wire Strippers
* Heat Shrink Tube
* Method of attaching servo horn to feeder, details to follow.

## How-To

Once you have all of your materials handy, you're ready to start.

### Setting up your Particle Photon

A great guide can be found right on the Particle site [here](https://docs.particle.io/guide/getting-started/connect/photon/), but I will walk you through it! I'm going to assume you're doing this from scratch and don't have anything installed on your computer.

Make sure you've already set up an account and logged in on the Particle website before starting the tutorial.

First thing you need to do is power up the photon, plug in the cable and connect it to your computer.

Now you need to install Node, for sake of ease, go to the [Node site](https://nodejs.org/) and grab the latest version.

Once you've gotten Node installed, the next step differs depending on if you're using a Mac OS or Windows.

If you are on a Windows machine, please follow the steps called "Installing the Particle Driver" and "Opening the Command Prompt" which you can find [here](https://docs.particle.io/guide/getting-started/connect/photon/#installing-the-particle-driver).

If you are on a Mac, there are no additional steps to take before our next one.

It's time to install the Particle CLI (Command Line Interface)! 

### Particle CLI

Open up your CLI of choice, and type 
```
npm install -g particle-cli
```

Once it is done downloading, type 

```
particle cloud login
```

And answer the prompts with the login information you created earlier for the Particle site.


### Claiming a Photon

The Particle site has a thorough guide to claiming and setting up a photon [here](https://docs.particle.io/guide/getting-started/connect/photon/#connecting-your-device).


### Firmware
Now we need to flash the Photon with new Firmware. We're going to be using [VoodooSpark](https://github.com/voodootikigod/voodoospark). We can do this one of two ways.

1. Using the Particle IDE (Interactive Development Environment), which allows you to copy and paste code into an editor in your browser and transfer it to your Photon.
2. The Particle CLI, which utilizes a local file to transfer to the Photon.

The first thing you need to do regardless of the method you choose is grab the latest version of the firmware from [here](https://github.com/voodootikigod/voodoospark/blob/master/firmware/voodoospark.cpp).

Save that file locally. 




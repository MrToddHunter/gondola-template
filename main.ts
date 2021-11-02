// I like to use an "on start" block so I know that the Microbit is operating the way  expect it to, and to establish the value of the Pins so I know exactly what they are at the beginning.
// This makes sure that the servo is receiving an OFF signal on P0
ContinuousServo.turn_off_motor(DigitalPin.P0)
// This tells the Microbit that I have 2 NeoPixels attached to P2 and they are operating in RGB format.
let strip = neopixel.create(DigitalPin.P2, 2, NeoPixelMode.RGB)
// This makes sure that the LED circuit I have on P1 is OFF
pins.digitalWritePin(DigitalPin.P1, 0)
// This is my visual signal that everything above is complete
basic.showIcon(IconNames.Square)
// This forces the above icon to show for 2 seconds.
basic.pause(2000)
// This clears the screen, which visually tells me that the forever loop is going to activate next.
basic.clearScreen()
// I put all of these blocks into the Forever block so that the Micro.Bit KEEPS cycling through this order of code
basic.forever(function () {
    // This if block activates if the Light Level is measured over 80.
    // 
    // If the light level is over 80, then:
    // 
    // the LEDs on P1 will turn on, 
    // 
    // the Neopixel "strip" on P2 will turn blue, 
    // 
    // and the Servo on P0 will spin
    if (input.lightLevel() > 80) {
        pins.digitalWritePin(DigitalPin.P1, 1)
        strip.showColor(neopixel.colors(NeoPixelColors.Blue))
        ContinuousServo.spin_one_way(AnalogPin.P0)
    }
    // This if block activates if the Light Level is measured under 80 (gets dark).
    // 
    // If the light level is under 80, then...
    if (input.lightLevel() < 80) {
        // the LEDs on P1 will turn off
        pins.digitalWritePin(DigitalPin.P1, 0)
        // the Servo on P0 will turn off
        ContinuousServo.turn_off_motor(DigitalPin.P0)
        // The Neopixel will turn red
        strip.showColor(neopixel.colors(NeoPixelColors.Red))
        // Once the above 3 commands are complete, this loop will repeat 4 times, causing a flashing effect:
        // 
        // 
        for (let index = 0; index < 4; index++) {
            // Turn LEDs on P1 ON
            pins.digitalWritePin(DigitalPin.P1, 1)
            // Show this icon on the LED Matrix of the MicroBit.
            basic.showIcon(IconNames.No)
            // Wait for 1/5 second
            basic.pause(200)
            // Turn LEDs on P1 OFF
            pins.digitalWritePin(DigitalPin.P1, 0)
            // Show this icon on the LED Matrix of the MicroBit.
            basic.showIcon(IconNames.SmallDiamond)
            // Wait 1/5 second
            basic.pause(200)
        }
        // After repeating the loop above 4 times, the servo on P0 will then spin the opposite direction
        ContinuousServo.spin_other_way(AnalogPin.P0)
        // This pause forces the servo to spin for 10 seconds before going to the next command
        basic.pause(10000)
        // This icon tells us that the servo has finished its 10 second spin backwards
        basic.showIcon(IconNames.Square)
        // Pause allows the icon above to show for 1 second
        basic.pause(1000)
        // Before starting over at the top and re-examining which of the 2 IF statements are true, the screen will clear.
        basic.clearScreen()
    }
})

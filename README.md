quneo_pad_animator
==================

### Live Link
https://files.keithmcmillen.com/projects/quneopadanimator

The QuNeo Pad Animator is a web application for programming pad LED sequences on the QuNeo’s pads. It converts an animation programmed on the web and exports it to a MIDI file, specifically formatted to communicate with the QuNeo’s LEDs. These MIDI files can be played as clips in Ableton Live, or in any digital audio workstation (DAW) that supports MIDI file playback to a MIDI controller.

An animation is created frame by frame, similarly to stop animation. There are 64 total frames, each representing a 32nd note. That’s 64 32nd notes, which equals 2 bars in a 4/4 time signature. Every pad LED’s color, on/off state and brightness can be adjusted per frame.

To change a pad LED’s color, state, or brightness, first select it by clicking it with your mouse. Once selected, click it again to set it’s color to green, another time to red, again for yellow, and once again to turn it off. The brightness can be adjusted using the slider to the right. Additionally, Clear Frame, Copy Frame, and Paste Frame buttons are located in between the frame navigation buttons at the top to assist with animating.

To preview your animation, use the play button in the bottom left corner. The default playback speed is 120bpm, which can be adjusted after exporting/downloading the animation as a MIDI file. You can pause your animation at any time, change frames, make edits, and resume playback from the current frame, which is shown in the bottom right corner.

To download your animation, hit the export button (next to Play and Pause). The download may take a moment to begin, so please be patient. (We suggest testing this before getting too far along with your animation). Once downloaded, import your animation into your DAW and play it as a MIDI file. Make sure you are outputting MIDI to your QuNeo on Channel 2.

Please see the diagram and video below for further instructions on how to use the QuNeo Pad Animator

[![qpavideo](https://github.com/connerlacy/quneo_pad_animator/blob/master/images/qpa_youtube.png)](https://www.youtube.com/watch?v=-adI93PizzM)

![qpaguide](https://github.com/connerlacy/quneo_pad_animator/blob/master/images/qpaguide.jpg)

### KMI Project Link
https://www.keithmcmillen.com/projects/quneo-pad-animator/

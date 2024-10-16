# Accessibility PoC - Speech Navigation

It is known that some areas are harder to reach with our thumbs when holding a phone:

<img width="548" alt="thumb" src="https://github.com/user-attachments/assets/e9ac6c1f-cb6a-40ea-abb4-a48d57ea2c56">

And some screens are usually many taps away. The problem is even bigger if you have a drawer menu - usually on the top left, out of reach for your thumb!

With that in mind, I developed this proof of concept (PoC) that uses Android's `SpeechRecognizer` API to navigate between screens.

## Technical details

The project was created with React Native + Expo, with no changes to the default project besides the inclusion of the `MicButton` in the main layout file.

A native module was developed in Kotlin to access the `SpeechRecognizer` API, making some functions and events available to JS.

Finally, the `MicButton` was created and animated to give the user some feedback. It parses the result of speech and looks for commands like `navigate to` and `go to` plus a route. If it finds a match, it will navigate to the respective screen.

https://github.com/user-attachments/assets/72cb765b-8f2e-49f0-8863-5b743fad256d

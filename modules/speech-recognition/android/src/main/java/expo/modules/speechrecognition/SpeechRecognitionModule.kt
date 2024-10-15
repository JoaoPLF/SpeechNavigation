package expo.modules.speechrecognition

import android.content.Intent
import android.os.Bundle
import android.speech.RecognitionListener
import android.speech.RecognizerIntent
import android.speech.SpeechRecognizer
import expo.modules.kotlin.functions.Queues
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.util.Locale

class SpeechRecognitionModule : Module() {
  private var speechRecognizer: SpeechRecognizer? = null
  private val recognitionListener: RecognitionListener
  private var response: ArrayList<String>? = null

  init {
    recognitionListener = object : RecognitionListener {
      override fun onReadyForSpeech(params: Bundle?) {
        TODO("Not yet implemented")
      }

      override fun onBeginningOfSpeech() {
        TODO("Not yet implemented")
      }

      override fun onRmsChanged(rmsdB: Float) {
        TODO("Not yet implemented")
      }

      override fun onBufferReceived(buffer: ByteArray?) {
        TODO("Not yet implemented")
      }

      override fun onEndOfSpeech() {
        TODO("Not yet implemented")
      }

      override fun onError(error: Int) {
        TODO("Not yet implemented")
      }

      override fun onResults(results: Bundle?) {
        TODO("Not yet implemented")
      }

      override fun onPartialResults(partialResults: Bundle?) {
        TODO("Not yet implemented")
      }

      override fun onEvent(eventType: Int, params: Bundle?) {
        TODO("Not yet implemented")
      }

    }
  }

  override fun definition() = ModuleDefinition {
    Name("SpeechRecognition")

    Events("onChange")

    AsyncFunction("startSpeechRecognition") {
      speechRecognizer = SpeechRecognizer.createSpeechRecognizer(appContext.reactContext)

      val intent = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH).apply {
        putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
        putExtra(RecognizerIntent.EXTRA_LANGUAGE, Locale.US)
      }

      speechRecognizer?.setRecognitionListener(recognitionListener)
      speechRecognizer?.startListening(intent)

      sendEvent("OK")
    }.runOnQueue(Queues.MAIN)

    AsyncFunction("stopSpeechRecognition") {
      speechRecognizer?.stopListening()
      speechRecognizer?.destroy()
      speechRecognizer = null

      sendEvent("OK")
    }.runOnQueue(Queues.MAIN)

    // Defines a JavaScript function that always returns a Promise and whose native code
    // is by default dispatched on the different thread than the JavaScript runtime runs on.
    AsyncFunction("setValueAsync") { value: String ->
      // Send an event to JavaScript.
      sendEvent("onChange", mapOf(
        "value" to value
      ))
    }
  }
}

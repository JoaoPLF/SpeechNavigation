package expo.modules.speechrecognition

import android.content.Intent
import android.os.Bundle
import android.speech.RecognitionListener
import android.speech.RecognizerIntent
import android.speech.SpeechRecognizer
import android.util.Log
import expo.modules.kotlin.functions.Queues
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.util.Locale

class SpeechRecognitionModule : Module() {
  private var speechRecognizer: SpeechRecognizer? = null
  private val recognitionListener: RecognitionListener

  init {
    recognitionListener = object : RecognitionListener {
      override fun onReadyForSpeech(params: Bundle?) {
        Log.d("Speech Listener", "onReadyForSpeech")
      }

      override fun onBeginningOfSpeech() {
        Log.d("Speech Listener", "onBeginningOfSpeech")
      }

      override fun onRmsChanged(rmsdB: Float) {
        Log.d("Speech Listener", "onRmsChanged")
      }

      override fun onBufferReceived(buffer: ByteArray?) {
        Log.d("Speech Listener", "onBufferReceived")
      }

      override fun onEndOfSpeech() {
        Log.d("Speech Listener", "onEndOfSpeech")
      }

      override fun onError(error: Int) {
        Log.d("Speech Listener", "onError")
      }

      override fun onResults(results: Bundle?) {
        Log.d("Speech Listener", "onResults")
        Log.d("Speech Listener", results?.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION).toString())

        sendEvent("onSpeechResult", mapOf(
          "value" to results?.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION).toString()
        ))
      }

      override fun onPartialResults(partialResults: Bundle?) {
        Log.d("Speech Listener", "onPartialResults")
      }

      override fun onEvent(eventType: Int, params: Bundle?) {
        Log.d("Speech Listener", "onEvent")
      }
    }
  }

  override fun definition() = ModuleDefinition {
    Name("SpeechRecognition")

    Events("onChange", "onSpeechResult")

    AsyncFunction("startSpeechRecognition") {
      if (speechRecognizer == null) {
        speechRecognizer = SpeechRecognizer.createSpeechRecognizer(appContext.reactContext)

        val intent = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH).apply {
          putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
          putExtra(RecognizerIntent.EXTRA_LANGUAGE, Locale.US)
        }

        speechRecognizer?.setRecognitionListener(recognitionListener)
        speechRecognizer?.startListening(intent)
      }
      else {
        speechRecognizer?.stopListening()
        speechRecognizer?.destroy()
        speechRecognizer = null
      }
    }.runOnQueue(Queues.MAIN)

    AsyncFunction("stopSpeechRecognition") {
      speechRecognizer?.stopListening()
      speechRecognizer?.destroy()
      speechRecognizer = null

      sendEvent("OK", mapOf(
        "value" to "value"
      ))
    }.runOnQueue(Queues.MAIN)
  }
}

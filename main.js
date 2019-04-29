const synth = window.speechSynthesis;

var textForm = document.querySelector('form');
var textInput = document.querySelector('#text-input');
var voiceSelect = document.querySelector('#voice-select');

var pitch = document.querySelector('#pitch');
var pitchValue = document.querySelector('#pitch-value');
var rate = document.querySelector('#rate');
var rateValue = document.querySelector('#rate-value');

var voices = [];

function getVoices() {
    voices = synth.getVoices();
    console.log(voices)

    for (i = 0; i < voices.length; i++) {
        var option = document.createElement('option');
        option.textContent = voices[i].name + ' (' + voices[i].lang + ')';

        if (voices[i].default) {
            option.textContent += ' -- DEFAULT';
        }

        option.setAttribute('data-lang', voices[i].lang);
        option.setAttribute('data-name', voices[i].name);
        voiceSelect.appendChild(option);
    }
}
getVoices()
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}


const speak = () => {

    if (synth.speaking) {
        console.error("ALready speaking")
        return
    }
    if (textInput.value !== '') {
        const speaktext = new SpeechSynthesisUtterance(textInput.value);


        speaktext.onend = e => {
            console.log("Done speaking...")
        }

        speaktext.onerror = e => {
            console.error("Something went wrong")
        }
        console.log(speaktext)

        var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');

        for (i = 0; i < voices.length; i++) {
            if (voices[i].name === selectedOption) {
                speaktext.voice = voices[i];
            }
        }
        speaktext.pitch = pitch.value;
        speaktext.rate = rate.value;
        synth.speak(speaktext)
    }
}

// event listener
textForm.addEventListener('submit', e=>{
    e.preventDefault();
    speak();
    textInput.blur()
})

rate.addEventListener('change' , e=> rateValue.textContent = rate.value)
pitch.addEventListener('change' , e=> pitchValue.textContent = pitch.value)

voiceSelect.addEventListener('change', e=> speak())



let sliderNum = 0;
let weirdNum = 0;
let preferNum = 0;
let audioNum = 0;

function checkComplete(parentDivId) {
    let div = document.getElementById(parentDivId)
    // let radioDivs = div.getElementsByClassName('radio-group');
    let radioDivs = div.querySelectorAll(".radio-group")

    for (let radioDiv of radioDivs) {
        let radioComplete = checkRadioGroupComplete(radioDiv)
        if (!radioComplete) {
            div.classList.remove("complete-block")
            return false
        }
    }
    div.classList.add("complete-block")
}

function checkRadioGroupComplete(parentDiv) {
    let inputNodes = parentDiv.getElementsByTagName('input')

    for (let node of inputNodes) {
        if (node.checked) {
            return true
        }
    }
    return false
}

function toggleCollapse(header, collapsibleContent) {
    let text = header.innerText
    if (collapsibleContent.style.maxHeight) {
        header.innerText = "\u23F6 " + text.substring(2, text.length)
        collapsibleContent.style.maxHeight = null;
    } else {
        header.innerText = "\u23F7 " + text.substring(2, text.length)
        collapsibleContent.style.maxHeight = collapsibleContent.scrollHeight + 20 + "px";
    }
}

function createMelodyCompareBlock(parentDivId, melody1, melody2, melody1Type, melody2Type) {
    let parent = document.getElementById(parentDivId)

    let headerDiv = document.createElement("div")
    headerDiv.classList.add(
        "collapsible",
        "two-columns",
        "check-box",
    )

    let header = document.createElement("h2");
    header.innerText = `\u23F6 Melody ${melody1} and Melody ${melody2}`

    let containerDiv = document.createElement("div")
    containerDiv.classList.add("collapsible-content")
    containerDiv.classList.add("compare-body")
    headerDiv.onclick = function() {
        toggleCollapse(header, containerDiv)
    }

    let melody1Div = document.createElement("div")
    let melody2Div = document.createElement("div")
    let preferenceDiv = document.createElement("div")

    melody1Div.id = "melody-block-" + melody1
    melody2Div.id = "melody-block-" + melody2
    preferenceDiv.id = `preference-${melody1}-${melody2}`

    parent.appendChild(headerDiv)
    parent.appendChild(containerDiv)

    headerDiv.appendChild(header)

    containerDiv.appendChild(melody1Div)
    containerDiv.appendChild(melody2Div)
    containerDiv.appendChild(preferenceDiv)

    createSingleMelodyBlock(melody1Div.id, melody1, melody1Type)
    createSingleMelodyBlock(melody2Div.id, melody2, melody2Type)
    createPreferenceBlock(preferenceDiv.id, melody1, melody2)
}

function createCheckBox(parentDivId, melody1, melody2) {
    const parent = document.getElementById(parentDivId);

    let box = document.createElement("input");
    let boxLabel = document.createElement("label")

    box.type = "checkbox"
    box.disabled = true
    box.id = `checkbox-${melody1}-${melody2}`
    boxLabel.for = box.id

    parent.appendChild(box)
    parent.appendChild(boxLabel)
}

function createSingleMelodyBlock(parentDivId, melodyNum, melodyType) {
    let parent = document.getElementById(parentDivId)
    parent.classList.add("question-block")
    parent.classList.add("single-melody-block")

    let melodyControlDiv = document.createElement("div")
    let rateDiv = document.createElement("div")
    let turingDiv = document.createElement("div")
    let weirdDiv = document.createElement("div")

    melodyControlDiv.id = "melody-control-" + melodyNum
    rateDiv.id = "rate-" + melodyNum
    turingDiv.id = "turing-" + melodyNum
    weirdDiv.id = "weird-" + melodyNum

    parent.appendChild(melodyControlDiv)
    parent.appendChild(rateDiv)
    parent.appendChild(turingDiv)
    parent.appendChild(weirdDiv)

    createMelodyControlBlock(melodyControlDiv.id, melodyNum, pathFromMelodyType(melodyType))
    createRateBlock(rateDiv.id, melodyNum)
    createTuringBlock(turingDiv.id, melodyNum)
    createWeirdBlock(weirdDiv.id, melodyNum)
}

function randomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pathFromMelodyType(melodyType) {
    // Retrieves a random media file of the given melodyType
    let files;
    let randInt;
    switch (melodyType) {
        case "hrnn-3l":
            files = './static/media/hrnn-3l/hrnn'
            randInt = randomIntInclusive(1, 25)
            break;
        case "human":
            files = "./static/media/human/h"
            randInt = randomIntInclusive(1, 24)
            break;
        case "musicVAE":
            files = "./static/media/musicVAE/vae"
            randInt = randomIntInclusive(1, 22)
            break;
        case "schenkComposer":
            files = "./static/media/schenkComposer/chords/sc"
            randInt = randomIntInclusive(1, 15)
            break;
        case "schenkComposer_noreverb":
            files = "./static/media/schenkComposer/chords_no_reverb/sc"
            randInt = randomIntInclusive(1, 15)
            break;
        case "schenkComposer_mel":
            files = "./static/media/schenkComposer/mel/sc"
            randInt = randomIntInclusive(1, 6)
            break;
        case "flowMachines":
            files = "./static/media/flowMachines/fm"
            randInt = randomIntInclusive(1, 20)
            break;
        default:
            files = "./static/media/error/A"
            randInt = 0
    }
    return files + randInt + ".mp3"
}

function createMelodyControlBlock(parentDivId, melodyNum, recordingPath) {
    let parent = document.getElementById(parentDivId)
    parent.classList.add("question-block")
    parent.classList.add("center")

    let p = document.createElement("p")
    let t = document.createTextNode("MELODY " + melodyNum)

    let audio = document.createElement("audio")
    audioNum += 1;
    audio.id = "audio" + audioNum
    audio.src = recordingPath
    audio.controls = true

    p.appendChild(t)
    parent.appendChild(p)
    parent.appendChild(audio)
}

function createRateBlock(parentDivId, melodyNum) {
    createLikertBlock(
        parentDivId,
        "On a scale of 0 (not enjoyable) to 10 (very enjoyable), how would you rate melody " + melodyNum + "?",
        0,
        10
    )
}

function createTuringBlock(parentDivId, melodyNum) {
    createLikertBlock(
        parentDivId,
        "On a scale of 0 (certain it's by a computer) to 10 (certain it's by a human), what is your degree of belief that a human composed melody " + melodyNum + "?",
        0,
        10
    )
}

function createLikertBlock(parentDivId, text, min, max) {
    let parent = document.getElementById(parentDivId)
    parent.classList.add("question-block")
    parent.classList.add("likert-block")
    parent.classList.add("center")

    let p = document.createElement("p")
    let textNode = document.createTextNode(text)

    let slider = document.createElement("input")
    slider.classList.add("slider")
    // let r = (Math.random() + 1).toString(36).substring(7);
    sliderNum += 1
    slider.name = "slider-" + sliderNum
    slider.type = "range"
    slider.min = min
    slider.max = max
    slider.value = ((min + max) / 2).toString()
    slider.step = 1

    let output = document.createElement("output")
    output.for = slider.name;
    output.value = slider.value;

    let form = document.createElement("form")

    slider.addEventListener('input', function() {
        output.value = slider.value;
    }, true)

    form.appendChild(slider)
    form.appendChild(output)
    p.appendChild(textNode)
    parent.appendChild(p)
    parent.appendChild(form)
}

function createPreferenceBlock(parentDivId, melodyNum1, melodyNum2) {
    let parent = document.getElementById(parentDivId)
    parent.classList.add(
        "question-block",
        "two-columns",
        "radio-group"
    )

    let p = document.createElement("p")
    let t = document.createTextNode("Which melody do you prefer?")

    p.appendChild(t)
    parent.appendChild(p)

    let texts = [
        "Strongly prefer melody " + melodyNum1,
        "Prefer melody " + melodyNum1,
        "No preference",
        "Prefer melody " + melodyNum2,
        "Strongly prefer melody " + melodyNum2
    ]
    // let r = (Math.random() + 1).toString(36).substring(7);
    preferNum += 1
    for (let i = 0; i < 5; i++) {
        let radio = document.createElement("input")
        radio.type = "radio"
        radio.name = "preference" + preferNum
        radio.value = texts[i]

        let label = document.createElement("label")
        label.for = radio.value
        label.textContent = texts[i]

        let newDiv = document.createElement("div")
        newDiv.appendChild(radio)
        newDiv.appendChild(label)
        parent.appendChild(newDiv)
    }
}

function createWeirdBlock(parentDivId, melodyNum) {
    let parent = document.getElementById(parentDivId)
    parent.classList.add(
        "question-block",
        "radio-group"
    )

    let p = document.createElement("p")
    p.classList.add("center")
    let t = document.createTextNode(
        `Were there any parts of melody ${melodyNum} that stood out as sounding weird or bad to you?`
    )
    p.appendChild(t)
    parent.appendChild(p)

    let vals = ["Yes", "No"]
    // let r = (Math.random() + 1).toString(36).substring(7);
    weirdNum += 1
    for (let i = 0; i < 2; i++) {
        let radio = document.createElement("input")
        radio.type = "radio"
        radio.name = "weird" + weirdNum
        radio.value = vals[i]

        let label = document.createElement("label")
        label.for = radio.value
        label.textContent = vals[i]

        let newDiv = document.createElement("div")
        newDiv.appendChild(radio)
        newDiv.appendChild(label)
        parent.appendChild(newDiv)
    }
}
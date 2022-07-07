var imgPeople
var statusPeople
var objectsPeople = []

function preload() {
    imgPeople = loadImage('Images/people.jpg')
}

function setup() {
    canvas = createCanvas(450, 420)
    canvas.center()

    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("peopleStatus").innerHTML = "Status - Detecting Objects"
}

function draw() {
    image(imgPeople, 0, 0, 450, 420)
    if (statusPeople != "") { 
        for (var i = 0; i < objectsPeople.length; i++) {
            document.getElementById("peopleStatus").innerHTML = "Status - Objects Detected"
            document.getElementById("objects_identified_People").innerHTML = "COCO-SSD has identified " + objectsPeople.length + " objects"

            fill("#FF0000")
            stroke("#FF0000")

            percent = floor(objectsPeople[i].confidence * 100)

            text(objectsPeople[i].label + " " + percent + "%", objectsPeople[i].x + 15, objectsPeople[i].y + 15)

            noFill()
            rect(objectsPeople[i].x, objectsPeople[i].y, objectsPeople[i].width, objectsPeople[i].height)

        }
    }
    
}

function modelLoaded() {
    console.log("Model Loaded!")
    statusPeople = true

    objectDetector.detect(imgPeople, gotResult)
}

function gotResult(error, results) {
    if (error) {
        console.log(error)
    }

    console.log(results)
    objectsPeople = results
}
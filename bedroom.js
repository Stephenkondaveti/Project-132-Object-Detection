var imgBedroom
var statusBedroom
var objectsBedroom = []

function preload() {
    imgBedroom = loadImage('Images/bedroom.jpg')
}

function setup() {
    canvas = createCanvas(450, 420)
    canvas.center()

    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("bedroomStatus").innerHTML = "Status - Detecting Objects"
}

function draw() {
    image(imgBedroom, 0, 0, 450, 420)
    if (statusBedroom != "") { 
        for (var i = 0; i < objectsBedroom.length; i++) {
            document.getElementById("bedroomStatus").innerHTML = "Status - Objects Detected"
            document.getElementById("objects_identified_Bedroom").innerHTML = "COCO-SSD has identified " + objectsBedroom.length + " objects"

            fill("#FF0000")
            stroke("#FF0000")

            percent = floor(objectsBedroom[i].confidence * 100)

            text(objectsBedroom[i].label + " " + percent + "%", objectsBedroom[i].x + 15, objectsBedroom[i].y + 15)

            noFill()
            rect(objectsBedroom[i].x, objectsBedroom[i].y, objectsBedroom[i].width, objectsBedroom[i].height)

        }
    }
    
}

function modelLoaded() {
    console.log("Model Loaded!")
    statusBedroom = true

    objectDetector.detect(imgBedroom, gotResult)
}

function gotResult(error, results) {
    if (error) {
        console.log(error)
    }

    console.log(results)
    objectsBedroom = results
}
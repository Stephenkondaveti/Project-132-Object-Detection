var imgDesk
var statusDesk
var objectsDesk = []

function preload() {
    imgDesk = loadImage('Images/computer.webp')
}

function setup() {
    canvas = createCanvas(450, 420)
    canvas.center()

    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("deskStatus").innerHTML = "Status - Detecting Objects"
}

function draw() {
    image(imgDesk, 0, 0, 450, 420)
    if (statusDesk != "") {
        for (var i = 0; i < objectsDesk.length; i++) {
            document.getElementById("deskStatus").innerHTML = "Status - Objects Detected"
            document.getElementById("objects_identified_Desk").innerHTML = "COCO-SSD has identified " + objectsDesk.length + " objects"

            fill("#FF0000")
            stroke("#FF0000")

            percent = floor(objectsDesk[i].confidence * 100)

            text(objectsDesk[i].label + " " + percent + "%", objectsDesk[i].x + 15, objectsDesk[i].y + 15)

            noFill()
            rect(objectsDesk[i].x, objectsDesk[i].y, objectsDesk[i].width, objectsDesk[i].height)

        }
    }
    
}

function modelLoaded() {
    console.log("Model Loaded!")
    statusDesk = true

    objectDetector.detect(imgDesk, gotResult)
}

function gotResult(error, results) {
    if (error) {
        console.log(error)
    }

    console.log(results)
    objectsDesk = results
}
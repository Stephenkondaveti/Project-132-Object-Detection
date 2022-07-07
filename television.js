var imgTV
var statusTV
var objectsTV = []

function preload() {
    imgTV = loadImage('Images/tv.jpg')
}

function setup() {
    canvas = createCanvas(800, 450)
    canvas.center()
    
    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("TVStatus").innerHTML = "Status - Detecting Objects"
}

function draw() {
    image(imgTV, 0, 0, 800, 450)
    if (statusTV != "") { 
        for (var i = 0; i < objectsTV.length; i++) {
            document.getElementById("TVStatus").innerHTML = "Status - Objects Detected"
            document.getElementById("objects_identified_TV").innerHTML = "COCO-SSD has identified " + objectsTV.length + " objects"

            fill("#FF0000")
            stroke("#FF0000")

            percent = floor(objectsTV[i].confidence * 100)

            text(objectsTV[i].label + " " + percent + "%", objectsTV[i].x + 15, objectsTV[i].y + 15)

            noFill()
            rect(objectsTV[i].x, objectsTV[i].y, objectsTV[i].width, objectsTV[i].height)

        }
    }
    
}

function modelLoaded() {
    console.log("Model Loaded!")
    statusTV = true

    objectDetector.detect(imgTV, gotResult)
}

function gotResult(error, results) {
    if (error) {
        console.log(error)
    }

    console.log(results)
    objectsTV = results
}


var imgFruitBasket
var statusFruitBasket
var objectsFruitBasket = []

function preload() {
    imgFruitBasket = loadImage('Images/fruitbasket.jpg')
}

function setup() {
    canvas = createCanvas(600, 550)
    canvas.center()
    
    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("FruitBasketStatus").innerHTML = "Status - Detecting Objects"
}

function draw() {
    image(imgFruitBasket, 0, 0, 600, 550)
    if (statusFruitBasket != "") { 
        for (var i = 0; i < objectsFruitBasket.length; i++) {
            document.getElementById("FruitBasketStatus").innerHTML = "Status - Objects Detected"
            document.getElementById("objects_identified_FruitBasket").innerHTML = "COCO-SSD has identified " + objectsFruitBasket.length + " objects"

            fill("#FF0000")
            stroke("#FF0000")

            percent = floor(objectsFruitBasket[i].confidence * 100)

            text(objectsFruitBasket[i].label + " " + percent + "%", objectsFruitBasket[i].x + 15, objectsFruitBasket[i].y + 15)

            noFill()
            rect(objectsFruitBasket[i].x, objectsFruitBasket[i].y, objectsFruitBasket[i].width, objectsFruitBasket[i].height)

        }
    }
    
}

function modelLoaded() {
    console.log("Model Loaded!")
    statusFruitBasket = true

    objectDetector.detect(imgFruitBasket, gotResult)
}

function gotResult(error, results) {
    if (error) {
        console.log(error)
    }

    console.log(results)
    objectsFruitBasket = results
}


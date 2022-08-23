object = [];
status = "";

function setup()
{
    canvas = createCanvas(360,320);
    canvas.center();
}
video = "";
function preload()
{
    video = createVideo('video.mp4');
    video.hide();
}
function start()
{
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting objects";
}
function modelLoaded()
{
    console.log("model loaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotResult(error,results)
{
   if(error)
   {
       console.log(error);
   }
   console.log(results);
   object = results;
}
function draw()
{
    image(video,0,0,360,320);
    if(status !="")
    {
        objectDetector.detect(video,gotResult);
        for(i=0;i < object.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of object detected :" + object.length;
            r = random(255);
            g = random(255);
            b = random(255);
            fill("#ff0000");
            percent = floor(object[i].confidence*100);
            text(object[i].label + " " + percent + "%", object[i].x +15, object[i].y+15);
            noFill();
            stroke(r,g,b);
           
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
    }
}
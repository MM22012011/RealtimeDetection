vid = ""
status = "";
objects = [];

function preload()
{
    vid = createVideo("video.mp4");
    vid.hide();
}

function start()
{
    mL = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status Detecting Objects";
}

function modelLoaded()
{
    console.log('modelLoaded');
    vid.loop();
    vid.speed(1);
    vid.volume(0);
    status = "true";
}




function setup()
{
    canvas = createCanvas(480, 380);
    canvas.center();
}

function draw()
{
    image(vid, 0, 0, 480, 380);

    if (status != "")
    {
        mL.detect(vid, gotResults);

        for (let i = 0; i < objects.length; i++) 
        {
          
            document.getElementById("status").innerHTML = "Status Objects Detected";  
            document.getElementById("NOOB").innerHTML = "Number Of Objects Detected Are " + objects.length;
            
            
            fill("#02faee")
            percent  = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke("#fa0505");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        }

    }
}

function gotResults(error, results)
{
    if (error)
    {
        console.log(error);
    }
    console.log(results);

    objects = results;


}

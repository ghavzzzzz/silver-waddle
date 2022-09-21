//https://teachablemachine.withgoogle.com/models/qtrv5l3V7/
p1="";
p2="";
Webcam.set({
    height:300,
    width:350,
    image_format:'png',
    png_quality:90
});

camera=document.getElementById("camera");
Webcam.attach('#camera');

function Snapshot(){

    Webcam.snap(function(data_uri){
        document.getElementById("Snapshot").innerHTML='<img id="c_i" src="'+data_uri+'">';
    });
}
console.log('ml5.version', ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/qtrv5l3V7/model.json',modelLoaded);
function modelLoaded(){
    console.log('ModelLoaded');
}

function speech(){

    synth=window.speechSynthesis;
    s1="your predictions are"+p1+p2;
    var utterThis= new SpeechSynthesisUtterance(s1);
    synth.speak(utterThis);
}



function correct() {
    
    img=document.getElementById('c_i');
    classifier.classify(img , gotResult);
}
function gotResult(error , results){

    if(error){
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("heint").innerHTML=results[0].label;
        document.getElementById("heint2").innerHTML=results[1].label;
        p1=results[0].label;
        p2=results[1].label;
           speech();
           if(results[0] == "super"){
            document.getElementById("update_emoji").innerHTML="&#128080;";
           }
           if(results[0] == "good"){
            document.getElementById("update_emoji").innerHTML="&#128077;";
           }
           if(results[0] == "bad"){
            document.getElementById("update_emoji").innerHTML = "&#128076;";
           }
           if(results[1] == "super"){
            document.getElementById("update_emoji2").innerHTML="&#128080;";
           }
           if(results[1] == "good"){
            document.getElementById("update_emoji2").innerHTML="&#128077;";
           }
           if(results[1] == "bad"){
            document.getElementById("update_emoji2").innerHTML = "&#128076;";
           }
           
    }
}
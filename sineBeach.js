//SINUSOIDAL SKETCH
//this sketch is inspured by the beach. each aspect uses a sine or cosine wave to affect the animation. The lines in the sand each take an input value that oscilates between 500 - 700 in height. The blue waves use the same fluctuaing values for the vertex points and the stroke does the same from (0-10). The umbrella turns using cosine and sine inputs. The child in the water uses the same with a conditional statement to draw when the output is above 0. 


var input;
var numLines;
var spacing;

function setup(){
    createCanvas(1000, 1000);
    
    input = 0;    
    numLines = 40;
    spacing = width/(numLines);
    
}

function draw(){
    background(246, 229, 141); // sabd yellow
    
    input += 0.05; // speed
    
    //SAND LINES
    strokeWeight(5);
    stroke(255);
    
    for(let index = 0; index < numLines; index++){
        line( spacing * index,
         0,
          spacing * index,
         500 + ((sin(input + index/PI/2)+1)/2* 200)); 
        // line extension stays between range (500 - 700). 1/2) so that output value of sine is above 0.
    }
    
    // THE SEA
    push();
    fill(34, 166, 179);
    strokeWeight((sin(input) + 1)/2 * 10); // 10px highest weight
    beginShape();
    for(let index = 0; index < numLines+4; index++){
        curveVertex(spacing * index, 620 + sin(input + index/PI/2) * 100);
    }
    vertex(10 + width, 10 + height);
    vertex(0, height);
    endShape(CLOSE);
    pop();

    // UMBRELLAS
    push();
    strokeWeight(5);
    translate(width/3, height/4);
    
    fill(235, 77, 75);
    beginShape();
    for(let index = 1; index < 22; index++){
        vertex(100 * sin(input/4 + index/PI),
               100 * cos(input/4 + index/PI) ); //draws points that rotate around radius 100 pixels
    }
    endShape(CLOSE);
    fill(95);
    ellipse(0, 0, 10);
    pop();
    
    // SWIMMING CHILD
    // only if the child is not on a wave... - draw arms
    push();
    strokeWeight((sin(input) + 1)/2 * 10); // previous stroke weight used to create depth
    // if the sine oscilation is above 0.
    if(sin(input + ((numLines / 2) / PI) / 2) < 0){
        stroke(255, 190, 118); 
        fill(255, 190, 118);
        ellipse(width/2, 620, 80, 10); // arms
    }
    stroke(106, 176, 76);
    fill(106, 176, 76);
    ellipse(width/2, 620, 50);
    pop();

    
    //shade - cloud
    fill(72,50);
    beginShape();
    noStroke();
    for(let index = 0; index < numLines+4; index++){
        curveVertex(spacing * index,
                    620 + sin(input/20 + (index/PI)/10) * height * 0.9);
    }
    vertex(10 + width, 0);
    vertex(0, 0);
    endShape(CLOSE);
}




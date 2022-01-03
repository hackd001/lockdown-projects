//RECURSIVE SKETCH - created using p5.js library

// This sketch is inspired by the mountain scape example and uses noise to animate. In addition, the custom shapes use noise to create peaks.


let input; // animation purposes


function setup(){
    createCanvas(800,800);
    
    input = 0;
    colorMode(HSB);

}

function draw(){
    background(20, 100, 180);
    input+= 6; // range from 2 - 15 (preferred) otherwise too slow or too fast

    strokeWeight(1);
    noStroke();
    for(let j = 1; j <= 10; j++){
        fill(36*j, 60, 90, 0.8);// rainbow of colours
        beginShape();
        curveVertex( 0, height* 1.1);

        for(let i = 0; i < width + j * 5; i ++){
        
            curveVertex(i,
                        height/10 + (100 *j) * noise(i/100 + j * 10) * ((noise((i + input)/1000))) - (j * 2));
        
        }
        curveVertex(width*1.1, height*1.1);
        endShape(CLOSE);
    }
    
    push();
    noFill();
    stroke(100, 30, 100);
    for(let j = 0; j < 8; j ++){
        for(let i = 0; i < 8; i ++){
            strokeWeight(10*noise(input/100 + j));
            rect(80 + 80*i,
                 80 + 80*j,
                 80 + (10 * noise(input/20000))); //small animation
        }
    }
    pop();

   // noLoop();
}


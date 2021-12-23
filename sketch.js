var buttons = [];
var slides = [];
var knobs = [];
var controls = false;
var audioContext;
var isAudioInit;

//physical sounds
var switchSound, swtichVol;
var slideSound, slideVol;

var circButtons = [];


var innerMonologues, phoneDistractions;
var anxietyBreathing, birdSong, fearSound, panicking, hungerSound;
var tikTokSounds, twitterSounds;
var defaultVol = 1;

var oscillator = new maximJs.maxiOsc();

//// VIDEO
var testVideo;
var progress;

var winner = false;

//QUESTIONS
var input;
var inputEnter;

function setup()
{
    //display setup
    var gui = createCanvas(windowWidth* 0.4, windowHeight);
    gui.center('horizontal');
    gui.position('fixed');
    textSize(32);
    textAlign(CENTER);
    
    //audio setup
    audioContext = new maximJs.maxiAudio();
    audioContext.play = audioLoop;
    isAudioInit = false;  
    
//INITIALISING SOUND SAMPLE OBJECTS
    //physical sounds
    switchSound = new maximJs.maxiSample();
    switchVol = 0;
    slideSound = new maximJs.maxiSample();
    slideVol = 0;
    
    //inner monologues
    anxietyBreathing = new maximJs.maxiSample();
    fearSound = new maximJs.maxiSample();
    panicking = new maximJs.maxiSample();
    hungerSound = new maximJs.maxiSample();
    tikTokSounds = new maximJs.maxiSample();
    twitterSounds = new maximJs.maxiSample();
    
    
// INNERMONOLOGUE - array of titles
    innerMonologues = ["Anxiety",
                       "Food",
                       "Overthinking",
                       "Fear"];
    
//MOBILE PHONE DISTRACTIONS - array of titles
    phoneDistractions = ["Twitter",
                        "Tik Tok"];
 
//INTERACTIONS - array of objects, postiions
    
    //cirlce buttons
    for(let i = 0; i < 4; i ++){
        
        //var x_Pos = width * 0.6 + (i * 120)%240;
        var margin = 80;
        var x_Pos = width * 0.25 + (i * margin);
        var y_Pos = height * 0.6;
//        if(i>=2){
//            y_Pos += 120;
//        }
        circButtons.push(new Button(x_Pos, y_Pos));
    }
    
    //switch objects Positions
    for(let i = 0; i < 2; i++){
        //var xPos = width * 0.25 + (i * 90)%180;
        var xPos = width * 0.25 + (i * 150);
        var yPos = height * 0.72;
//        //for more than two switches (removed)
//        if(i >= 2){
//            yPos += 220;
//        }
     buttons.push(new switches(xPos, yPos));   
    }
    
    // slider objects
    slides.push(new slider(width * 0.8, height * 0.35));
    

//    //video output
    testVideo = createVideo(['assets/count_down.mp4']);
    testVideo.volume(0.9);
    testVideo.position(windowWidth * 0.37, -windowHeight * 0.12  , 'fixed' );
    testVideo.size(width * 0.5);
    testVideo.hide();
    
    
    
//QUESTION - input
    input = createInput('');
    input.position(windowWidth * 0.45, windowHeight * 0.6);
    input.hide();
    inputEnter = new Button(width * 0.5, height * 0.8);
    
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}

function initAudio(){
	isAudioInit = true;
	audioContext.init();
    
    audioContext.loadSample("assets/switch_sounds.mp3", switchSound);
    //REF - my our recording of a crushing dried pasta - streched
    
    audioContext.loadSample("assets/blind_sound.mp3", slideSound);
    //REF - my our recording of a pulling blind.
    
//INNERMONOLOGUE - CIRCLE BUTTONS
    
	audioContext.loadSample("assets/anxiety.mp3", anxietyBreathing);
    //REF - (https://freesound.org/people/dobroide/sounds/21417/)
    
    audioContext.loadSample("assets/fear.mp3", fearSound);
    //REF - fear synth (https://freesound.org/people/unfa/sounds/156536/)
    
    audioContext.loadSample("assets/panic.mp3", panicking);
    //REF - fear synth (https://freesound.org/people/kathol/sounds/53441/)
    
    audioContext.loadSample("assets/hungry.mp3", hungerSound);
    //REF - hunger sound (https://freesound.org/people/mar.u02144/sounds/462087/)
    
//MOBILE PHONE DISTRACTIONS
    
    audioContext.loadSample("assets/tik_tok.mp3", tikTokSounds);
    //REF - recorded on tiktok mobile app 28/05/2021 using screen recorder
    
    audioContext.loadSample("assets/twitter.mp3", twitterSounds);
    
}

function audioLoop() {

    var mix = 0;
    
    if(switchVol > 0){
        var switchOut = switchSound.playOnce();
        mix += switchOut * switchVol;    
    }
    
    if(slideVol > 0){
        var slideOut = slideSound.playOnce()
        mix += slideOut * slideVol;
        
    }
    
    if(!circButtons[0].active){
        anxietyBreathing.trigger();
    }
    var anxietyOut = anxietyBreathing.play();
    mix += anxietyOut * 0.6  * defaultVol;
    
    ////missing weather
    
    if(!circButtons[1].active){
        hungerSound.trigger();
    }
    var foodOut = hungerSound.play();
    mix += foodOut * 0.6  * defaultVol;
    
    
    if(!circButtons[2].active){
        panicking.trigger();
    }
    var overThinkingOut = panicking.play();
    mix += overThinkingOut * 0.5  * defaultVol;
    
    if(!circButtons[3].active){
        fearSound.trigger();
    }
    var fearOut = fearSound.play();
    mix += fearOut * 0.6  * defaultVol;
    
    if(!buttons[0].active){
        twitterSounds.trigger();
    }
    var twitterOut = twitterSounds.play();
    mix += twitterOut * 0.6  * defaultVol;
    
    if(!buttons[1].active){
        tikTokSounds.trigger();
    }
    var tikTokOut = tikTokSounds.play();
    mix += tikTokOut * 0.6  * defaultVol;
    
    if(slides[0].level > 0){
        var whiteNoise =  oscillator.sinewave(400);
        mix += whiteNoise * slides[0].level * 0.1  * defaultVol;
    }

    
    this.output = mix;
}


function draw() {
    
    
    background(80);
    if(!isAudioInit){
        text("Dear audience,",
             width * 0.5,
             height * 0.1); // text to display instructions and disclaimer
        text("Please read the following instructions before continuing:",
             width * 0.1,
             height* 0.15,
            width*0.8); 
        text("Make sure you are viewing this on full screen on your web browser on either a desktop or laptop.This experience has not been configured for mobile devices. Please take note of the number of inconsistencies in the video.",
             width* 0.1,
             height* 0.3,
            width*0.8); 
 
        text("Press 'C' to continue",
             width* 0.1,
             height* 0.8,
            width*0.8); 
    }
    //video starts
    else if(progress < 1){
        background(200);
        fill(80);
        rect(width * 0.05, height * 0.05, width * 0.9, height * 0.9, 20);
        
        //SWITCHES
        for(let i = 0; i < buttons.length; i++){
            buttons[i].draw();
            //name display
            fill(5);
            textSize(14);
            text(phoneDistractions[i], buttons[i].x - 30, buttons[i].y + 140, 120);
        } 
        
        //SLIDES
        for(let i = 0; i < slides.length; i ++){
            slides[i].check();    
            slides[i].draw();        
        }
        
        //CIRCLE BUTTONS
        for(let i = 0; i < circButtons.length; i ++){
            circButtons[i].draw();
            
            //name display
            fill(5);
            textSize(14);
            text(innerMonologues[i], circButtons[i].x - 55, circButtons[i].y + 35, 120);
        }
        
    
        
// VIDEO DISPLAYED        
        testVideo.show();
        
        
        //video - time progression bar
        let progressBar = map(progress, 0, 1, width * 0.2, width * 0.6);

        push();
            strokeWeight(10);
            stroke(20);
            line(width * 0.2,
                 height * 0.55,
                 width * 0.6,
                 height * 0.55);
            strokeWeight(5);
            stroke(80);
            line(width * 0.2,
                 height * 0.55,
                 progressBar,
                 height * 0.55); //length increases as the video progresses
        pop();
        
        
        let startA = testVideo.duration() * 0.15; // 10% of the video has played - start autonomous behaviours 
        if(progress * testVideo.duration() >startA){
            autonomous();
        }
        
        
    }
    
    //Once video has completed
    else if(progress === 1 && !inputEnter.checkActive()){
        defaultVol = 0;
        controls = false; // disables interactions
        testVideo.hide(); //hides video
        textSize(20);
        text("How many numbers were missing in the countdown? Please type your anser in below", width* 0.15, height/2, width * 0.8);
        
        input.show();
        input.input(decision);
        inputEnter.draw();


    }
    else if(inputEnter.checkActive() && progress === 1 ){
        input.hide();
        textSize(20);
        if(winner){
            
            
            text("congratulations", width * 0.5, height * 0.5); 
        }
        else{
        
            text("Incorrect answer, pay more attention next time.", width * 0.5, height * 0.5);
        }
        
    }
    
    
     progress = testVideo.time() /testVideo.duration(); // time in video % /100
   
    
    
}

function keyPressed(){
    if(key === 'c' || key === 'C'){
       initAudio();
        controls = true;
        testVideo.play();
        
    }
    
}

function mouseDragged(){
   for(let i = 0; i < slides.length; i++){
        if(slides[i].isLocked){
            slides[i].slideY = mouseY - slides[i].yOffset;
            slides[i].slideY = constrain(slides[i].slideY, slides[i].y, slides[i].y + slides[i].length * 0.95);
            slideSound.trigger();
        }      
   }
    
   
}

function mouseReleased(){
    
    //sliders - when mouse is no longer being dragged
    for(let i = 0; i < slides.length; i ++){
        slides[i].isLocked = false;    
    }
    
}

function mousePressed(){
    
    if(controls){
        //the swtiches - if mouse pressed over a switch
        for(let i = 0; i < buttons.length; i++){
            buttons[i].area(mouseX, mouseY);
            
        } 
        
        //the cirlce buttons - if mouse pressed over a button
        for(let i = 0; i < circButtons.length; i++){
            circButtons[i].area(mouseX, mouseY);
        }
        
        //slider - if mouse is initially pressed over a slider it is locked
        for(let i = 0; i < slides.length; i ++){
            if(slides[i].overSlider){
                slides[i].isLocked = true;
                
            }
            else{
                slides[i].isLocked = false;
            }
        slides[i].yOffset = mouseY - slides[i].slideY;   
        }    
    }
    
    if(defaultVol === 0){
        inputEnter.area(mouseX, mouseY);
    }
    
    
    
}

function switches(x_pos, y_pos){
    this.x = x_pos;
    this.y = y_pos;
    this.active = false;
    this.level = 0;
    this.turningPoint = 100;
    this.draw = function(){
        if(this.active){
            fill(190);
            rect(this.x - 10, this.y - 10, 70, 130, 10);
            fill(40);
            rect(this.x - 5, this.y - 5, 60, 120, 10);
            fill(100);
            rect(this.x, this.y, 50, 60, 10); // switch on          
        }
        else{
            fill(190);
            rect(this.x - 10, this.y - 10, 70, 130, 10);
            fill(40);
            rect(this.x - 5, this.y - 5, 60, 120, 10);
            fill(100);
            rect(this.x, this.y + 50, 50, 60, 10); // switch down           
        }

    }
        
    this.area = function(mouse_x, mouse_y){
        if(this.x - 5 < mouse_x && this.y - 5 < mouse_y && this.x + 60 > mouse_x && this.y + 120 > mouse_y){
            if(this.active){
                this.active = false;
                timeTest = random(0, 100);
                timeTest = round(timeTest);
                switchVol = 0.07;
                switchSound.trigger(); /// ADD SWITCH SOUND
            }
            else{
                this.active = true; 
                switchVol = 0.07;
                switchSound.trigger(); /// ADD SWITCH SOUND
            }
            
        }
    }
    
    this.checkActive = function(){
        return this.active;
    }
}

function slider(xPos, yPos){
    this.x = xPos;
    this.y = yPos;
    this.yOffset = 0.0;
    this.length = height/2;
    this.max = this.y + this.length * 0.05;
    this.min = this.y + this.length * 0.95;
    this.isLocked = false;
    this.slideX = this.x - 20;
    this.slideY = this.min;
    
    this.overSlider = false;
    this.draw = function (){
        fill(190);
        rect(this.x - 5 , this.y - 5, 20, 410, 10);
        fill(40);
        rect(this.x, this.y, 10, 400, 10);
        //slide
        fill(100);
        rect(this.slideX, this.slideY, 50, 15, 10);
       // text(this.level, this.slideX + 100, this.slideY);
    }
    this.check = function(){
            if(mouseX > this.slideX &&
               mouseX < this.slideX + 50 &&
               mouseY > this.slideY &&
              mouseY < this.slideY + 15)
            {
                this.overSlider = true;
                slideVol = 0.03;
            }
            else{
                this.overSlider = false;
            }
        
            this.level = map(this.slideY, this.min, this.max, 0, 1);
    }
}

function Button(xPos, yPos){
    this.x = xPos;
    this.y = yPos;
    this.active = false;
    this.level = 0;
    this.turningPoint = 100;
    this.diameter = 50;
    this.draw = function(){
        
        fill(190);
        ellipse(this.x, this.y, this.diameter);
        
        if(this.active){
            fill(100);
        }
        else{
            fill(140);
        }
        ellipse(this.x, this.y, this.diameter * 0.7);
    }
    
    this.area = function(mouse_x, mouse_y){
        let distance = dist(mouse_x, mouse_y, this.x, this.y);
        if(distance < this.diameter * 1.1){
            if(this.active){
                this.active = false;
//                timeTest = random(0, 100);
//                timeTest = round(timeTest);
                switchVol = 0.07;
                switchSound.trigger(); /// ADD SWITCH SOUND
            }
            else{
                this.active = true; 
                switchVol = 0.07;
                switchSound.trigger(); /// ADD SWITCH SOUND
            }
            
        }
    }
    
    //used for automata
    this.checkActive = function(){
        return this.active;
    }
}

function autonomous(){
    
    let distractions = [];
    let distractionsOff = 0;
    for(let i = 0; i < buttons.length; i ++){
        distractions.push(buttons[i]);
    }
    
    for(let i = 0; i < circButtons.length; i ++){
        distractions.push(circButtons[i]);
    }
    
    
    for(let i = 0; i < distractions.length; i ++){
        let emotion = random();
        if(!distractions[i].checkActive()){
            distractions[i].level += emotion;
            
            
            for(let j = 0; j < distractions.length; j ++){
                if(distractions[j].checkActive()){
                    distractionsOff++;
                }
            }
            
            if(distractions[i].level > distractions[i].turningPoint && distractionsOff === 0){
                distractions[i].active = true;
                switchSound.trigger();
                distractions[i].level = 0;
            }
            //if there is an acitve distraction & odds of noise being larger than a number increasing over time causing my frequent triggers (0.4-0.8)
            if( distractionsOff > 0 && noise(frameCount) > 0.4 + (progress * 0.4)){
                distractions[i].level = distractions[i].level * 0.2;
                
            }
            
            if(random()>0.9 &&
               ((progress*100)%(15 + 5* noise(frameCount)) > 0 &&
                (progress*100)%20 < (7 * noise(frameCount * random(0, frameCount))))){
               
                //white noises plays mainly when there are no distractions
                if(distractionsOff === 0 || random() > 0.8){
                    slides[0].slideY -=5;
                    slides[0].slideY = constrain(slides[0].slideY, slides[0].y, slides[0].y + slides[0].length * 0.95);
                    
                }
                    
            }
            
        }
    }
    
    
    
    
}

function decision(){
    
    let answer = this.value();
    console.log("the decision");
    
   
    if(answer == "7"){
        winner = true;
    }
    else{
        winner = false;
    }


}

let video;
var playing = false;
var circles = [];
var area_objects = [];
var video_ready = false;

var area_selection = false;
var areaColor;

var input;


function setup() {
  createCanvas(windowWidth, windowHeight);

  button = createButton('Play/Pause Video');
  button.position(0, 0);
  button.mousePressed(startVid);

  button2 = createButton('Start making selection');
  button2.position(200, 0);
  button2.mousePressed(selectArea);

  input = createFileInput(handleFile);
  input.position(500, 0);
  undo_button = createButton('Undo');
  undo_button.position(800, 0);
  undo_button.mousePressed(undo);

  areaColor = color(238, 21, 21);
  areaColor.setAlpha(100);

  test_button = createButton('test');
  test_button.position(1000, 0);
  test_button.mousePressed(test_func);

  //socket = io.connect('http://127.0.0.1:5000/');
  //socket = io.connect('127.0.0.1:5000');
  //socket = io.connect('0.0.0.0:5000');
  socket = io.connect();
  //socket.on('message', makeAGuess);
}

function handleFile(file) {
  if (file.type === 'video') {
    video = createVideo(file.data);
    video.hide(); 
    video_ready = true;
  }
}

function draw() {
  background(150);
  if (video_ready==true){
    image(video, 0, 0); // draw the video frame to canvas
  }
  
  fill("white");
  for(var i=0;i<circles.length;i++){
    circles[i].render_circle();
  }
  fill(areaColor);
  for(var i=0;i<area_objects.length;i++){
    area_objects[i].render_area();
  }

  
}

function selectArea(){
  area_selection = true;
}

list_coords = [];
function mouseReleased(){
  if (area_selection == true){
    circles.push(new circle_(mouseX, mouseY));
    list_coords.push([mouseX, mouseY]);
  }
}

function undo(){
  list_coords.pop();
  circles.pop();
}

function keyPressed() {
  if (area_selection == true){
    if (keyCode === ENTER) {
      list_coords.shift();
      area_objects.push(new selection_area(list_coords));
      socket.emit('heyy', message)
      console.log('coords sent');
      list_coords = [];
      area_selection = false;
    }
  }
}


function startVid() {
  if (playing == false){
    video.loop(); 
  }
  else{
    video.pause();
  }

  playing = !playing;
}

class circle_{
  constructor(x, y) {
    this.xCoor = x;
    this.yCoor = y;
  }
  render_circle(){
    circle(this.xCoor, this.yCoor, 5);
  }
}


function test_func(){
    console.log('here0')
    //var server_data = [
        //{"data1": "data1"},
        //{"data2": "data2"},
    //];
    var message_ ="hey there"
    console.log(message_)
    socket.emit('message', message_)
    console.log('here');
}

class selection_area{
  constructor(coord_list) {
    this.coords = coord_list;
  }

  render_area(){
    beginShape();
    for (let i = 0; i < this.coords.length; i++){
      vertex(this.coords[i][0], this.coords[i][1]);
    }
    endShape(CLOSE);
  }

 
}
let mouseDown = false;
let scaleFactor = 50000;

function setup() {
    createCanvas(window.screen.width, window.screen.height);
    background(240);
    drawAxes();
    angleMode(DEGREES);
  }
  
  function draw() {
    if (mouseDown) drawAndInvert();
  }

  function mousePressed(){
    mouseDown = true;
  }

  function mouseReleased(){
    mouseDown = false;
  }

  function drawAxes(){
    stroke(0);
    var width = window.screen.width;
    var height = window.screen.height;
    line(0, height/2, width, height/2);
    line(width/2, 0, width/2, height);
  }

  function drawAndInvert(){
    // origin
    let origin_x = window.screen.width/2;
    let origin_y = window.screen.height/2;

    stroke(255, 0, 0);
    strokeWeight(5);
    point(mouseX, mouseY);

    // calculate inverse
    stroke(0, 0, 255);
    // transformed mouse coordinates
    let mx = mouseX - origin_x;
    let my = window.screen.height - mouseY - origin_y;


    // get angle to real axis
    let real_vector = createVector(1, 0);
    let mouse_vector = createVector(mx, my);

    let theta = acos((dotp(real_vector, mouse_vector)/(betrag(real_vector)*betrag(mouse_vector))));
    if (my < 0){
        theta = 360 - theta;
    }

    

    let new_betrag = 1/betrag(mouse_vector);
    let phi = -theta;

    let new_x = new_betrag*cos(phi)*scaleFactor + origin_x;
    let new_y = -new_betrag*sin(phi)*scaleFactor + origin_y;
    console.log(new_y)
    point(new_x,new_y);
    strokeWeight(1);
  }

  function dotp(vec1, vec2){
    return vec1.x * vec2.x + vec1.y * vec2.y;
  }

  function betrag(vec){
    return sqrt(sq(vec.x) + sq(vec.y));
  }
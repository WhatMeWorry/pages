
// p5.js is a JavaScript library for creative coding, with a focus on making coding accessible and inclusive. 
// It provides us with tools that simplify the process of creating interactive visuals with code in the web browser.

// p5.js is a library of JavaScript. P5.js is running on Pure JavaScript. It provides functions that make a 
// JavaScript user's life easier to draw in web.

// https://p5js.org/
// https://editor.p5js.org/

// https://www.jeffreythompson.org/collision-detection/
// https://happycoding.io/tutorials/p5js/


px = 0;        // point (set by mouse)
py = 0;

x1 = 300;      // three points of the triangle
y1 = 100;
x2 = 450;
y2 = 300;
x3 = 150;
y3 = 300;


function setup() 
{
    createCanvas(600,400);
    noCursor();

    strokeWeight(5);   // make point easier to see
}


function draw() 
{
    background(255);

    // mouse point to mouse coordinates
    px = mouseX;
    py = mouseY;

    // check for collision
    // if hit, change fill color
    hit = triPoint(x1,y1, x2,y2, x3,y3, px,py);
    if (hit) 
    {
        fill(255,150,0);
    }
    else
    {
        fill(0,150,255);
    }
      
    noStroke();
    triangle(x1,y1, x2,y2, x3,y3);

    // draw the point
    stroke(0, 150);
    point(px,py);
}


// TRIANGLE/POINT
function triPoint(x1, y1, x2, y2, x3, y3, px, py) 
{
    // get the area of the triangle
    areaOrig = abs( (x2-x1)*(y3-y1) - (x3-x1)*(y2-y1) );

    // get the area of 3 triangles made between the point
    // and the corners of the triangle
    area1 = abs( (x1-px)*(y2-py) - (x2-px)*(y1-py) );
    area2 = abs( (x2-px)*(y3-py) - (x3-px)*(y2-py) );
    area3 = abs( (x3-px)*(y1-py) - (x1-px)*(y3-py) );

    // if the sum of the three areas equals the original,
    // we're inside the triangle!
  
    if ( (area1 + area2 + area3) == areaOrig) 
    {
        return true;
    }
  
    return false;
}









Or another way:

p = {x: 0, y:0}

      // three points of the triangle

one   = {x: 300, y:100}
two   = {x: 450, y:300}
three = {x: 150, y:300}

function setup() 
{
    createCanvas(600,400);
    noCursor();
    strokeWeight(5);   // make point easier to see
}


function draw() 
{
    background(255);

    // mouse point to mouse coordinates
    p.x = mouseX;
    p.y = mouseY;

    // check for collision
    // if hit, change fill color

    hit = triPoint(one, two, three, p);
    if (hit) 
        fill(255,150,0);
    else
        fill(0,150,255);

    noStroke();
    triangle(one.x, one.y, two.x,two.y, three.x, three.y);

    // draw the point
    stroke(0, 150);
    point(p.x,p.y);  
}


// TRIANGLE/POINT
function triPoint(one, two, three, p) 
{
    // get the area of the triangle
    areaOrig = abs( (two.x-one.x)*(three.y-one.y) - (three.x-one.x)*(two.y-one.y) );

    // get the area of 3 triangles made between the point
    // and the corners of the triangle
    area1 = abs( (one.x  -p.x)*(  two.y-p.y) - (two.x  -p.x)*(  one.y-p.y) );
    area2 = abs( (two.x  -p.x)*(three.y-p.y) - (three.x-p.x)*(  two.y-p.y) );
    area3 = abs( (three.x-p.x)*(  one.y-p.y) -  (one.x -p.x)*(three.y-p.y) );

    // if the sum of the three areas equals the original,
    // we're inside the triangle!
  
    if ( (area1 + area2 + area3) == areaOrig) 
    {
        return true;
    }
  
    return false;
}

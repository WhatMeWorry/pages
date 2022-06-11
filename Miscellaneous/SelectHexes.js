// https://www.javascripttutorial.net/javascript-multidimensional-array/


// The var statement declares a function-scoped or globally-scoped variable, 
// optionally initializing it to a value.

// The let statement declares a block-scoped local variable, optionally 
// initializing it to a value.


var size = 50;   // size is length of a line from hex center two anyone of its six points 

var p = {x: 50, y: size * 0.866}  // remember that a hex is not symmetrical square

var vertDiv = size * 1.5;  // 
var oneFourth = size/4;
var sixEighths = (2 * size) * 0.75;
var oneEighths = size/8;

var hexHeight = 2 * (size * 0.866)


function setup() 
{

    canvas = createCanvas(800, 800);
    
    canvas.parent('put-sketch-here');
    
    canvas.mousePressed(handleMousePressed); // attach listener  
  
    hexBoard = [];

    xDelta = size * 1.5;
    yDelta = 2 * (size * 0.866);
    offset = (size * 0.866);
  
    for (let i = 0; i < 10; i++)     // for each row       
    {
        hexBoard[i] = []; // create nested array
        p.x = 50;
        p.y = (i * yDelta) + offset;     
      
        for (j = 0; j < 10; j++)     // for each column
        {
            // hexBoard[x][y].push(new hex(p, size));  // error
            
            hexBoard[i][j] = new hex(p, size);
            p.x = p.x + xDelta;
      
            if (j % 2 == 0) {
                p.y = p.y + offset;
            } else {
                p.y = p.y - offset;            
            }                               
        }
    }
    console.table(hexBoard);
    noLoop();
}



function draw() 
{
    background(220);
  
    line(oneFourth,0, oneFourth, 500);
  
    // loop the outer array
    for (let i = 0; i < hexBoard.length; i++) 
    {
        // get the size of the inner array
        let columnLen = hexBoard[i].length;

        line((i*sixEighths)+oneFourth,0, (i*sixEighths)+oneFourth, 500);
      
        // loop the inner array
        for (let j = 0; j < columnLen; j++) 
        {
            //console.log('[' + i + ',' + j + '] = ' + hexBoard[i][j]);
        }
    }
    
    // loop the outer array
    for (let i = 0; i < hexBoard.length; i++) 
    {
        // get the size of the inner array
        let columnLen = hexBoard[i].length;
 
        //line(i*vertDiv,0, i*vertDiv, 500);      
      
        // loop the inner array
        for (let j = 0; j < columnLen; j++) 
        {
            tempHex = hexBoard[i][j];
            tempHex.drawHex();
            tempHex.displayCenter();
        }
    }
}  



// this function fires only when cnv is clicked
function handleMousePressed() 
{
    //console.log("mouse (X, Y) = ", mouseX, mouseY);

    var row = 0;
    var col = 0;
  
    col = (mouseX-oneFourth)/vertDiv;
    col = Math.floor(col);
  
    if (col % 2 == 0) 
    {
        row = mouseY/hexHeight;  
    } 
    else 
    {
        row = (mouseY-(0.5 * hexHeight))/hexHeight;                                   
    }
    row = Math.floor(row);
  
    console.log("(row,colum) = (", row, ',', col, ')'); 
  
    tempHex = hexBoard[row][col];
    tempHex.setColor();
    draw(); 
}



class hex 
{
    constructor(p, size) 
    {

        //  farLeft = p.x - size; 
        //     left = p.x - (size/2);
        //    right = p.x + (size/2); 
        // farRight = p.x + size;
      
        //    top = p.y + (size * 0.866);
        // middle = p.y;
        // bottom = p.y - (size * 0.866);
 
        this.center = { x: p.x, y: p.y}
      
        this.r = 150;  this.g = 150;  this.b = 150;
      
      // screens coordinates are flipped horizontally from cartesion coordinates
        this.one   = {x: p.x+size,     y: p.y}
        this.two   = {x: p.x+(size/2), y: p.y+(size*0.866)}
        this.three = {x: p.x-(size/2), y: p.y+(size*0.866)}
        this.four  = {x: p.x-size,     y: p.y}
        this.five  = {x: p.x-(size/2), y: p.y-(size*0.866)}
        this.six   = {x: p.x+(size/2), y: p.y-(size*0.866)}
    }

    setColor()
    {
        console.log("color = ", this.r, this.g, this.b);
        this.r = 255;
        this.g = 0;
        this.b = 0;
    }
  
    displayCenter()
    {
        console.log("this.center.x = ", this.center.x);
        console.log("this.center.y = ", this.center.y);      
    }
  
  
    drawHex() 
    {   
        // R, G & B integer values
        stroke(0,0,0);     
        strokeWeight(2);
      
        //circle(this.center.x, this.center.y, offset*2);
      
        beginShape();
        //fill(random(0, 255), random(0, 255), random(0, 255));
        fill(this.r, this.g, this.b);      
        vertex(this.one.x, this.one.y);
        vertex(this.two.x, this.two.y);
        vertex(this.three.x, this.three.y);
        vertex(this.four.x, this.four.y);
        vertex(this.five.x, this.five.y);
        vertex(this.six.x, this.six.y);
        endShape(CLOSE);          
    }
}

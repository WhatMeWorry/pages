// https://www.javascripttutorial.net/javascript-multidimensional-array/


// The var statement declares a function-scoped or globally-scoped variable, 
// optionally initializing it to a value.

// The let statement declares a block-scoped local variable, optionally 
// initializing it to a value.


var size = 50;   // size is length of a line from hex center two anyone of its six points 

var p = {x: size, y: size * 0.866}  // remember that a hex is not symmetrical square

var vertDiv = size * 1.5;  // 
var oneFourth = size/4;
var sixEighths = (2 * size) * 0.75;
var threeFourths = sixEighths;
var oneEighths = size/8;


var hexHeight = 2 * (size * 0.866)
var halfHexHeight = hexHeight / 2;

function setup() 
{

    let canvas = createCanvas(800, 800);
    
    //canvas.parent("put-sketch-here");
    
    canvas.mousePressed(handleMousePressed); // attach listener  
  
    hexBoard = [];

    xDelta = size * 1.5;
    yDelta = 2 * (size * 0.866);
    offset = (size * 0.866);
  
    for (let i = 0; i < 10; i++)     // for each row       
    {
        hexBoard[i] = []; // create nested array
        p.x = size;
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
    //console.table(hexBoard);
    noLoop();
}


function isEven(i) 
{
    return (i % 2) == 0;
}



function draw() 
{
    background(220);
  
    //line(oneFourth,0, oneFourth, 500);
  
    // loop the outer array
    for (let i = 0; i < hexBoard.length; i++) 
    {
        let columnLen = hexBoard[i].length;      // size of the inner array

        line((i*threeFourths),0, (i*threeFourths), 500);      
      
        for (let j = 0; j < columnLen; j++)      // loop inner array
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
            //tempHex.displayCenter();
        }
    }
  
    for (let i = 0; i < hexBoard.length; i++) 
    {
        let columnLen = hexBoard[i].length;

        line((i*threeFourths),0, (i*threeFourths), 500); 
      
        for (let j = 0; j < columnLen; j++) 
        {
            line(0, (j*halfHexHeight), 800, (j*halfHexHeight));
        }      
      
      
      
    } 
  
  
}  


// this function fires only when cnv is clicked
function handleMousePressed() 
{
    //console.log("mouse (X, Y) = ", mouseX, mouseY);

    var row = 0;
    var col = 0;
  
    //col = (mouseX-oneFourth)/vertDiv;
    mX = mouseX;
    colf = mouseX / threeFourths;
    col = Math.floor(colf);
  
    rowf = mouseY / halfHexHeight;
    row = Math.floor(rowf); 
  
//    (even, even)  |  (even odd)
//    -------------------------------
//     (odd, even)  |   (odd, odd)
  
     //nsole.log("(rowf,colf) = (", rowf, ',', colf, ')');
     console.log("(row,col) = (", row, ',', col, ')'); 


  
// tHex = hexBoard[row][col];
  
  
// find the Anchor Hex. These are the hexes in the positive columns
  
if (!isEven(col))
{
    col = col - 1;
}

if (!isEven(row))
{
    row = row - 1;   
}
row = row / 2;
  
  
console.log("Anchor Hex is ", row, ",", col);
  
  
tHex = hexBoard[row][col];  
tHex.drawHex();
  
  
  
// All four quadrants are mapped to the hex on the left  
  
/*  
if (isEven(row))
{
    if (isEven(col))
    {
        //console.log("(even,even)"); 
      
        
        //tHex.drawHex();
        //tHex.displayCenter();
        //console.log("mX = ", mX);
        //console.log(tHex.center.x - (size/2));
        if (mX > (tHex.center.x - (size/2)) )
        {
            row = row / 2;
            console.log("In hex", row, ",", col);
        }     
    }
    else
    {
        console.log("row = ", row);
        console.log("col = ", row);      
        console.log("(even,odd)");    
        console.log("tHex.center.x = ", tHex.center.x);
        console.log("mX = ", mX);     
        console.log("tHex.center.x + size = ", tHex.center.x + size);     
        if (mX > (tHex.center.x + size) )
        {
            row = row / 2;
            console.log("In hex", row, ",", col);
        }           
      
    }
} 
else
{
    if (isEven(col))
    {
       //console.log("(odd,even)"); 
      
        tHex = hexBoard[row][col];
        //tHex.drawHex();
        //tHex.displayCenter();
        //console.log("mX = ", mX);
        if (mX > (tHex.center.x - (size/2)) )
        {
            row = (row-1) / 2;
            console.log("In hex", row, ",", col);
        }           
      
      
      
    }
    else
    {
       //console.log("(odd,odd)"); 
    }  
}
*/
  
  
  
    //tempHex = hexBoard[row][col];
    //tempHex.setColor();
    draw(); 
    tHex.drawCircle();
    col = col + 1;
    tHex = hexBoard[row][col];
    tHex.drawCircle();
    row = row - 1;
    tHex = hexBoard[row][col];
    tHex.drawCircle();  
  
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
        //console.log("color = ", this.r, this.g, this.b);
        this.r = 255;
        this.g = 0;
        this.b = 0;
    }
  
    displayCenter()
    {
        console.log("this.center.x = ", this.center.x);
        console.log("this.center.y = ", this.center.y);      
    }
  
    drawCircle()
    {   
        // R, G & B integer values
        stroke(255,0,0);  
        strokeWeight(2);
      
   
        circle(this.center.x, this.center.y, offset*2);
      
    }  
  
  
  
  
  
  
    drawHex() 
    {   
        // R, G & B integer values
        stroke(0,0,0);     
        strokeWeight(2);
      
     // circle(this.center.x, this.center.y, offset*2);    
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



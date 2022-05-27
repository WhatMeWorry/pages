// https://www.javascripttutorial.net/javascript-multidimensional-array/

p = {x: 50, y:50}
size = 50;


function setup() 
{
    createCanvas(800, 800);
  
    hexBoard = [];

    xDelta = size * 2;
    yDelta = (size * 0.866) * 2;
  
    for (x = 0; x < 5; x++) 
    {
        hexBoard[x] = []; // create nested array
        for (y = 0; y < 5; y++)
        {

            // hexBoard[x][y].push(new hex(p, size));  // error
            
            hexBoard[x][y] = new hex(p, size);
            p.size = p.size + xDelta;
            console.log(x, y);
        }
    }
    //console.log("hexBoard.length = ", hexBoard[].length);
    console.table(hexBoard);
  
    noLoop();
}



function draw() 
{
    background(220);
  
    // loop the outer array
    for (let i = 0; i < hexBoard.length; i++) 
    {
        // get the size of the inner array
        var innerArrayLength = hexBoard[i].length;
      
        // loop the inner array
        for (let j = 0; j < innerArrayLength; j++) 
        {
            console.log('[' + i + ',' + j + '] = ' + hexBoard[i][j]);
        }
    }
    
    // loop the outer array
    for (let i = 0; i < hexBoard.length; i++) 
    {
        // get the size of the inner array
        var innerArrayLength = hexBoard[i].length;
      
        // loop the inner array
        for (let j = 0; j < innerArrayLength; j++) 
        {
            tempHex = hexBoard[i][j];
            tempHex.drawHex();
        }
    }
  
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
 
      // screens coordinates are flipped horizontally from cartesion coordinates
        this.one   = {x: p.x+size,     y: p.y}
        this.two   = {x: p.x+(size/2), y: p.y+(size*0.866)}
        this.three = {x: p.x-(size/2), y: p.y+(size*0.866)}
        this.four  = {x: p.x-size,     y: p.y}
        this.five  = {x: p.x-(size/2), y: p.y-(size*0.866)}
        this.six   = {x: p.x+(size/2), y: p.y-(size*0.866)}
    }

    drawHex() 
    {   
        // R, G & B integer values
        stroke(random(0,255),random(0,255), random(0,255));     
        strokeWeight(random(1,1));
        //    draw from this point            to this point
        line(this.one.x, this.one.y,     this.two.x, this.two.y);
        line(this.two.x, this.two.y,     this.three.x, this.three.y);   
        line(this.three.x, this.three.y, this.four.x, this.four.y);
        line(this.four.x, this.four.y,   this.five.x, this.five.y);
        line(this.five.x, this.five.y,   this.six.x, this.six.y);
        line(this.six.x, this.six.y,     this.one.x, this.one.y);
    }
}

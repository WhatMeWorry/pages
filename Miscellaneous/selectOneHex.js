// https://www.javascripttutorial.net/javascript-multidimensional-array/


// The var statement declares a function-scoped or globally-scoped variable, 
// optionally initializing it to a value.

// The let statement declares a block-scoped local variable, optionally 
// initializing it to a value.


var size = 50;   // size is length of a line from hex center two anyone of its six points 

var p = {x: size, y: size * 0.866}  // remember that a hex is not symmetrical square

var vertDiv = size * 1.5; 
var oneFourth = (size*2) / 4;
var sixEighths = (size * 2) * 0.75;
var threeFourths = sixEighths;
var oneEighths = (size*2) / 8;


var hexHeight = 2 * (size * 0.866)
var halfHexHeight = hexHeight / 2;

var maxRows = 8;
var maxCols = 8;



function calculateCanvasWidth(columns)
{
    let full = 0;
    let squeezed = 0;
    if (isEven(columns))
    {
        squeezed = (columns)/2;
        full = squeezed;
        return ((size*2*full)+(size*squeezed)+oneFourth);
    }
    else
    {
        squeezed = (columns-1)/2;
        full = squeezed + 1;
        return ((size*2*full)+(size*squeezed)); 
    } 
}



function calculateCanvasHeight(rows, cols)
{
    if (cols > 1)
    {
         return ((rows * hexHeight) + halfHexHeight); 
    }
    else
    {
         return (rows * hexHeight);   // rows should be alwways equal to 1 
    }
}



function setup() 
{
    canvasWidth = calculateCanvasWidth(maxCols); 
    canvasHeight = calculateCanvasHeight(maxRows, maxCols);   
  
    let canvas = createCanvas(canvasWidth, canvasHeight);
    
    //canvas.parent("put-sketch-here");
    
    canvas.mousePressed(handleMousePressed);  // attach listener  
  
    hexBoard = [];

    xDelta = size * 1.5;
    yDelta = 2 * (size * 0.866);
    offset = (size * 0.866);
  
    for (let i = 0; i < maxRows; i++)     // for each row       
    {
        hexBoard[i] = []; // create nested array
        p.x = size;
        p.y = (i * yDelta) + offset;     
      
        for (j = 0; j <  maxCols; j++)     // for each column
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
     
    for (let i = 0; i < hexBoard.length; i++)    // loop the outer array
    {
        let columnLen = hexBoard[i].length;      // size of the inner array
      
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
      
        // loop the inner array
        for (let j = 0; j < columnLen; j++) 
        {
            tempHex = hexBoard[i][j];
            tempHex.drawHex();
            //tempHex.displayCenter();
        }
    }

   
    for (let m = 0; m < maxCols+1; m++) 
    {
        // draw vertical lines     
        line((m*threeFourths),0, (m*threeFourths), canvasHeight); 
      
        for (let n = 0; n < (maxRows*2)+1; n++) 
        {
            // draw horizontal lines
            line(0, (n*halfHexHeight), canvasWidth, (n*halfHexHeight));
        }           
    } 

  
}  

function getDistance(x1, y1, x2, y2)
{
    let y = x2 - x1;
    let x = y2 - y1;
    
    return Math.sqrt(x * x + y * y);
}


function convertGridRowToHexRow(r)
{
    if (!isEven(r))
    {
        r = r - 1;   
    }
    return (r / 2);   
}

// this function fires only when cnv is clicked
function handleMousePressed() 
{
    //console.log("mouse (X, Y) = ", mouseX, mouseY);

    var gridCol = Math.floor(mouseX / threeFourths);
  
    var gridRow = Math.floor(mouseY / halfHexHeight); 
  
    //    (even, even)  |  (even odd)
    //    -------------------------------
    //    (odd, even)   |  (odd, odd)
  
    var candidates = [];
  
    // will need both square grid and hex grid coordinates
  
    //var row = convertGridRowToHexRow(gridRow);
    //var col = gridCol;
  

    var row = 0;  
    var col = 0;
  
  
    if (isEven(gridRow) && isEven(gridCol))
    {    
        console.log("Even - Even ===============================");
      
        // gridRow is always going to be even, so just divide by 2
        row = gridRow / 2;
        col = gridCol;
      
        // hex must either be hexBoard[row][col] or hexBoard[row-1][col-1] or out of bounds
      
        tHex = hexBoard[row][col]; 
      
        // get the center point of hexBoard[row][col] to calculate left side.
        // console.log("oneFourth = ",oneFourth);
        var leftSide = tHex.center.x - oneFourth;
        // console.log("mouseX = ",mouseX);
        // console.log("leftSide = ",leftSide);
        if (mouseX > leftSide)
        {
            candidates.push(tHex);
            console.log("*****************************Inside Rectangle");
        }
        else
        {  
          console.log("halfHexHeight = ",halfHexHeight);
            var farLeft = tHex.center.x - size;
            var adjacent = mouseX - farLeft;
            console.log("adjacent = ",adjacent);         
            // tan(60) = 1.73205080757
            // tan(angle) = opposite / adjacent 
            opposite = adjacent * 1.7320;
          
            tall = tHex.center.y - mouseY;
           
            console.log("opposite = ",opposite);
            console.log("tall = ",tall);          
            if (opposite > tall)   // 
            {
                tHex = hexBoard[row][col];  
                candidates.push(tHex);             
            }
            else
            {
              if (row > 1 && col > 1)
              {
                 tHex = hexBoard[row-1][col-1];  
                 candidates.push(tHex);                             
              }
              else
              {
                  console.log("DID NOT HIT A HEX on the canvas") 
              }
              
              
              
              
            }
               
          
        }
         

    }
    if (isEven(gridRow) && !isEven(gridCol))
    {
        console.log("Even - Odd *******************************");  
  
        // gridRow is always going to be even, so just divide by 2
        row = (gridRow / 2) - 1;
        col = gridCol;
      
        // hex must either be hexBoard[row][col] or [row+1][col-1]

        if (row >= 0)   // guard agains negative indices
        {
            tHex = hexBoard[row][col];  
            candidates.push(tHex);          
        }

        tHex = hexBoard[row+1][col-1];  
        candidates.push(tHex);                  
    }
    
 
    if (!isEven(gridRow) && isEven(gridCol))
    {
        console.log("Odd - Even @@@@@@@@@@@@@@@@@@@@@@@@@");  
  
        // gridRow is always going to be odd, so 
        row = (gridRow - 1) / 2;
        col = gridCol;
      
        // hex must either be hexBoard[row][col] or [row][col-1]
      
        tHex = hexBoard[row][col];  
        candidates.push(tHex);                 

        if (col > 0)   // guard agains negative indices
        {
            tHex = hexBoard[row][col-1];  
            candidates.push(tHex);          
        }
    }

    if (!isEven(gridRow) && !isEven(gridCol))
    {
        console.log("Odd - Odd ++++++++++++++++++++++++++++");  
  
        // gridRow is always going to be odd, so 
        row = (gridRow - 1) / 2;
        col = gridCol;
      
        // hex must either be hexBoard[row][col] or [row][col-1]
      
        tHex = hexBoard[row][col];  
        candidates.push(tHex);                 

        if (col > 0)   // guard agains negative indices
        {
            tHex = hexBoard[row][col-1];  
            candidates.push(tHex);          
        }
      
    }     
      
  
      
    console.log("(gridRow,gridCol) = (", gridRow, ',', gridCol, ')');  
    console.log("(row,col) = (", row, ',', col, ')');              
  
 
 

    draw();  // redraw the hex board mainly to clear any circles

  
/*
    //tHex.drawCircle(); 
*/
  
  

    console.log("candidates.length = ", candidates.length);  


  
    if (candidates.length == 2)
    {
        // find the hex that is closest to the mouse click
        var len0 = getDistance(candidates[0].center.x,   candidates[0].center.y,   mouseX, mouseY);
        var len1 = getDistance(candidates[1].center.x,   candidates[1].center.y,   mouseX, mouseY);
        if (len0 < len1)
        {
            // Starting at index position 1, remove 1 element (len1)
            candidates.splice(1,1);
        }   
        else
        {
            candidates.splice(0,1);    // len1 is the shortest distance from the mouse click.
        }
    }
  
   

    console.log("candidates.length = ", candidates.length);  
    for (i = 0; i < candidates.length; i++) {
        tempHex =  candidates[i];
        //tempHex.drawCircle();
        candidates[i].drawCircle();
    }
            
      
    
 
  /*
    closestHexIndex = 0;  // Assume first hex is closest
    shortest = getDistance(arr[0].center.x,   arr[0].center.y,   mouseX, mouseY);
    console.log("shortest = ", shortest);
    for (i = 0; i < arr.length-1; i++) 
    {
        distance = getDistance(arr[i+1].center.x, arr[i+1].center.y, mouseX, mouseY);
        console.log("dist = ", distance);
        if (distance < shortest)
        {
           closestHexIndex = i;   
        }
        //tempHex.drawCircle();
    }
    console.log("closestHexIndex = ", closestHexIndex);
  
    arr[closestHexIndex].drawCircle(); 
 
*/
  /*
    var distances = [];
    for (i = 0; i < arr.length; i++) {     
        var distance = getDistance(arr[i].x, arr[i].y, mouseX, mouseY)
        console.log("distance = ", distance);
        distances.push(distance);
    } 
    console.log("distances = ", distances);
  
    for (i = 0; i < arr.length-1; i++) {     
        //console.log("distances = ", distances);
    } 
  */
  
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

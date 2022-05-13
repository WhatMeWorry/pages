// ran this code at:   https://editor.p5js.org/

p = {x: 400, y:400}
size = 100;
p2 = {x: 600, y:600}


function setup() 
{
    createCanvas(800, 800);
  
    //h1 = new hex(p, size);
    //h2 = new hex(p2, 75);   
  
    hexes = []; // array of hex objects

    for (let i = 0; i < 50; i++) 
    {
        p.x = random(1,width);
        p.y = random(1,height);      
        hexes.push(new hex(p, random(50,100)));
    } 
}

function draw() 
{
    background(220);
    //line(200,200,600,600);
    //h1.drawHex();
    //h2.drawHex(); 
  
    for (i = 0; i < hexes.length; i++) 
    {
        hexes[i].drawHex();
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
        console.log("one = ", this.one);
        console.log("two = ", this.two);     
        console.log("three = ", this.three);  
        console.log("four = ", this.four);       
        console.log("five = ", this.five);        
        console.log("six = ", this.six);       
    }

    drawHex() 
    {     //  draw from this point            to this point
        line(this.one.x, this.one.y,     this.two.x, this.two.y);
        line(this.two.x, this.two.y,     this.three.x, this.three.y);   
        line(this.three.x, this.three.y, this.four.x, this.four.y);
        line(this.four.x, this.four.y,   this.five.x, this.five.y);
        line(this.five.x, this.five.y,   this.six.x, this.six.y);
        line(this.six.x, this.six.y,     this.one.x, this.one.y);
    }
}









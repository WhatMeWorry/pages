



import std.stdio, std.array, std.algorithm;
import std.format;
import core.exception;

void main()
{ 
    ulong x;
    ulong[] big;
   
    //x = x.max;
    writeln("x.max = ", x);
  
  
    ulong high = ulong.max;
	ulong low  = 1;	
	
	// x =  2_000_000_000;  // WORKS
	// x =  2_050_000_000;  // WORKS
    // x =  2_075_000_000;  // WORKS
	
	//ulong low = 2_070_000_000;  
	
	//ulong high = 2_100_000_000;
	
	//ulong delta = high - low;
	
	//x = low + (delta / 2);

    // x =  2_085_000_000;  // FAILS
	// x =  2_100_000_000;  // FAILS

	ulong globalCount;
	
	// prepare for appending x more elements
    // The new capacity of the array (which may be larger than the requested capacity).
	
	
	
/+
************* delta = 4
middle = 3,221,225,982
allocating 3,221,225,982 elements failed - Allocate less?
high = 3,221,225,982
low = 3,221,225,980
************* delta = 2
middle = 3,221,225,981
allocating 3,221,225,981 elements succeeded. Allocate more?
Successsfully allocated 3,221,225,981 memory
+/

    bool tryAgain = true;
     
    while(tryAgain && globalCount <= 63)
    {
	    
        ulong delta = high - low;
	    x = low + (delta / 2);	
        writeln("high = ", format("%,3d", high));
        writeln("low = ", format("%,3d", low));
		writeln("************* delta = ", format("%,3d", delta));
        writeln("middle = ", format("%,3d", x));		
        try     
        {
            //writeln("try allocating ", format("[%15,3d]", x), " of memory");
            //writeln("try allocating ", format("%,3d", x), " of memory");
            auto u = big.reserve(x);
			writeln("allocating ", format("%,3d", x), " elements succeeded. Allocate more?");
            low = x;
            //tryAgain = false;
			globalCount++;
        }
        catch (core.exception.OutOfMemoryError whatever)
        {
            //writeln("My handling of an Out of memory error");
            writeln("allocating ", format("%,3d", x), " elements failed - Allocate less?");
            // keep low the same, but make high same as x
            high = x;									
			
            //tryAgain = true;
            //x = x - 100_000;  
			globalCount++;
        }   
    }
	
    writeln("Successsfully allocated ", format("%,3d", x), " memory");  
   
}



YouTube talk from Engineering distinguished Speakers [Everything You Ever Wanted to Know About Move Semantics](https://www.youtube.com/watch?v=vLinb2fgkHk) by Howard Hinnant.

How to handle the cost of copies of objects?  How did we get here in C++?

He was instrumental in getting move semantics info C++ '11  (2011)

- The genesis of move semantics
- Introduction to the special move members (functions)
- Best practices for the move members
- Details, details,...

How Did Move semantics Get Started?  
It was all about optimizing std::vector<T>  
Everything else just rode along on its coattails.

Hinnant wanted his vector to be faster than anybody else's vector. Youstudying  can learn everything you  
can about move semantics by studying vector.

What is a std::vector?  It is basically a 3 pointer vector which points to a heap allocated array where  
first pointer points to the beginning of the array, the second pointer points to the end of the "constructed"  
part of the array, and then you might have some "unconstructed" memory in the array. The first pointer is
the "owner".  How do you copy one of these guys.  It's very easy: 

## Vector Copy       [time 4:13](https://www.youtube.com/watch?v=vLinb2fgkHk#t=04m13s)

![vector1 image](https://github.com/WhatMeWorry/pages/blob/master/Miscellaneous/vector1.png)

You first make a copy of the dynamically allocated array

![vector2 image](https://github.com/WhatMeWorry/pages/blob/master/Miscellaneous/vector2.png)

You then make a copy of the three pointers and make these knew pointers point to the new array

![vector3 image](https://github.com/WhatMeWorry/pages/blob/master/Miscellaneous/vector3.png)

This is very easy. It's also very expensive. One of the most expensive things you can do in c++  
is to allocate memory.  The second most expensive thing you can do is to deallocate memory. 

**Dealing with the heap is very expensive.**

---

## Vector Move   [time 5:04](https://www.youtube.com/watch?v=vLinb2fgkHk#t=05m04s)

![vector4 image](https://github.com/WhatMeWorry/pages/blob/master/Miscellaneous/vector4.png)

To move a vector, just copy the 3 pointer vector, which will automatically point to the array. That is all move semantics is. 

![vector5 image](https://github.com/WhatMeWorry/pages/blob/master/Miscellaneous/vector5.png)

Then you set the original verctor to null.  You don't deallocate the array, you don't allocate the
array, you literally "steal" this array from that guy and justset everything in it to null and in the 
original indicating that it does not own anything anymore.

![vector6 image](https://github.com/WhatMeWorry/pages/blob/master/Miscellaneous/vector6.png)

## Special Member Functions

Special members are those member functions that the compiler can be asked to automatically generate code for.
(do you ask explicitly or implicitly?)
So if you are familiar with C++ 98 no three (Oh three?) you already know you've got the default constructor, the copy constructor the compiler will sometimes generate these for you. These are special members.  

How many are there?

in C++ 11 there are now 6 special members.  In C++ 98 03 there were only 4. we've added two more, sorry, my fault.


| Special Members       | Implemetation |
| -------------         | ------------- |
| Cdefault constructor  | X();          |
| destructor            | ~X();         |
| copy constructor      | X(X const&);  |
| copy assignment       | X& operator=(X const&);  |






```
6.2 Structures and Functions
There are a number of restrictions on C structures. The essential rules are that the only operations  
that you can perform on a structure are:  
take its address with the & operator
access one of its members
```
 

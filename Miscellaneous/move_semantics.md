YouTube talk from Engineering distinguished Speakers [Everything You Ever Wanted to Know About Move Semantics](https://www.youtube.com/watch?v=vLinb2fgkHk) by Howard Hinnant.

How to handle the cost of copies of objects?  How did we get here in C++?

He was instrumental in getting move semantics info C++ '11  (2011)

- The genesis of move semantics
- Introduction to the special move members (functions)
- Best practices for the move members
- Details, details,...

How Did Move emantics Get Started?  
It was all about optimizing std::vector<T>  
Everything else just rode along on its coattails.

Hinnant wanted his vector to be faster than anybody else's vector. Youstudying  can learn everything you  
can about move semantics by studying vector.

![vector1 image](https://github.com/WhatMeWorry/pages/blob/master/Miscellaneous/vector1.png)

jsfdlkj;dsf

![vector2 image](https://github.com/WhatMeWorry/pages/blob/master/Miscellaneous/vector2.png)

lksdf;kfsa
![vector3 image](https://github.com/WhatMeWorry/pages/blob/master/Miscellaneous/vector3.png)


```
6.2 Structures and Functions
There are a number of restrictions on C structures. The essential rules are that the only operations  
that you can perform on a structure are:  
take its address with the & operator
access one of its members
```

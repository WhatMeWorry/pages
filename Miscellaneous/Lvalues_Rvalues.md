

YouTube talk from The Cherno [lvalues and rvalues in C++](https://www.youtube.com/watch?v=fbYknr-HPYE&t=720s#t=04m13s) by Cherno...


Simple definition of what an lvalue and an rvalue is:



```
import std.stdio;

void main()
{
    int i = 10;
}
```

We have two parts to the above expression: we have a left side and a right side and this is also another good way to think about what an L value is and an R value is. An L value is, a lot of the times, something that is on the left side of the equal sign and then an R value is something that is on the right side of the equal sign. Now this does not always apply so do not think that is universally true.

We have a variable called i which is of course an actual variable with a location in memory and then we simply have a value, just a numeric literal. It is just ten. It has no storage. (Probably just exists as a constant temporaryily set in a register)   This makes sense because you can not assign something to an R value. You can't write **10 = i;** That would be weird because 10 is not something that does has a location.  We could write another line underneath it with **int a = i;** Here we are setting an Lvalue equal to something it is also an L value which is why to say the right side always is a R value is wrong.  


```
int GetValue()
{
    return 10;
}

void main()
{
    int i = GetValue();
}
```

An R value does not always have to be a literal. It can also be the result of a function. Maybe we have a function called GetValue() which returns 10. In this case GetValue() returns an R value. It returns a temporary value. It's temporary because even though it returns an int, it has location. It has no storage. What it is doing is taking an R value and storing it into a L value.


Now because GetValue returns an R value, If we try and assign something to that R value it is not going to work. So **GetValue() = 5;** is not going to work.

However, this is where it get interesting. 

```
//int& GetValue()
int GetValue()
{
    static int value = 10;
    return value;
}

void main()
{
	GetValue() = 5;  // line 13
}

values.d(13): Error: GetValue() is not an lvalue and cannot be modified
```

if this was to return an L value which we could do by doing an int reference (this is called an L value reference) then I would require some type of storage for my value (maybe by using a static ing like above and then returning it. if this is the case, since this is now and L value pretending to be a L value reference, I can assign to it  



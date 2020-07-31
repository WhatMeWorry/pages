

YouTube talk from The Cherno [lvalues and rvalues in C++](https://www.youtube.com/watch?v=fbYknr-HPYE&t=720s) by Yan Chernikov


Simple definition of what an lvalue and an rvalue is:  [time 4:19](https://www.youtube.com/watch?v=fbYknr-HPYE&t=720s#t=04m19s)



```
import std.stdio;

void main()
{
    int i = 10;
}
```

We have two parts to the above expression: we have a left side and a right side and this is also another good way to think about what an L value is and an R value is. An L value is, a lot of the times, something that is on the left side of the equal sign and then an R value is something that is on the right side of the equal sign. Now this does not always apply so do not think that is universally true.

We have a variable called i which is of course an actual variable with a location in memory and then we simply have a value, just a numeric literal. It is just ten. It has no storage. (Probably just exists as a constant temporarily set in a register)   This makes sense because you can not assign something to an R value. You can't write **10 = i;** That would be weird because 10 is not something that has a location. We could write another line underneath it with **int a = i;** Here we are setting an Lvalue equal to something that is also an L value which is why to say the right side always is a R value is wrong.  

R value as a non-literal   [time 5:34](https://www.youtube.com/watch?v=fbYknr-HPYE&t=720s#t=05m34s)

```
int GetValue()   // returns a temporary R value
{
    return 10;
}

void main()
{
    int i = GetValue();
}
```

An R value does not always have to be a literal. It can also be the result of a function. Maybe we have a function called GetValue() which returns 10. In this case GetValue() returns an R value. It returns a temporary value. It's temporary because even though it returns an int, it has no location. It has no storage. What it is doing is taking an R value and storing it into a L value.


Now because GetValue returns an R value, If we try and assign something to that R value it is not going to work. So **GetValue() = 5;** is not going to work.

##L value reference   [time 6:22](https://www.youtube.com/watch?v=fbYknr-HPYE&t=720s#t=06m22s)

```
int& GetValue()
{
    static int value = 10;
    return value;
}

void main()
{
	GetValue() = 5;  // line 13
}
```

if GetValue() was to return an L value which we could do by returning an int reference (**int&** is called an L value reference) then I would need to provide some type of storage for my value (maybe by using a static int like above and then returning it. if this is the case, since this is now an L value pretending to be a L value reference, I can assign to so the expression **GetValue() = 5;** works on the left side.


The D Language does not have the int& syntax. It uses the word ref like below

```
import std.stdio;

__gshared int* persist = null;

ref int foo()
{
    auto p = new int;
    persist = p;
    writeln("persist and p should be identical   persist = ", persist, "   p = ",p);
    return *p;
}

void main()
{
    writeln("before foo() call");
    writeln("persist = ", persist);

    foo() = 3;   // reference returns can be L values

    writeln("after foo() call");
    writeln("*persist = ", *persist);
    writeln("persist = ", persist);
}
```
The output of the above D code shows how a function can return an L value
```
before foo() call
persist = null
persist and p should be identical   persist = 21C15961010   p = 21C15961010
after foo() call
*persist = 3
persist = 21C15961010
```


To expand on the this a bit, if I had the function [time 6:55](https://www.youtube.com/watch?v=fbYknr-HPYE&t=720s#t=06m55s) that set a value like below:

```
void SetValue(int value)  // L value (Location value - memory)
{
    writeln("This function works with either an L value or an R value");
}

void main()
{
    int i = 10;
    SetValue(i);   // calling with an L value
    SetValue(10);  // calling with a temporary R value      
}
```
I could call this function a number of ways. I can call it with an L value or an R value. In SetValue(10), The 10 is a temporary R value. This R value will be used to create an 
L value when the function is actually called.


Another rule is you cannot take an L value reference from an R value. So you can only have a L value reference of an L value.  I can demonstrate this by trying to pass an R value into 

```
import std.stdio;   // D code  C++ would use int& value

void SetValue(ref int value)  // L value (Location value - memory)
{
}

void main()
{
    int i = 7;
    SetValue(i);   // works
    SetValue(10);  // this will not compile      
}
```

The compiler will display the error: __cannot pass rvalue argument 10 of type int to parameter ref int value__

In C++ there is actually a special rule and that is that while I cannot have an L value reference of an R value (so in other words I can't ahve someting like this **int& a = 10** if it is Const L value reference I can. So if you write **const int& a = 10;** this works. This is just a special rule; it is kind of a little bit of a workaround. Realistically what happens is that the compiler will probably create like a temporary variable with your actual storage and then assign it to that reference like so

```
//  int& a = 10;    becomes
int temp = 10;
int& = temp;
```

# ***
## R value reference   [time 8:45](https://www.youtube.com/watch?v=fbYknr-HPYE&t=720s#t=08m45s)

The following C++ example  using strings. The last printName call will not compile because and R value is being passed into a L value. 

```
#include <iostream>

void printName(std::string& name)  // L value reference
{
    std:cout << name << std::endl;
}

int main()
{
    std::string firstName = "Yan";
    std::string lastName = "Cherno";
    std::string fullName = firstName + lastName
    
    printName(fullName);
    printName(firstName + lastName);  // expression, R value  - fails when passed to an L value.
}

```

Which is why you will see lots of const references being written in C++ because not both calls work.


```
void printName(const std::string& name)  // const L value reference
{
    std:cout << name << std::endl;
}

int main()
{
    printName(fullName);
    printName(firstName + lastName);  // works 
}
```

Do we have a way to write a function that only accepts temporary object? Yes, we do this with an R value reference. An R value reference looks like an L value reference except it has two ampersands.   


```
void printName(const std::string&& name)  // R value reference
{
    std:cout << name << std::endl;
}

int main()
{
    printName(fullName);              // expression, L value  - fails when passed to an R value reference 
    printName(firstName + lastName);  // works 
}
```
Now the failures are reversed from the previous example.

We can now write an over load this function like so

```
void printName(const std::string& name)  // Accepts L values and if no && exists, then R values as well
{
    std:cout << "L values " << name << std::endl;
}

void printName(const std::string&& name)  // Only accepts temporary objects - R values
{
    std:cout << "R values " << name << std::endl;
}

int main()
{
    printName(fullName);              // expression, L value  - fails when passed to an R value reference 
    printName(firstName + lastName);  // works 
}
```
With R value references, we now have a way to detect temporaries and do something special with them. This is especially useful for move semantics.  Which is for another video.


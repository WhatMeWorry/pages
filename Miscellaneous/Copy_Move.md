

YouTube talk from ACCU 2018 called [Nothing is Better than Copy or Move](https://www.youtube.com/watch?v=-dc5vqt2tgA) by Roger Orr.

How to handle the cost of copies of objects?  How did we get here in C++?

C standard, 1978 1st edition of The "C Programming Language" says:

```
6.2 Structures and Functions
There are a number of restrictions on C structures. The essential rules are that the only operations  
that you can perform on a structure are:  
take its address with the & operator
access one of its members
```

This implies that structures may not be assigned to or copied as a unit, and that they can not be passed to or returned from functions.

- So in K&R C the only option for argument passing and return was to use pointers.  [time 3:15](https://www.youtube.com/watch?v=-dc5vqt2tgA#t=03m15s) 
- This is mapping into a high level language the assembly language model of passing and returning addresses of data structures in registers.
- Some of the C runtime functions still follow this model  struct tm *localtime(const time_t  *timer);
- and of course this is still valid in C++

Some benefits of using pointers-to-objects?   [time 4:02](https://www.youtube.com/watch?v=-dc5vqt2tgA#t=04m02s)

- effeciency, since pointer values can be passed in registers
   you could put everything in a register whether you were returning a number or a pointer, it didn't matter, it fitted in the one register which would have a machine word in it. It doesn't matter how bit that structure is you are just passing a pointer. You can use opaque types. so in C when you open a file you get back a an opaque type (a FILE*)
   What's in a file? Well, you don't care. It's not your problem. In fact, it's not that easy to find out. It is an opaque type but it comes back as a pointer. It is a very simple interface, you did not need function prototypes because you had three arguments, you put three registers values on the stack and you get back one. Nice and simple but a little bit inflexible.
   
- only one object (the pointer), so transfer cost is independent of size of the structure
- can use opaque (incomplete) types, suceh as FILE*, where the client need not know the full type.
- Simple call/return inferface, typically one machine word per argument and a register return value. (Note that K&R declarations didn't include arguments)

Pointers Problems   [time 5:08](https://www.youtube.com/watch?v=-dc5vqt2tgA?t=05m08s)
- where does the object live (and how to tell?)
- Local objects should not be returned or you will get a so-called dangling pointer 
   Who thinks it is a good idea to return a local object sitting on our stack out of our function? The advantage of a local structure is you haven't got to worry about allocating it. It is just there on the stack. There is no cost of allocation. It is just ther on the stack, you just return a pointer to it. Problem is just after you have   returned a pointer from it, the stack gets unwount and your object disappears. Puff. And now you got a pointer points to who knows what.
   So we need to get ahold of memory from somewhere, how about the heap? That's ok, we will allocate memory on the heap and return the pointer.
   Whose responsiblity is it now to destroy the object?  Mine? ... well only if it is a heap object.  Suppose they decided to return instead the address of a static object?
   how can I tell from pointer star whether I've been given a heap object or a static object?  So you end up with conventions, you end up with people putting names in functions to indicate whether or not they are returning new memory static memory. (sarcatically, or we just leak, hey memory is cheap right now, just leak abit.
- Heap objects have to be managed to ensure their deletion - who owns the object
- pointers might be invalid.
- pointers might be null - 

* this is sad because the local structure does not need to be allocated. It's just there on the stack. There is no cost of allocation. You just return a pointer to it. The problem is the stack gets unwound and your object disappears.

In 1989, ANSI C arrived:    [time 7:51](https://www.youtube.com/watch?v=-dc5vqt2tgA?t=07m51s)
In the interveniening years, learned how to copy things.
quote
The main change made by the ANSI standard is to define structure assignment - structures may be copied and assigned to, passed to functions, and returned by functi
endquote

So you could now create a structure and copy it into the calling function or return a structure by copy and that was the main change for structures in ANSI C. And they've been supported now for a number of compilers which is a good thing.


How does this magic work?   [time 9:05](https://www.youtube.com/watch?v=-dc5vqt2tgA?t=09m05s)

- We're used to passing structures by value but we may not know how it works. 
    So let's think about passing a structure into a function. (That's the easiest one)  what do I need to do. Well, I need some memory to put the structure in. So where do I get the memory? On the stack obviously, so push the stack down a bit. I now have gotten my memory, copy the data in, and there it is. As long as the receiving function knows how to find that block of memory, everything is good.  So what you can do in the calling convention is the caller knows that the second argument is a structure so it is expecting to find it on the stack that kind of return address plus a word. That is where the structure will be. There are other ways of doing it but that is simplest and probably most effecient way of doing using the stack.

- For example, with a simple stack based calling convention:

void foo(int arg1, example arg2, int arg3);
void bar()
{
    example ex = { /*...*/ };
    foo(1, ex, 2);
}



- We are used to passing structure by value but we many not think about how it works.









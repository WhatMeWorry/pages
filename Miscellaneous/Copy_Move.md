

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

Pointers Problems   [time 5:08](https://www.youtube.com/watch?v=-dc5vqt2tgA#t=05m08s)
- where does the object live (and how to tell?)
- Local objects should not be returned or you will get a so-called dangling pointer 
   Who thinks it is a good idea to return a local object sitting on our stack out of our function? The advantage of a local structure is you haven't got to worry about allocating it. It is just there on the stack. There is no cost of allocation. It is just ther on the stack, you just return a pointer to it. Problem is just after you have   returned a pointer from it, the stack gets unwount and your object disappears. Puff. And now you got a pointer points to who knows what.
   So we need to get ahold of memory from somewhere, how about the heap? That's ok, we will allocate memory on the heap and return the pointer.
   Whose responsiblity is it now to destroy the object?  Mine? ... well only if it is a heap object.  Suppose they decided to return instead the address of a static object?
   how can I tell from pointer star whether I've been given a heap object or a static object?  So you end up with conventions, you end up with people putting names in functions to indicate whether or not they are returning new memory static memory. (sarcatically, or we just leak, hey memory is cheap right now, just leak abit.
- Heap objects have to be managed to ensure their deletion - who owns the object
- pointers might be invalid.
- pointers might be null

In 1989, ANSI C arrived:    [time 7:51](https://www.youtube.com/watch?v=-dc5vqt2tgA#t=07m51s)
In the interveniening years, learned how to copy things.

```
The main change made by the ANSI C standard is to define structure assignment - structures may be copied and assigned to, passed to functions, and returned by functions.
```


So you could now create a structure and copy it into the calling function or return a structure by copy and that was the main change for structures in ANSI C. And they've been supported now for a number of compilers which is a good thing.


How does this magic work?   [time 9:05](https://www.youtube.com/watch?v=-dc5vqt2tgA#t=09m05s)

- We are used to passing structures by value but we may not know how it works. 
    So let's think about passing a structure into a function. (That's the easiest one)  what do I need to do. Well, I need some memory to put the structure in. So where do I get the memory? On the stack obviously, so push the stack down a bit. I now have gotten my memory, copy the data in, and there it is. As long as the receiving function knows how to find that block of memory, everything is good.  So what you can do in the calling convention is the caller knows that the second argument is a structure so it is expecting to find it on the stack that kind of return address plus a word. That is where the structure will be. There are other ways of doing it but that is simplest and probably most effecient way of doing using the stack.
    
- Passing in an argument is the easier one  
    - Reserve stack space  
    - Copy the argument into the reserved space  
- The copy is created before calling the function, in stack space to be used by the called function  
    - In some calling conventions the called function finds the structure on the stack, others explicitly pass in the address


For example, with a simple stack based calling convention:
```
void foo(int arg1, example arg2, int arg3);
void bar()
{
    example ex = { /*...*/ };
    foo(1, ex, 2);
}
```
the assembly would become  
```
push '2'       early compilers pushed from right to left arguments.  
reserve sizeof(example) bytes on the stack  
copy in 'ex'  
push '1'  
call foo  
```
Most modern compilers are excited about using these things called "registers" to pass arguments.

Typically, in 64 bit calling conventions we find is the first few arguments to a function are passed in registers. So what we do now is use a different order:

```
reserve sizeof(example) bytes on the stack  
copy in 'ex'  
load 1 into registerA  
load address of the reserved bytes into registerB  
load 2 into registerC  
call foo
```
We reserve space on the stack for our strusture because it probably won't fit in a register and then we copy 'ex' into it and then we load 1 into some register and we load the address of the reserved bytes into another register and we load 2 into our whatever third register. So what we are doing here is efectively passing a pointer. So although the syntax talks about passing "example" by copy, under the covers the compilers are actually creating a copy and passing a pointer to it. You can tell this easily in action by just printing out the address of the arguments.


- Returning a structure is more difficult   [time 14:05](https://www.youtube.com/watch?v=-dc5vqt2tgA#t=14m05s)
- You are typicall returning a local variable, existing on the stack of the called function
- By time the function has returned the local variable has gone!
- Typical implementation:
    - Reserves stack space in the caller for the return value  
    - Passes the address of this space to the called function as a (hidden) argument
    
    




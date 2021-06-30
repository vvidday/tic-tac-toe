# tic-tac-toe

Tic-Tac-Toe project from The Odin Project (Javascript Path)

Things I learnt from this project:

- Basics of working with objects in Javascript.

  - Although constructors can be used to create objects, they're "risky" in the sense that they look like normal functions, and if we call them without the `new` keyword, our program will behave weirdly.
  - Another way to create objects is with **factory functions**, which are basically just normal functions that _return an object when called_.
  - We can take advantage of scoping to have private variables and methods. Everything inside the factory function that we don't return as part of the object are private, and can't be accessed by anything other than instances of the object.
  - _Modules_ are similar to factory functions, with the difference being that the function is called immediately (and thus instantiated). This gives us one instance of that object that can be used throughout the program, and should be used on objects that we only have one instance of (e.g. `GameBoard`).

- It has been quite fun trying to encapsulate as much logic/functions/variables inside objects and minimizing global code. In the past few projects, my JS files were mostly a mess, with a bunch of global variables and functions just scattered about. OOP seems really useful for organizing my code and keeping it much cleaner for other people to read as well.

# JavaScript loops marking guide

The aim of the tasks is to demonstrate an understanding of the JavaScript features covered in the [Looping code](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Looping_code) lesson in Learn Web Development on MDN.

Note: If there is an error in your code, it will be outputted into the results panel on the page, to help you try to figure out the answer (or into the browser's JavaScript console, in the case of the downloadable version).

Note: We didn't provide live editable versions of these tasks because of the risk of creating infinite loops and crashing the assessment page.

## Task 1

In our first looping task we want you start by creating a simple `for()` loop that goes through all the items in the provided `myArray` and prints them out on the screen inside list items, which are appended to the provided `list`. 

Note that using an array method like. `forEach()` would also be acceptable, as would a different loop. structure such as `while()`.

The finished code should look something like this:

```
let myArray = ['tomatoes', 'chick peas', 'onions', 'rice', 'black beans'];

let list = document.createElement('ul');

for(let i = 0; i < myArray.length; i++) {
  let listItem = document.createElement('li');
  listItem.textContent = myArray[i];
  list.appendChild(listItem);
}
```

## Task 2

In this next task, we want you to write a simple program that, given a name, searches an array of objects containing names and emails (`phonebook`) and, if it finds the name, outputs the name and phone number and then uses `break` to exit the loop.  

If the name is not found, it lets the user know.

You should use a type of loop that you've not used in the previous task.

The finished code should look something like this:

```
let name = 'Mustafa';
let i = 0;
let para = document.createElement('p');

let phonebook = [
  { name : 'Chris', number : '1549' },
  { name : 'Li Kang', number : '9634' },
  { name : 'Anne', number : '9065' },
  { name : 'Francesca', number : '3001' },
  { name : 'Mustafa', number : '6888' },
  { name : 'Tina', number : '4312' },
  { name : 'Bert', number : '7780' },
  { name : 'Jada', number : '2282' },
]

// Add your code here

do {
  if(phonebook[i].name === name) {
    para.textContent = `${ phonebook[i].name }'s number is ${ phonebook[i].number }.`;
    break;
  }

  if(i === phonebook.length - 1) {
    para.textContent = 'Name not found in the phonebook';
  }

  i++;
} while(i < phonebook.length);
```

## Task 3

Finally, you'll need to use a loop to go through the numbers 1 to 500, backwards, and run the `isPrime()` function on them. For each number that isn't a prime number, use the `continue` keyword to move on to the next loop iteration. For each one that is a prime number, add it to the paragraph's `textContent`.

You should use a type of loop that you've not used in the previous two tasks.

The code should look something like this:

```
do {
  if (isPrime(i)) {
    para.textContent += `${i} `;
  }
  i--;
} while (i > 1);
```

(Answer provided by harryghgim; well done!)
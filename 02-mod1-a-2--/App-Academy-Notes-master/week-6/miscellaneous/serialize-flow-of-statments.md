# Controlling the Execution Flow of Statements

> Summary: in this tutorial, you will learn how to control the execution flow of statements. The sqlite3 module provides you with two methods for controlling the execution flow of statements. The serialize() method allows you to execute statements in serialized mode, while the parallelize() method executes the statements in parallel. Let’s look into each method […]

**Summary**: in this tutorial, you will learn how to control the execution flow of statements.

The `sqlite3` module provides you with two methods for controlling the execution flow of statements. The `serialize()` method allows you to execute statements in serialized mode, while the `parallelize()` method executes the statements in parallel.

Let’s look into each method in detail to understand how it works.

Executing statement in serialized mode with Database.serialize
--------------------------------------------------------------

The `serialize()` method puts the execution mode into serialized mode. It means that only one statement can execute at a time. Other statements will wait in a queue until all the previous statements are executed.

After the `serialize()` method returns, the execution mode is set to the original mode again.

It’s safe to nest the `serialize()` method as follows:

`db.serialize(() => {
  
  db.serialize(() => {
    
  });
  
});` 

Suppose, you want to execute the following three statements in sequence:

1.  Create a new table.
2.  Insert data into the table.
3.  Query data from the table.

To do this, you place these statements in the `serialize()` method as follows:

``const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    console.error(err.message);
  }
});

db.serialize(() => {
  
  db.run('CREATE TABLE greetings(message text)')
    .run(`INSERT INTO greetings(message)
          VALUES('Hi'),
                ('Hello'),
                ('Welcome')`)
    .each(`SELECT message FROM greetings`, (err, row) => {
      if (err){
        throw err;
      }
      console.log(row.message);
    });
});


db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
});`` 

Because the `run()` method returns a `Database` object so that we could chain the method calls.

Let’s run the program to see how it works.

`> node serialize.js
Hi
Hello
Welcome` 

It works as expected.

Notice that if you don’t place three statements in the `serialize()` method, all the three statements may execute in parallel which would cause an error.

Executing statements in parallel with Database.parallelize
----------------------------------------------------------

If you want the scheduled queries to execute in parallel, you place them in the `parallelize()` method.

Similar to the `serialize()` method, it is safe to nest the `parallelize()` method as follows:

`db.parallelize(() => {
  
  db.parallelize(() => {
    
  });
  
});` 

For the demonstration, we will create a new function that calculates the sum of two numbers using SQLite database and place the function calls in the `parallelize()` method as shown in the following example:

``const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    console.error(err.message);
  }
});

db.parallelize(() => {
  dbSum(1, 1, db);
  dbSum(2, 2, db);
  dbSum(3, 3, db);
  dbSum(4, 4, db);
  dbSum(5, 5, db);
});


db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
});

function dbSum(a, b, db) {
  db.get('SELECT (? + ?) sum', [a, b], (err, row) => {
    if (err) {
      console.error(err.message);
    }
    console.log(`The sum of ${a} and ${b} is ${row.sum}`);
  });
}`` 

Let’s run the `parallelize.js` program.

`>node parallelize.js
The sum of 5 and 5 is 10
The sum of 1 and 1 is 2
The sum of 4 and 4 is 8
The sum of 3 and 3 is 6
The sum of 2 and 2 is 4` 

As you see in the output, the order of execution is not the same as it was called in the program.

Notice that the statements execute in parallel, therefore, each time you run the program, the order of execution may be different.

In this tutorial, you have learned how to control the execution flow of the statements.

*   Was this tutorial helpful ?
*   [Yes](#)[No](#)


[Source](https://www.sqlitetutorial.net/sqlite-nodejs/statements-control-flow/)
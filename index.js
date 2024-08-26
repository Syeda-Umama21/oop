#! /usr/bin/env node
import inquirer from 'inquirer'; // Importing the inquirer module for command-line interactions
import chalk from 'chalk'; // Importing chalk for colorful console messages  
class Student {
    name; // Property to store the student's name
    constructor(n) {
        this.name = n; // Initializing the name property in the constructor
    }
}
class Person {
    students = []; // Array to store Student objects
    addStudent(obj) {
        this.students.push(obj); // Method to add a Student object to the students array
    }
}
const persons = new Person(); // Creating an instance of the Person class
// Asynchronous function to start the program and interact with the user
const programStart = async (persons) => {
    // Charming welcoming message for the user
    console.log(chalk.green('\n╔══════════════════════════════════╗'));
    console.log(chalk.green('║                                  ║'));
    console.log(chalk.green('║ ') + chalk.yellow(' Welcome to our little program! ') + chalk.green('║'));
    console.log(chalk.green('║ ') + chalk.yellow('  Feel free to explore and chat ') + chalk.green('║'));
    console.log(chalk.green('║ ') + chalk.yellow('      with staff and students.   ') + chalk.green('║'));
    console.log(chalk.green('║                                  ║'));
    console.log(chalk.green('╚══════════════════════════════════╝'));
    console.log(''); // Empty line for better readability
    do {
        // console.log(chalk.bold.yellow('\n\t\t\t<<<-----------Welcome!---------->>>\n'));  // Welcome message
        // Prompting the user to select an option
        const ans = await inquirer.prompt({
            name: 'select',
            type: "list",
            message: chalk.rgb(247, 184, 107).bold("Whom would you like to interact with?"),
            choices: ['staff', 'student', 'Exit']
        });
        if (ans.select === 'staff') {
            console.log(chalk.rgb(146, 229, 239).bold('You approach the staff room. please free to ask any question.'));
        }
        else if (ans.select === 'student') {
            // Prompting the user to enter the student's name
            const ans = await inquirer.prompt({
                name: 'student',
                type: 'input',
                message: chalk.green.bold("Enter the student's name you wish to engage with:")
            });
            // Checking if the student already exists in the list
            const student = persons.students.find(val => val.name == ans.student);
            if (!student) {
                // If student does not exist, create a new student and add to the list
                const name = new Student(ans.student);
                persons.addStudent(name);
                console.log(chalk.cyan.bold(`Hello I am ${name.name}. Nice to meet you!`));
                console.log(chalk.yellow.bold("New student added."));
                console.log(chalk.rgb(134, 243, 230).bold('Current student list:'));
                console.log(persons.students);
            }
            else {
                // If student exists, greet the student and display the list
                console.log(chalk.cyan.bold(`Hello I am ${student.name}. Nice to see you again`));
                console.log(chalk.yellow.bold('Existing student list'));
                console.log(persons.students);
            }
        }
        else if (ans.select === 'Exit') {
            console.log(chalk.red.bold('Exiting the program...'));
            process.exit(); // Exit the program
        }
    } while (true); // Infinite loop to keep the program running
};
programStart(persons); // Starting the program with the persons instance

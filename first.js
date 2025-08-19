// console.log("Hi welcome Aryan!!! ");
// fullName = "Aryan";
// age = 20;
// price =999999999;
// console.log(fullName, age,price);

// const { jsx } = require("react/jsx-runtime");

// const product = {
//     name: "Apple",
//     price: 1000,
//     description: "This is a apple product",
//     isAvailable: true

// };
// console.log(product);

// let profile ={
//     name: "Aryan",
//     age: 20,
//     followers: 1000,
//     isVerified: true,
//     education: "B.tech",
// };
// console.log(profile.name);

//  let a = 5;
//  let b = 2;
// console.log("a =", a,"& b =", b);
// console.log("a + b:" ,a+b);
// console.log("a - b:", a-b);
// console.log("a * b:", a*b);
// console.log("a / b:", a/b);
// console.log("a % b:", a%b);
// console.log("a ** b:", a**b);

// console.log("a =", ++a);
// console.log("a =", a);

// assignmnet operators
/* = , += , -= , *= , /= , %= , **=  */
// let a = 5;
// let b = 2;
// a **= 5; // a = a ** 5
// console.log("a =", a);

// Comparison Operators
/*  Equal to --> == , Equal to & type --> === , Not equal to --> != , Not equal to & type --> !==  , greater than --> ">" ,lesser than --> "<" , greater than or equal to --> ">=" , lesser than or equal to --> "<="  */
// let a = 5; // number
// let b = "2"; // string --> convert into number
// console.log("a != b:", a != b); // true
// console.log("a === b:", a === b); // false
// console.log("a > b:", a > b); // True
// console.log("a < b:", a < b); // false
// console.log("a >= b:", a >= b); // True
// console.log("a <= b:", a <= b); // false
// console.log("a == b:", a == b); // false --> because 5 is not equal to 2
// console.log("a === b:", a === b); // false --> because 5 is not equal to 2 & type is also not equal

// Logical Operators
/*  AND --> && , OR --> || , NOT --> !  */
// returns value in boolean format --> true or false
// let a = 6;
// let b = 5;
// let con1 = a > b;
// let con2 = a == 6;
// console.log("con1 && con2:", con1 && con2); // true --> because both are true
// console.log("con1 || con2:", con1 || con2); // true --> because one of them is true
// console.log("!con1:", !con1); // false --> because con1 is true

// Conditional Statements
/* if else , if else if , switch case  */
// let age = 16;
// if(age >= 18){
//     console.log("You are eligible to vote");
// }
// else{
//     console.log("You are not eligible to vote");
// }

// let mode = "dark";
// let color;
// if(mode === "dark"){
//     color = "black";
// }
// else{
//     color = "white";
// }
// console.log(color);

// let number = 7;

// if(number%2 == 1){
//     console.log("number is odd"); --> //number is odd
// }
// else{
//     console.log("number is even"); --> //number is even
// }

// Ternary Operator
/*  condition ? value_if_true : value_if_false */
// example:
// let age = 160;
// age >= 18 ? console.log("You are eligible to vote") : console.log("You are not eligible to vote");

// q1. Get user to input a number using prompt("Enter a number: "). Check if the number is a multiple of 5 or Notification.

// let number = prompt("Enter a number:");
// if(number % 5 == 0){
//     console.log("Number is a multiple of 5");
// }
// else{
//     console.log("Number is not a multiple of 5");
// }

//___________________________________________________________________________________________________________________________________________________

// Loops
/* for , while , do while */ // --> loops >> iterables(strings , objects , arrays)

//for loop
/* let n = prompt("Enter a number: ");
let sum = 0;
for (let i = 1; i <= n ; i++) {
    sum += i;
}
console.log(sum); */

// for- of loop

// let str = "Hello, World!";
// for (let char of str) {
//     console.log(char);
// }

// for- in loop

// let object ={
//     shape: "round",
//     color: "red",
//     size: 10,
//     material: "plastic",
// }
// for (let key in object){
//     console.log(key, ":", object[key]);
// }
//___________________________________________________________________________________________________________________________________________________

// print all even numbers from 0 t 100
// for (let i = 0; i < 101; i++){
//     if(i%2 == 0){
//         console.log(i);
//     }
// }

// create a number guessing game

// let gamenum = 25;
// let usernum = prompt("guess the number:");
// while (usernum != gamenum) {
//     usernum = prompt("you entered wrong number pls guess the number again:");
// }
// console.log("you have won")
//___________________________________________________________________________________________________________________________________________________

// strings
// template literals

// let obj = {
//     item:"pen",
//     price: 10,
// }
// console.log(`the cost of ${obj.item} is ${obj.price}₹`)

//string Interpolation
// `string text ${expression} string text`

// string methods --> strings are immutable in js

// str.toUpperCase()
// str.toLowerCase()
// str.trim() --> removes whitespaces
// str.split() --> splits the string into an array
// str.replace( searchval, newval) --> replaces the string with another string
// str.includes() --> checks if the string contains the search value
// str.indexOf() --> returns the index of the first occurrence of the search value
// str.lastIndexOf() --> returns the index of the last occurrence of the search value
// str.charAt(idx) --> returns the character at the specified index
// str.concat(str2) --> concatenates the string with another string
// str.slice(start, end?) --> returns the part of the string between the specified start and end indexes --> end is not included

// let str = `ILOVEJS`;
// str = str.replace("L", "M")
// console.log(str);
//___________________________________________________________________________________________________________________________________________________

// arrays --> collection of items --> linear --> type of array is "object" --> mutable
// let arr = ["aryan","nikhil","Om","Anurag","Sarvesh","Sachin"];
// // for(let val=0; val<arr.length;val++){
// //     console.log(arr[val]);
// // }
// for(let el of arr)console.log(el.toUpperCase());

// arr => [85, 97, 44, 37, 76, 60] --> find average
// let arr =[85, 97, 44, 37, 76, 60];
// let sum = 0;
// for (let val of arr)sum += val;
// console.log(`The average marks of the students is ${sum/arr.length}`);

// prices =[250, 645, 300, 900, 50] --> offer 10% --> make new array with discount

// let prices = [250, 645, 300, 900, 50];
// let new_prices = [];
// for(let val=0; val<prices.length; val++)new_prices[val] = prices[val]*(0.9);
// console.log(new_prices);

// array methods
// arr.push() --> adds an element at the end of the array
// arr.pop() --> removes the last element of the array
// arr.unshift() --> adds an element at the beginning of the array
// arr.shift() --> removes the first element of the array
// arr.splice(start, deleteCount, item1, item2, itemN) --> adds or removes elements from the array
// arr.indexOf() --> returns the index of the first occurrence of the search value
// arr.lastIndexOf() --> returns the index of the last occurrence of the search value
// arr.includes() --> checks if the array contains the search value
// arr.join() --> returns a string with all elements of the array separated by a specified separator
// arr.concat() --> returns a new array that contains the elements of the original array and the elements
// arr.slice(start, end?) --> returns the part of the array between the specified start --> make a copy of the array
// arr.reverse() --> reverses the order of the elements in the array
// arr.sort() --> sorts the elements of the array in place and returns the array
// arr.fill(value, start, end?) --> fills the array with a specified value, starting at
// arr.map() --> creates a new array with the results of applying a provided function on every element
// arr.filter() --> creates a new array with all elements that pass the test implemented by the provided
// arr.toString() --> returns a string with all elements of the array separated by a comma

// companies --> bloomberg, microsoft, uber , google, IBM , netflix , amazon
/* q1) remove the first company from the array 
   q2) remove uber & add Ola in its place 
   q3) add amazon at the end 
*/

// let companies = ["bloomberg", "microsoft", "uber", "google", "IBM", "Netflix"];
// // companies.shift();
// // companies.splice(2,1,"Ola");
// companies.push("Amazon");
// console.log(companies);
//_________________________________________________________________________________________________________________________________________________

// functions --> block of code that can be called/invoked multiple times from different parts of the program to perform a specific task

//(redundancy -> repeat ) --> avoid this at any cost --> use functions

// function greet(name){
//     console.log(`Hello ${name}!`);
// }

// function sum(x, y){
//     console.log(`${x}x + ${y}y = ${x+y}`); --> to generate a equation
// }
// sum (5, 7);
// sum(10, 20);
// function sum(x,y){
//     return x+y;
// }
// arrow function --> shorthand for function declaration
// let sum = (x,y) => {  --> sum is variable act as a function
//   return x+y;
// }

// const mul_num = (a,b) => {
//     console.log(`a * b = ${a*b}`);
// }
// mul_num(52,896587); --> a * b = 46622524

// let print_hello = () =>{
//     console.log("Hello");
// }

// Q) count vowels in a string
// let vowels = 0;
// function count_vowels (str){
//     for (let count = 0; count < str.length; count++){
//         if (str[count] === 'a' || str[count] === 'e' || str[count] === 'i' || str[count] === 'o' || str[count] === 'u'){
//             vowels++;
//         }
//     }
//     console.log(`Number of vowels in the string is ${vowels}`);
// }
// count_vowels(prompt("Enter the string: "));
// let vowels = 0;
// let count_vowels = (str) =>{
//     for(let i = 0; i < str.length; i++){
//         if(str[i] === "a" || str[i] === "e" || str[i] === "i" || str[i] === "o" || str[i] === "u"){
//             vowels++;
//         }
//     }
//     console.log(`Number of vowels in the string is ${vowels}`);
// }
// count_vowels(prompt("Enter the string: "));

// forEach loop in Arrays

// arr.forEach( callBackFunction ) --> callBackFunction: Here, it is a function to execute for each element in the array
/* A callback is a function passed as an argument to another function.*/

// forEach is Higher Order Function (HOF) --> HOF is a function that takes another function as an argument or returns
// let arr = ["pune", "mumbai", "nagpur", "wardha", "akola"];

// arr.forEach(function my_function(val){
//     console.log(val.toUpperCase());
// })

// arr.forEach((val , idx, arr) =>{
//     console.log(val.toUpperCase(), idx, arr);
// })

// Q) print the square of each number in the array using forEach loop

// let num = [1,2,3,4,5,6,7,8,9,10];

// using arrow functions
// num.forEach((val) =>{
//     console.log(`square of ${val} is ${val * val}`);
// })

// num.forEach(function square(num){
//     console.log(`square of ${num} is ${num * num}`);
// })

//  let calc_sqr = (num) =>{
//     console.log(`square of ${num} is ${num * num}`);
//  }
// num.forEach(calc_sqr);

// Map Method --> creates a new array with the results of some operations on each element of the original array. The value its callback returns are used to form new array . It does not change the original array.

// let nums =[1,2,21,3,81,17,4,65,8,5,19,5,82,18];
// let new_nums = nums.map((val) =>{
//     return val*2;
// })
// console.log(nums);
// console.log(new_nums); --> it will print empty array because map method does not return anything by default

// filter method
// let arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
// let evenarr = arr.filter((val) =>{
//     return val % 2 === 0;
// });
// console.log(arr);
// console.log(evenarr);  //--> it will print original array and new array with even numbers

// reduce method --> performs some operation & reduces the array to a single value. it returns that single value

// let arr =[1,2,3,101,4,5];
// const largenum = arr.reduce((prev , curr) =>{
//     return prev > curr ? prev : curr;
// });
// console.log(largenum); //--> it will print 15

// Q) we are given array of marks of students. Filter out of the marks of students that scored 90+.

// let marks = [85, 90, 78, 92, 67, 89, 95, 76, 91, 88, 98, 75, 93];
// let highest = marks.filter((val) =>{
//     return val >= 90;
// })
// console.log(highest); //--> it will print array of marks of students that scored 90+

//Q) Take a number n as input from user. create an array of numbers from 1 to n.
/* use the reduce method to calculate sum of all numbers in the array.
   use the reduce method to calculate product of all numbers in the array. */

// let input = parseInt(prompt("Enter a number: "));
// let arr =[];
// for(let i=1; i<=input ; i++)arr.push(i);
// console.log(`The array from 1 to ${input} is ${arr}`);

// let sum = arr.reduce((prev, curr) =>{
//     return prev + curr;
// })
// console.log(`The sum of all numbers in the array is ${sum}`);

// let product = arr.reduce((prev, curr) =>{
//     return prev * curr;
// })
// console.log(`The product of all numbers in the array is ${product} or we can say that it is factorial of ${input} i.e. ${input}! = ${product}`);
//___________________________________________________________________________________________________________________________________________________________________

// date : 20 july 2025

// Document Object Model (DOM) is a programming interface for HTML and XML documents. It defines the logical structure

// window object is the top most object in the DOM tree. It represents the browser window.
//document object is the root of the DOM tree. It represents the HTML document.

// document.getelementbyid("id");
// document.getelementsbyclassname("class");
// document.getelementsbytagname("tag");

// console.dir(document);
// console.log(document);

// document.querySelector("id","class","tag");
// document.querySelectorAll("id","class","tag");.

//properties
/* 
1) tagname --> returns the name of the tag.
2) innertext --> returns the text inside the tag.
3) innerHTMl --> returns the HTML inside the tag.
4) textcontent --> returns textual content from hidden elements also.
*/
// nodes
/* text , comment , element , document , documentfragment , documenttype , documentposition */
// let h2 = document.querySelector("h2");
// h2.innerText += " from Apna  College student";
// console.dir(h2.innerText);

// let divs = document.querySelectorAll(".box");
// let id =1;
// for (let i of divs){
//    divs[id-1].innerText = `hello ${id} person`;
//    id++;
// }

// DOM Manipulation
// attributes
/* 
getAttribute(attr) --> to get the attribute value  
setAttribute(attr, value) --> to set the attribute value 
*/
// let para = document.querySelectorAll("p");
// console.log(para[0].setAttribute("class" , "sexy"));
// console.log(para[1].setAttribute("class" , "sexy"));
// console.log(para[2].setAttribute("class" , "sexy"));
// console.log(para[3].setAttribute("class" , "sexy"));
// console.log(para[4].setAttribute("class" , "sexy"));
// console.log(para[5].setAttribute("class" , "sexy"));

// let div = document.querySelector("div");
// div[0].style.backgroundColor = "green";
// div[1].style.backgroundColor = "red";

// div[0].style.fontSize = "29px";
// div[1].style.fontSize = "29px";

// div[1].innerText = "hello!!";
// div[0].innerText = "hello!!";
// div.style.visibility = "hidden";

// to add a new element in HTML

// let newBtn = document.createElement("button");
// newBtn.innerText = "Click me!!";
// console.log(newBtn);

// let div = document.querySelector("p");
// div.after(newBtn);

// let newhead = document.createElement("h1");
// newhead.innerHTML = "<i>hello myself Aryan Mhaiskar</i>";
// console.log(newhead);

// document.querySelector("body").prepend(newhead);
// newhead.style.color ="green";

// let new_button = document.createElement("button");
// new_button.innerText = "Click me!!";
// console.log(new_button);

// let bd = document.querySelector("body");
// bd.prepend(new_button);

// new_button.style.backgroundColor = "red";
// // new_button.style.color = "white";
// let para = document.querySelector("p");
// para.classList.add("newcontent")

// document.querySelector("h2").style.color = "red";

//___________________________________________________________________________________________________________________________________________________________
// Events in JavaScript

// let a =0;
// let button = document.querySelector("button");
// button.ondblclick = () =>{
//    a++;
//    console.log(`Button clicked!! ${a*2} times`);
// }

// priority

// inline js << code in js
// let a = 0;
// let bd = document.querySelector("body");
// let btn = document.querySelector("#mode");
// btn.addEventListener("click", () =>{
//    a++;
//    if (a%2 !== 0){
//    bd.style.backgroundColor ="Black";
// }else{
//    bd.style.backgroundColor = "white";
// }
// })

// synchronus programming

// console.log("one");
// console.log("Two");

// setTimeout(() => {
//    console.log("hello")
// }, 2000);

// console.log("three");
// console.log("four");

// function Sum(a, b){
//    console.log(a+b);
// }

// function calculate(a, b, sumCallback){
//    sumCallback(a, b);
// }

// calculate(5, 7, Sum);
// function getData(dataId, getNextdata) {
//   setTimeout(() => {
//     console.log(`data:${dataId}`);
//     if (getNextdata) {
//       getNextdata();
//     }
//   }, 2000);
// }
// callback Hell (pyramid of doom) --> soln: Promises
// getData(1, () => {
//   getData(2, () => {
//     getData(3, () => {
//       getData(4);
//     });
//   });
// });

// Promises
/* 
three stages of promise
1. pending --> the result is undefined
2. fulfilled --> the result is a value (fulfilled)
3. rejected --> the result is an error object 

// */
// const getPromise = () => {
//   return new Promise((resolve, reject) => {
//     console.log("I am a promise");
//    //  resolve("success");
//    // reject("error");
//   });
// };

// let promise = getPromise();
// promise.then((res) => {
//   console.log("fulfilled", res);
// });

// promise.catch((err) => {
//    console.log("rejected" , err);
// });

// function getData(dataId, getNextdata) {
//    return new Promise((resolve, reject) =>{
//       setTimeout(() =>{
//          console.log(`data:${dataId}`);
//          resolve("success");
//          // reject("rejected");
//          if (getNextdata) {
//             getNextdata();
//          }
//       }, 5000);
//    });
// }

// promise chain

// function asynData1() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log("data :1");
//       resolve("success");
//     }, 2000);
//   });
// }
// function asynData2() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log("data :2");
//       resolve("success");
//     }, 2000);
//   });
// }

// console.log("fetching data1");
// asynData1().then((res) => {
// //   console.log(res);
//   console.log("fetching data2");
//   asynData2().then((res) => {
//    //  console.log(res);
//   });
// });



// function getData(dataId, getNextdata) {
//    return new Promise((resolve, reject) =>{
//       setTimeout(() =>{
//          console.log(`data:${dataId}`);
//          resolve("success");
//          // reject("rejected");
//       }, 5000);
//    });
// }
 // promise chain
// getData(1).then((res) =>{
//    return getData(2);
// }).then((res) =>{
//    return getData(3);
// }).then((res) =>{
//    console.log(res);
// })

// Async Await --> always return promise
// function api(){
//    return new Promise((resolve, reject) => {
//       setTimeout(() => {
//          console.log("api data");
//          resolve(200);
//       }, 2000);
//    });
// }

// async function main(){
//    await api();
//    await api();

// }
// main();




// async function hello (){
//    console.log(`hello`)
// }
// await --> always return promise
// function getData(dataId){
//    return new Promise ((resolve, reject) => {
//       setTimeout(() =>{
//          console.log(`data:${dataId}`);
//          resolve("success");
//       }, 3000);

//    })
// }

// async function getAllData(){
//    await getData(1);
//    await getData(2);
//    await getData(3);
//    await getData(4);
// }


// IIFE --> Immediately Invoked Function Expression
// IIFE --> function that is called immediately after as soon as  it is defined

// Fetch API  --> Aplication Programming Interface -> it uses request and response objects 

// let promise = fetch(URL, [Options])
/*
AJAX --> Asynchronous JavaScript and XML --> it is used to send and receive data from a server in the background
JSON --> JavaScript Object Notation --> it is used to send and receive data from a server in the background
json() method --> returns a second promise that resolves with the result of parsing the esponse body text as JSON. (Input is JSON, output is JS object)*/  

// const URL = "url https://fun-facts1.p.rapidapi.com/api/fun-facts";
// const factPara = document.querySelector("#fact");
// const btn = document.querySelector("#btn");

// const getFacts = async () => {
//    console.log("getting data .....");
//    let response = await fetch(URL);
//    let data = await response.json();
//    factPara.innerText = data[0].text;
// };

// btn.addEventListener("click", getFacts);
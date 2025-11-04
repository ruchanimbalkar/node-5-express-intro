// ---------------------------------
// Boilerplate Code to Set Up Server
// ---------------------------------

//Boiler plate code to start server:
//Importing all of our node modules
import fs from "fs/promises";
import moment from "moment";
import { getSign, getZodiac } from "horoscope";
import express from "express"; // the framework that lets us build webservers
import { get } from "https";

//Declare a variable named app and call the express() function to create a new instance of express so we can use all of the methods, fucntions, properties of express
// which will be saved in app
const app = express();

//Defining out port number
//What port should our server listen to?
const port = 3000; // you can use any port # but developers commonly use 3000. also there are some port numbers you cannot use

//Declaring that this server will be receiving and responding to requests in JSON
app.use(express.json());

//Turn on our server so that it can listen for requests and respond to those requests at our port #
//Hello you are on , listen to requests and respond to those requests
app.listen(port, () => {
  console.log(`Server is listening on port #${port}`);
}); //this method is turning on our server

// ---------------------------------
// Helper Functions
// ---------------------------------

// ---------------------------------
// Our very first API Endpoints
// ---------------------------------

//GET request
//app.get() takes in 2 parameters :
// // 1. first parameter is endpoint - the URL that the server listens to
// // 2. second parameter is callback function - what we do when we receive a request at this endpoint
//  //  //2.1 this call back function will always take two parameters : the request and response objects
// 1] request =>  what user is asking for
// 2] response <= what we will send back to user
app.get("/", (request, response) => {
  response.send("Hello World!"); // this method lets us send back a String as response
});

//second endpoint
app.get("/say-good-morning", (req, res) => {
  res.send("Good Morning!"); // this method lets us send back a String as response
});

//third endpoint
app.get("/say-good-afternoon", (req, res) => {
  res.send("Good Afternoon!"); // this method lets us send back a String as response
});

//fourth end-point
app.get("/get-user", (req, res) => {
  //the res.send() method sends back a String as a response
  res.send(`Hello, Rucha!`); // this method lets us send back a string as response
});

//Dynamic endpoints
//Let's add dynamic parameter
// http://localhost:3000/get-user/Scooby -> Hello, Scooby!
// http://localhost:3000/get-user/Sunny -> Hello, Sunny!

//fifth end-point
app.get("/get-user/:userName", (req, res) => {
  const userName = req.params.userName;
  //the res.send() method sends back a String as a response
  res.send(`Hello, ${userName}!`); // this method lets us send back a string as response
});

//sixth end-point
app.get("/order-tacos/:protein/:numTacos", (req, res) => {
  const protein = req.params.protein;
  const numTacos = req.params.numTacos;
  //the res.send() method sends back a String as a response
  res.send(
    `Thanks for your order. You ordered ${numTacos} ${protein} 🌮 tacos.`
  ); // this method lets us send back a string as response
});

//POST request
// app.post()

// --------------------------------
// 🚀 LEVEL 1 CHALLENGES
// --------------------------------

// 1. 🏆 Add a /goodbye endpoint that responds with "Goodbye, see you later!"
app.get("/say-bye", (req, res) => {
  res.send("Goodbye, see you later!"); // this method lets us send back a String as response
});

// 2. 🏆 Add a /happy-birthday endpoint that responds with "Happy birthday!!!"
app.get("/happy-birthday", (req, res) => {
  res.send("Happy 🧁 birthday!!!"); // this method lets us send back a String as response
});

// --------------------------------
// 🚀 LEVEL 2 CHALLENGES — ADDING DYNAMIC PARAMETERS
// --------------------------------

// 1. 🏆 Add a /happy-birthday/:name endpoint says "Happy birthday, [name]!!!"

app.get("/happy-birthday/:name", (req, res) => {
  const name = req.params.name;
  // res.send() lets us send back a String as response
  res.send(`Happy 🧁 birthday  ${name}!!!`);
});

// 2. 🏆 Add a /say-hello/:name/:language endpoint that says hello in multiple languages. Examples:
app.get("/say-hello/:name/:language", (req, res) => {
  const name = req.params.name;
  const language = req.params.language;
  switch (language) {
    //      - If language = "English", respond with "Hello, [name]!"
    case "English":
      res.send(`Hello ${name}!`);
      break;
    //      - If language = "Spanish", respond with "Hola, [name]!"
    case "Spanish":
      res.send(`Hola ${name}!`);
      break;
    //      - If language = "Vietnamese", respond with "Xin chao, [name]!"
    case "Vietnamese":
      res.send(`Xin chao, ${name}!`);
      break;
    //      - If language = "Turkish", respond with "Merhaba, [name]!"
    case "Turkish":
      res.send(`Merhaba, ${name}!`);
      break;
    //      - Add as many languages as you want!
    //      - Otherwise, respond with "Language not supported.""
    default:
      res.send("Language not supported.");
  }
});

// --------------------------------
// 🚀 LEVEL 3 CHALLENGES — EVEN MORE DYNAMIC PARAMETERS
// --------------------------------

// 1. 🏆 Add a /calculate-dog-years/:dogName/:humanYears endpoint that calculates a dog's age in dog years. Refer to your dogAgeCalculator.js file.

app.get("/calculate-dog-years/:dogName/:humanYears", (req, res) => {
  let dogName = req.params.dogName;
  let age = Number(req.params.humanYears);
  let dogAge = 0;
  if (age == 1) {
    dogAge = 15;
  } else if (age == 2) {
    dogAge = 15 + 9;
  } else if (age > 2) {
    let num = age - 2;
    let multipliedBy5 = num * 5;
    dogAge = 15 + 9 + multipliedBy5;
  }
  let message = `Your astro sign is ${age} in human years but  ${dogAge} in dog years.`;
  res.send(message);
});
// 2. 🏆 Add a /calculate-tip/:bill/:tipPercentage/:numGuests endpoint that calculates the amount each guests owes. Refer to your tipCalculator.js file.

app.get("/calculate-tip/:bill/:tipPercentage/:numGuests", (req, res) => {
  let bill = Number(req.params.bill);
  let tipPercent = Number(req.params.tipPercentage);
  let numGuests = Number(req.params.numGuests);

  //we want to calculate 3 values : tip amount, total bill, and the total for each guest

  //calculating the tip amount
  let tipAmount = bill * tipPercent;
  console.log("tip amount : $", tipAmount);

  //total bill
  let totalBill = bill + tipAmount;
  console.log("total bill : $", totalBill);

  //total for each guest
  let totalForEachGuest = totalBill / numGuests;
  console.log("total for each guest : $", totalForEachGuest);

  let message = `Your total bill is  $${totalBill} . 
  Tip Ammount is $${tipAmount} & total for each guest is $${totalForEachGuest} .`;
  res.send(message);
});
// --------------------------------
// LEVEL 4 CHALLENGES — USING THE FILE SYSTEM MODULE
// --------------------------------

// 1. 🏆 Add a /get-birthstone/:month endpoint that tells the user the birthstone for the inputted month using the fs module.
// Use the birthstones-data.json file in this folder.
app.get("/get-birthstone/:month", async (req, res) => {
  let month = req.params.month;
  let birthStone = await getBirthstone(month);
  console.log("app", birthStone);
  res.send(`Your birthstone is ${birthStone}`);
});

//Helper Function
const getBirthstone = async (month) => {
  const data = await fs.readFile("./birthstones-data.json", "utf-8");
  //Declare a variable named parsedData and store the parsed data in it converted using the JSON.parse method
  const parsedData = JSON.parse(data);
  let birthStone = parsedData[month];
  return birthStone;
};

// 2. 🏆 Add a /get-all-pizza-orders endpoint that responds with the array of pizza orders.
// Use the pizza-orders-data.json file in this folder.

//Helper Function
const readPizzaFile = async () => {
  const data = await fs.readFile("./pizza-orders-data.json", "utf-8");
  console.log("data : ", data);
  const parsedData = JSON.parse(data);
  console.log("parsed data : ", data);
  return parsedData;
};

app.get("/get-all-pizza-orders", async (req, res) => {
  const pizzaOrders = await getAllPizzaOrders();
  console.log("app", pizzaOrders);
  res.send(`All pizza orders : ${pizzaOrders}`);
});

//Helper Function
const getAllPizzaOrders = async () => {
  const allOrders = await readPizzaFile();
  return allOrders;
};

// 3. 🏆 Add a /get-one-pizza-order/:index endpoint that responds with the specified pizza order.

app.get("/get-one-pizza-order/:index", async (req, res) => {
  let index = req.params.index;
  const pizzaOrder = await getOneOrder(index);
  console.log("app", pizzaOrder);
  res.send(`Pizza order ${index} : ${pizzaOrder}`);
});

//Helper Function
const getOneOrder = async (index) => {
  const allOrders = await readPizzaFile();
  let pizzaOrder = allOrders[index];
  return pizzaOrder;
};

// Nov. 04/2025 POST PRACTICE

//Helper Function
const addOneOrder = async (orderDetail) => {
  let allOrders = await readPizzaFile();
  console.log(typeof allOrders);
  allOrders.push(orderDetail);
  let stringifiedOrders = JSON.stringify(allOrders);

  //write the new data to the file  //Reference : https://www.geeksforgeeks.org/node-js/node-js-fs-writefile-method/
  fs.writeFile(
    "./pizza-orders-data.json",
    stringifiedOrders,
    "utf-8",
    (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return;
      }
      console.log("File written successfully!");
    }
  );
};

//add one order
app.post("/add-one-order/:orderDetail", async (req, res) => {
  let orderDetail = req.params.orderDetail;
  await addOneOrder(orderDetail);
  res.send(`${orderDetail} added successfully`);
});

//update one order
const updateOneOrder = async (index, newOrder) => {
  //get all orders
  let allOrders = await readPizzaFile();
  //add new order at index
  allOrders[index] = newOrder;
  let stringifiedOrders = JSON.stringify(allOrders);

  //write the new data to the file  //Reference : https://www.geeksforgeeks.org/node-js/node-js-fs-writefile-method/
  fs.writeFile(
    "./pizza-orders-data.json",
    stringifiedOrders,
    "utf-8",
    (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return;
      }
      console.log("File written successfully!");
    }
  );
};

app.post("/update-one-order/:index/:newOrder", async (req, res) => {
  let index = req.params.index;
  let newOrder = req.params.newOrder;
  await updateOneOrder(index, newOrder);
  res.send(`Order updated successfully`);
});
// --------------------------------
// 🚀 LEVEL 5 CHALLENGES — USING THIRD-PARTY MODULES
// --------------------------------

// 1. 🏆 Add a /is-leap-year/:year endpoint that responds with whether the specified year is a leap year. Use the moment third-party node module and refer to your leap-year.js file.
app.get("/is-leap-year/:year", (req, res) => {
  let year = Number(req.params.year);
  //console.log(typeof year, year);
  const message = findLeapYear(year);
  // res.send() lets us send back a String as response
  res.send(message);
});

//Helper Function
const findLeapYear = (year) => {
  // save result in a vraiable named result and use moment to find if year is leap
  let result = moment([year]).isLeapYear();
  let message = result
    ? `${year} is a leap year`
    : `${year} is not a leap year`;
  return message;
};
// 2. 🏆 Add a /get-signs/:month/:day/:year endpoint that responds with the user's astrological and zodiac signs based on their inputted birthday. Use the horoscope third-party node module and refer to your sign-finder.js file.

app.get("/get-signs/:month/:day/:year", (req, res) => {
  let month = Number(req.params.month);
  let day = Number(req.params.day);
  let year = Number(req.params.year);
  let message = findZodiacAndAstro(month, day, year);
  res.send(message);
});

//Helper Function
const findZodiacAndAstro = (month, day, year) => {
  let zodiac = getZodiac(year);
  let sign = getSign({ month: month, day: day });
  let message = `Your astro sign is ${sign} and your zodiac sign is ${zodiac}.`;
  return message;
};

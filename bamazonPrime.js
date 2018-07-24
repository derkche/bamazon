var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function(err){
    if (err) throw err;
    console.log("Connected as ID: " + connection.threadId);
    // run functions here
    startProgram();
});

function startProgram(){
    connection.query("SELECT * FROM products", function(err, res){
        // console.log(res);
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }
        console.log("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
        console.log("What would you like to purchase today?");
        runDialogue();
    });
}

function runDialogue(){
    inquirer.prompt([
        {
            name: "chosenId",
            type: "rawinput",
            message: "Please select your product via its ID number!"
        },
        {
            name: "chosenQuantity",
            type: "rawinput",
            message: "How many would you like?"
        }
    ]).then(function(inqResponse){

        // console.log(inqResponse);
        // console.log("Chosen Product Id: "+inqResponse.chosenId); 
        // console.log("Chosen Product Quantity: "+inqResponse.chosenQuantity);
        var chosenID = inqResponse.chosenId;
        var chosenQuantity = inqResponse.chosenQuantity;
        // console.log("var chosenID: "+chosenID); 
        // console.log("var chosenQuantity: "+chosenQuantity);


        connection.query("SELECT * FROM products WHERE item_id = "+chosenID+"", function(err, itemCheck){
            
            // console.log("In-Stock Quantity: " + itemCheck[0].stock_quantity);
            var stockQuantity = itemCheck[0].stock_quantity;
            // console.log("var stockQuantity: "+stockQuantity);

            if(chosenID === "6"){
                console.log("Sorry, that item hasn't been released yet...");
                console.log("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
                startProgram();
            }else if (chosenQuantity > stockQuantity){

                console.log("Sorry, we dont have enough in stock to complete your order :(");
                console.log("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
                startProgram();

            }else if (chosenQuantity <= stockQuantity) {

                console.log("Fetching your order now...");

                var updateQuantity = stockQuantity - chosenQuantity;
                // console.log("Pending Database Quantity " + updateQuantity);

                connection.query("UPDATE products Set stock_quantity = "+ updateQuantity +" WHERE item_id = "+ chosenID +"", function(err, update){
                    if (err) throw err;
                    // console.log(update);
                    // console.log("Database Message: "+update.message);
                    // console.log("Database Message: Affected Rows:"+update.affectedRows);
                    if (update.affectedRows>0){

                        // console.log("Database update was successful");
                        // console.log("Item Price: "+itemCheck[0].price);
                        console.log(itemCheck[0].product_name);
                        console.log("Your total for this transaction is $"+itemCheck[0].price*chosenQuantity);
                        console.log("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");

                        'use strict';
                        inquirer.prompt([{
                            name: 'shoporquit',
                            type: 'list',
                            message: 'Is that all for today?',
                            choices: ["Keep shopping", "Sign Off"]
                        }]).then(function(followupInq){
                            if(followupInq.shoporquit = "Keep shopping"){
                                startProgram();
                            }else if (followupInq.shoporquit = "Sign Off"){
                                process.exit();
                            }
                        });

                    };
                });
            };
        });
    });
};
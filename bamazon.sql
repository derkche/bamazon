DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50),
    department_name VARCHAR(50),
    price DECIMAL(30,2),
    stock_quantity INT(50),
    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Exploding Kittens Card Game", "Toys and Games", 19.99, 37), ("What Do You Meme?", "Toys and Games", 29.99, 54), ("Champion Men's Long Shorts", "Clothing", 12.50, 60), ("Instant Pot Duo Mini Pressure Cooker", "Home and Kitchen", 79.99, 33), ("Nintendo Switch", "Video Games", 299.95, 574), ("Super Smash Bros.", "Video Games", 59.99, 0), ("Pokemon: Lets Go, Pikachu!", "Video Games", 59.99, 304), ("Nike Performance Crew Sock", "Sports and Outdoors", 20.00, 5001), ("RXBAR Whole Food Protein Bar", "Grocery", 20.39, 760), ("Dell Desktop Computer Package with WiFi, Dual Core 2.0GHz, 80GB, 2GB, Windows 10 Professional, 17inch Monitor (Certified Refurbished)", "Electronics", 134.97, 32);
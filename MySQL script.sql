CREATE TABLE locations (
	location_id INT AUTO_INCREMENT,
	longitude FLOAT,
	latitude FLOAT,
    PRIMARY KEY(location_id));
    
CREATE TABLE events (
	event_id INT AUTO_INCREMENT PRIMARY KEY, 
	event_name VARCHAR(100) NOT NULL, 
	event_description VARCHAR(500) NOT NULL, 
	adult_price DECIMAL, 
	child_price DECIMAL,
	available_tickets INT,
    location_id INT,
	FOREIGN KEY (location_id) REFERENCES locations(location_id));
    
CREATE TABLE customers (
	customer_id INT AUTO_INCREMENT PRIMARY KEY, 
	first_name VARCHAR(100), 
	surname VARCHAR(200),
	email VARCHAR(255),
	address_streetname VARCHAR(255), 
	address_house_number VARCHAR(10), 
	address_city VARCHAR(255), 
	address_zipcode VARCHAR(10));
    
CREATE TABLE users (
	user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR (100) NOT NULL,
    password VARCHAR (100) NOT NULL,
    customer_id INT,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id));
    
CREATE TABLE orders (
	order_id INT AUTO_INCREMENT PRIMARY KEY, 
	customer_id INT,
	event_id INT,
	date DATE,
	total_price DECIMAL,
	total_tickets DECIMAL,
	FOREIGN KEY (customer_id) REFERENCES customers(customer_id), 
	FOREIGN KEY (event_id) REFERENCES events(event_id));
    
CREATE TABLE discount_information (
	discount_id INT AUTO_INCREMENT PRIMARY KEY, 
	minimum_adults INT, 
	minimum_children INT, 
	discount_percentage DECIMAL,
	start DATE NOT NULL,
	end DATE);
    
CREATE TABLE discounts (
	discount_id INT,
	event_id INT,
	PRIMARY KEY(discount_id, event_id), 
	FOREIGN KEY(discount_id) REFERENCES discount_information(discount_id), 
	FOREIGN KEY(event_id) REFERENCES events(event_id));
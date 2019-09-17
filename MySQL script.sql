CREATE TABLE locations (
	location_id INT AUTO_INCREMENT,
	longitude FLOAT,
	latitude FLOAT,
    PRIMARY KEY(location_id));
    
CREATE TABLE events (
	event_id INT AUTO_INCREMENT PRIMARY KEY, 
	event_name VARCHAR(100) NOT NULL, 
	event_description VARCHAR(500) NOT NULL, 
	adult_price DECIMAL(65,2), 
	child_price DECIMAL(65,2),
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
	total_price DECIMAL(65,2),
	total_tickets DECIMAL(65,2),
	FOREIGN KEY (customer_id) REFERENCES customers(customer_id), 
	FOREIGN KEY (event_id) REFERENCES events(event_id));
    
CREATE TABLE discount_information (
	discount_id INT AUTO_INCREMENT PRIMARY KEY, 
	minimum_adults INT, 
	minimum_children INT, 
	discount_percentage DECIMAL(65,2),
	start DATE NOT NULL,
	end DATE);
    
CREATE TABLE discounts (
	discount_id INT,
	event_id INT,
	PRIMARY KEY(discount_id, event_id), 
	FOREIGN KEY(discount_id) REFERENCES discount_information(discount_id), 
	FOREIGN KEY(event_id) REFERENCES events(event_id));
    
INSERT INTO locations (longitude, latitude)	VALUES 
	(5.043689, 51.649718), 
	(4.299619900000039, 52.0994779), 
	(4.299619900000039, 52.0994779),
	(5.766986, 52.438554), 
	(4.383922, 52.147433), 
	(6.563149500000009, 52.6249522), 
	(4.352633, 52.052608);
    
INSERT INTO events (event_name, event_description, adult_price, child_price, available_tickets, location_id) VALUES
	('De Efteling', 'The Dutch fairy tale themed park. In high demand!', 32, 32, 1, 1),
    ('Madurodam', 'The smallest theme park in the Netherlands.', 25, 20, 5, 2),
    ('Toverland', 'Experience magic and wonder.', 30, 30, 3, 3),
    ('Walibi Holland', 'Need an adrenaline rush?', 37, 37, 20, 4),
    ('Duinrell', 'From the Kikkerbaan to the Tikibad.', 22, 19, 20, 5),
    ('Slagharen', 'Fun for the whole family in a truly Western style.', 28, 20, 2, 6),
    ('Drievliet', 'Come and experience our wonderful attractions.', 26, 24, 0, 7);
    
INSERT INTO discount_information (minimum_adults, minimum_children, discount_percentage, start, end) VALUES
	(2, 1, 15, '2019-09-11', NULL),
    (1, 2, 25, '2019-09-11', NULL), 
    (2, 1, 15, '2019-09-11', NULL), 
    (2, 2, 33, '2019-09-11', NULL), 
    (4, 0, 10, '2019-09-11', NULL), 
    (1, 3, 7, '2019-09-11', NULL), 
    (2, 2, 50, '2019-09-11', NULL);

INSERT INTO discounts (discount_id, event_id) VALUES
	(1,1),
    (2,2),
    (3,3),
    (4,4),
    (5,5),
    (6,6),
    (7,7);

SELECT locations.longitude FROM locations JOIN events ON locations.location_id=events.location_id WHERE events.event_name = 'De Efteling';

SELECT minimum_adults FROM discounts 
	INNER JOIN discount_information ON discounts.discount_id=discount_information.discount_id 
	INNER JOIN events ON discounts.event_id=events.event_id
    WHERE events.event_name = 'Duinrell';
# Installation

```bash
#npm will install all the dependencies
$ npm install
```
## Initiates the build process for the project

```bash
$ npm run build

```
## Running the app

```bash

# development
$ npm run local


#Framework Used 
$ npm install express
```

```bash
## MongoDB Usage

The Bookstore Application utilizes MongoDB as its database solution. MongoDB was chosen for the following reasons:

1. Flexible Schema: MongoDB's document-based data model allows for flexible schemas, accommodating variations in book attributes such as authors, titles, descriptions, and prices.

2. Scalability : MongoDB is designed to scale horizontally, making it suitable for applications with growing data volumes and user bases. As the bookstore application expands, MongoDB's scalability ensures that the database can handle increased loads without sacrificing performance.

3. Performance: MongoDB's indexing capabilities and support for complex queries enable efficient data retrieval and manipulation operations, ensuring a responsive user experience for browsing and searching books.

4. Native JavaScript Support**: MongoDB aligns well with JavaScript and Node.js, the technologies used in the backend of the application. This native support simplifies data access and manipulation, enhancing developer productivity.

```
```bash
## Mechanism for sending email notifications.
The application uses the nodemailer service for sending emails,Nodemailer is a popular module for Node.js that allows you to send email messages easily. it uses the various transport methods such as SMTP, sendmail, or a transport plugin.
In the application i have used the transport methos which is SMTP that runs on port 587, it also uses the Transport Layer security to make sure the privacy and integrity of the communication,TLS often used to encrpyt the communication between email service and client.

$ npm install nodemailer

##background job or a message queue to handle email notifications asynchronously.
1. To handle email notifications asynchronously in the background, RabbitMQ is utilized as a message broker.
2. The system consists of producers and consumers, as well as a queue for message passing.
3 .Producer is responsible for pushing purchase data into the queue.
4. Consumers retrieve data from the queue and handle email dispatching operations, ensuring that email sending processes occur independently without impacting other system functionalities.

##feature for sending bulk email notifications to all the retail users about new book releases..
1. for this feature i ahve used the node cron library ehich allows us to shedule the task.
2. A cron job is configured to run every minute for a duration of one hour.
3. During each execution, the system checks for any new book entries in the book collection.
4. If new books are found, an email notification is sent to all users using Nodemailer, informing them about the new additions.

```

```bash
##Explain the logic for computing sellCount.
1. Initially when book is added at that time sellcount of the book is zero 
2. When a user adds the book to their cart for purchase, the system retrieves the details of the book using its unique bookId from the book collection. (MongoDB is used for storing book details.)
3. Upon successfully finding the book details, the sellCount of that book is incremented by one to reflect the purchase.


```
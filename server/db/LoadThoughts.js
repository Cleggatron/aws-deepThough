const AWS = require("aws-sdk");
const fs = require("fs");

//add our interface to dynamo db
AWS.config.update({
    region: "us-east-2"
  });

//DocumentClient() lets us use javascript objects as arguements and returns javascript
const dynamodb = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
//read in our seed data
console.log("Importing thoughts into DynamoDB. Please wait.");
const allUsers = JSON.parse(fs.readFileSync('./server/seed/users.json', 'utf8'));

allUsers.forEach(user => {
    const params = {
        TableName: "Thoughts",
        Item: {
            "username": user.username,
            "createdAt": user.createdAt,
            "thought": user.thought
        },
    }

    dynamodb.put(params, (err, data) => {
        if(err){
            console.error("Unable to add thought", user.username, ". Error JSON:", JSON.stringify(err, null, 2))
        } else{
            console.log("PutItem suceeded:", user.username);
        }
    });
});
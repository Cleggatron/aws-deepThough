//import aws sdk
const AWS = require("aws-sdk");

//update our config. local host requires dynamo db working in other terminal
AWS.config.update({
    region: "us-east-2"
});

//create dynamo db
const dynamodb =  new AWS.DynamoDB({apiVersion: "2012-08-10"});

//key schema for table
const params = {
    TableName : "Thoughts",
    KeySchema: [       
      { AttributeName: "username", KeyType: "HASH"},  // Partition key
      { AttributeName: "createdAt", KeyType: "RANGE" }  // Sort key
    ],
    AttributeDefinitions: [       
      { AttributeName: "username", AttributeType: "S" },
      { AttributeName: "createdAt", AttributeType: "N" }
    ],
    ProvisionedThroughput: {       
      ReadCapacityUnits: 10, 
      WriteCapacityUnits: 10
    }
};

//create our table
dynamodb.createTable(params, (err, data) => {
    if(err){
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2))
    } else{
        console.log("Created table. Table Description JSON:", JSON.stringify(data, null, 2));
    }
})
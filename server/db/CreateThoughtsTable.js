const AWS = require("aws-sdk");

AWS.config.update({
    region: "us-east-2",
    endpoint: "http://localhost:8000"
});

const dynamodb =  new AWS.DynamoDB({apiVersion: "2012-08-10"});

const params = {
    TableName: "Thoughts",
    KeySchema: [
        {AttributeName: "username", KeyType: "HASH"}, //partition key
        {AttributeName: "createdAt", KeyType: "RANGE"} //sort key
    ],
    AttributeDefinitions: [
        {AttributeName: "username", AttrbuteType: "S"},
        {AttributeName: "createdAt", AttrbuteType: "N"},
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};
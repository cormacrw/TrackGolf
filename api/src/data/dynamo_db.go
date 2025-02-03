package data

import (
	"fmt"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
)

const AWS_REGION = "us-east-1"
const TABLE_NAME = "trackgolf-ddb-dev"

func GetDynamoDBClient() (*dynamodb.DynamoDB, error) {

	sess, err := session.NewSession(&aws.Config{
		Region: aws.String(AWS_REGION),
	})

	if err != nil {
		return nil, fmt.Errorf("error creating dynamodb session: %v", err)
	}

	svc := dynamodb.New(sess)

	return svc, nil
}

func GetItem(client *dynamodb.DynamoDB, pk string, sk string) (map[string]*dynamodb.AttributeValue, error) {

	result, err := client.GetItem(&dynamodb.GetItemInput{
		TableName: aws.String(TABLE_NAME),
		Key: map[string]*dynamodb.AttributeValue{
			"tu_pk": {S: aws.String(pk)},
			"tu_sk": {S: aws.String(sk)},
		},
	})

	if err != nil {
		return nil, fmt.Errorf("error creating dynamodb session: %v", err)
	}

	return result.Item, nil

}

func PutItem(client *dynamodb.DynamoDB, item interface{}) error {
	inputItem, err := dynamodbattribute.MarshalMap(item)

	if err != nil {
		return fmt.Errorf("error serializing struct: %v", err)
	}

	_, err = client.PutItem(&dynamodb.PutItemInput{
		TableName: aws.String(TABLE_NAME),
		Item:      inputItem,
	})

	if err != nil {
		return fmt.Errorf("error putting item to dynamodb table: %v", err)
	}

	return nil
}

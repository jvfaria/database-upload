# database-upload
Challenge #6 GoStack course level02. Database Upload.

## CHALENGE COMPLETED ✔

###### Running the challenge and how it Works

This is a challenge from the goStack course i am doing that consists in :


This will be an application that should store incoming and outcoming financial transactions and allow the registration and listing of those transactions, in addition to allowing the creation of new records in the database by sending a csv file using TypeORM and file sending with Multer!

After pulling this repository, run ```yarn``` to install all the dependencies.
To check if everything is running like it should, run the tests with the command: ```yarn test``` .

## Specifying the tests : 
```should be able to create a new transaction```: For this test to pass, your application must allow a transaction to be created, and return a json with the created transaction.

```should create tags when inserting new transactions```: For this test to pass, your application must allow that when creating a new transaction with a category that does not exist, it is created and inserted in the category_id field of the transaction with the id that was just created.

```should not create tags when they already exists```: In order for this test to pass, your application must allow when creating a new transaction with a category that already exists, to be assigned to the category_id field of the transaction with the id of that existing category, not allowing the creation of categories with the same title.

```should be able to list the transactions```: For this test to pass, your application must allow an array of objects containing all transactions to be returned together with the balance of income, outcome and total transactions that have been created so far.

```should not be able to create outcome transaction without a valid balance```: In order for this test to pass, your application must not allow an outcome type transaction to exceed the total amount the user has in cash (total income), returning a response with HTTP 400 code and an error message in the following format: {error: string}.

```should be able to delete a transaction```: In order for this test to pass, you must allow your delete route to delete a transaction, and when deleting, it returns an empty response, with status 204.

```should be able to import transactions```: For this test to pass, your application must allow a csv file, containing the following model, to be imported. With the imported file, you must allow all records and categories that were present in that file to be created in the database, and return all transactions that were imported.

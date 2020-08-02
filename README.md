# database-upload
Challenge #6 GoStack course level02. Database Upload.

## CHALENGE COMPLETED ✔

###### Running the challenge and how it Works

This is a challenge from the goStack course i am doing that consists in :


This will be an application that should store incoming and outcoming financial transactions and allow the registration and listing of those transactions, in addition to allowing the creation of new records in the database by sending a csv file using TypeORM and file sending with Multer!

After pulling this repository, run ```yarn``` to install all the dependencies.
To check if everything is running like it should, run the tests with the command: ```yarn test``` .

## Specifying the tests : 
```should be able to create a new repository ```: In order for this test to pass, your application must allow a repository to be created, and return a json with the created project.

```should be able to list the repositories```: In order for this test to pass, your application must allow an array to be returned with all the repositories that have been created so far.

```should be able to update repository```: In order for this test to pass, your application must allow only the url, title and techs fields to be changed.
```should not be able to update a repository that does not exist```: In order for this test to pass, you must validate in your update route whether the repository id sent by the url exists or not. If not, return an error with status 400.

```should not be able to update repository likes manually```: In order for this test to pass, you must not allow your update route to directly change the likes of this repository, maintaining the same number of likes that the repository already had before the update. That's because the only place that should update this information is the route responsible for increasing the number of likes.

```should be able to delete the repository```: In order for this test to pass, you must allow your delete route to delete a project, and when you delete it, it returns an empty response, with status 204.
```should not be able to delete a repository that does not exist```: Para que esse teste passe, você deve validar na sua rota de delete se o id do repositório enviado pela url existe ou não. Caso não exista, retornar um erro com status 400.

```should be able to give a like to the repository```: In order for this test to pass, your application must allow a repository with the given id to receive likes. The value of likes must be increased by 1 for each request, and as a result, return a json containing the repository with the number of likes updated.

```should not be able to like a repository that does not exist```: In order for this test to pass, you must validate on your like route whether the repository id sent by the url exists or not. If not, return an error with status 400.

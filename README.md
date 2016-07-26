/*
Date: 2016-07-26
Creator: shuchengc
 */
 
Descritpion:

This is a movie reviews restful api by using node.js,express and mongodb.
all the APIs are tested by postman.

Functionality:
1. get all reviews: GET /api/reviews
2. get one reviews: GET /api/reviews/id
3. create a new review: POST /api/reviews  //body data: username,content
4. update a review: PUT /api/reviews/id  //body data: username,content
5. delete a review: DELETE /api/reviews/id 
6. sign up a user: POST /api/signup	//body data: username,password
* I add the extra authentication for the delete operation, need to include the 	user and password

Data Models:
1.review
username:owner of review
content: review content
createdAt: the created datetime
updatedAt: the updated datetime
2.user
username: user name
password: user password

Folds:
1. server.js: index file
2. app/models: data model files
3. app/controllers: user authentication logic
4. fakeReviewsData.js: fake some reviews

Implementation:
1. local mongodb
2. $npm install
3. $node fakeReviewsData.js  // insert some fake reviews into the mongodb
4. $grunt




#dseHelper Documentation ---Tech Spec Li Xi

##API Reference
###Usage

###Private API Calls
- POST REQUESTS ONLY
- Syntax

        POST(APILocation,{
        JSON:1,
        action:'',
        param1:'',
        param2:'',...
        });

- FROM LOCALHOSTS ONLY
- API Location: http://exam.lixiapps.com/api/api
- All response are JSON Encoded
- All requests except 'login' and 'signup' require a valid login


###Public API Calls
- **HTTP GET REQUESTS ONLY**
- *public:true* parameter is needed
- All responses are JSON Encoded


##Available Options

##Private API Calls
###action: 'login'

**user**: User Name
**password**: Password

**Return**: on success BOOLEAN(TRUE) is returned, else BOOLEAN(FALSE)

###action: 'user_profile'

**NOTE:** This action will use the PHP SESSION variable and hence does not require any parameter.
**Return values:**
*Object:* 

	{user:,email:,id:}

###action: 'logout'

**Return value:** int(1)

###action: 'insert_comment'
**Parameters:** 

	comment1,comment2,comment3,comment4,rating1,rating2,rating3,rating4, id (Question ID, see topic_database for information on ID)

**Return Values:** true upon success, and false upon SQL failure


##Public API Calls

###action:'get_questions'

This call returns all the questions in the database.

**Return Values:**

	{
		year : [{id,question, question_year, rating, comment,speaker},...],
		year : ...
	}

###action: 'get_question_by_id'

**id:** The ID of the question

**Return values:**

	{
		question,speaker,speaker_profile,youtube_link,youtube_width,youtube_height,comment,rating,mp3_url
	}




##Databse management

###Credentials
- HIDDEN

###List of Databases
- user_list
- contact
- topic_database

####topic_database
####Structure
| Name of column  |   Datatype    |   Intended usage  |
|   :------: |  :-----:     |   :------:    |
| question_year| text | The year in which the question is asked. This is used to sort the questions according to the years|
|question|longtext|The actual question|
|speaker|longtext|JSON String of the names of the **FOUR** speakers: [speaker1,speaker2,speaker3,speaker4]|
|speaker_profile|longtext|JSON String of the profiles of the **FOUR** speakers: [profile1,profile2,profile3,profile4]|
|youtube_link|text|The embed link used in the **display.php** page|
|youtube_width|int|To preserve aspect ratio|
|youtube_height|int|To preserve aspect ratio|
|answer_date|*text*|The date on which this answer is posted|
|comment|longtext|This **MUST BE A JSON STRING ARRAY** that contains the following: <br> - username of the user posted the comment <br> - the actual comment <br> Convention: <br>array(array('user' => text , 'comment' => [comment1,comment2,comment3,comment4]))|
|rating|longtext|This **MUST BE A JSON STRING ARRAY** as well. This may contain the following: <br>- username of the user giving the rating<br>- the rating given<br> Convention: <br>array(array('user' => text , 'rating' => [rating1,rating2,rating3,rating4]))|
|mp3_url	| text 	| This is a part of te URL to the MP3 recording of the particular file. This needs to be collision free. Hence, each file name is appended with a random number. This is the **filename** only, and not the actual URL. All MP3 files are located at /api/mp3/|


####user_list
#####NOTE
15 June, 2015
Facebook login is enabled. Three columns were added: fb_account (BOOLEAN), fb_id (TEXT), fb_api_response_json (LONGTEXT)
Sample fb_api_response_json

    {"id":"914145101961736","email":"lixi@mensa.org.sg","first_name":"Einsteinly","gender":"male","last_name":"Xi","link":"https://www.facebook.com/app_scoped_user_id/914145101961736/","locale":"en_GB","name":"Einsteinly Xi","timezone":8,"updated_time":"2014-03-30T04:21:53+0000","verified":true}

Data available in the api call of '/me' using Facebook Javascript SDK:

- id
- email
- first_name
- gender
- last_name
- link (to profile)
- locale
- name (full name, this will be used as the user name. If there is a conflict, the Facebook ID will be used instead)
- timezone
- updated_time
- verified






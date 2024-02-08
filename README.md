# FED_Assignment2

Project's CarParkXD

The CarparkXD is a website designed to help individuals to find a carpark based on their desired location efficiently. The website aims to provide real-time data on available parking spaces, weather and other relevant details to enhance the overall parking experience for individuals.

Design Process

The website aim to help driver who are looking for carpark . they can do a search based on the location that they want. it will show all the list of carpark in the provided location then there is a more detail button which will bring them to a new page(CarparkInfo page) and show info of the carpark
there is a weather page which will show the weather forecaast of location
there is a login and register page
when user login they have additional features such as add to favourite location which will show in favourite page
wireframes:
https://www.figma.com/file/BmRdvrA40WmUUPSZj3tCbc/Untitled?type=design&node-id=0-1&mode=design&t=l6GITSLCkbDJfyYM-0

Features
Existing Features
basic feature login and register

Search by Location – Users can input their desired location and the system will display a list of carparks based on the provided location.

add to favourite - user can add their favourite location which will be stored in RestDB , and they can view their favourite location in favourite page by retrieving it from RestDB.

hide and show the favourite page -hide the favourite page when user are not login . when user are login then it will show the favourite page

In addition, you may also use this section to discuss plans for additional features to be implemented in the future:

Features Left to Implement
navigation of map – When user click the location will bring user to google map

Technologies Used
use fetch method to get the api & RestDB
API:
https://api.data.gov.sg/v1/environment/2-hour-weather-forecast
https://api.data.gov.sg/v1/transport/carpark-availability
RestDB:
https://fed23-25a3.restdb.io/rest/account
https://fed23-25a3.restdb.io/rest/carpark

use of local storage to store the id of the user when login, is to check whether user have login in for later on and the carpark number as key and the csv carpark info as value, when user click on the more detail it use that carpark number to match the carpark number on the api for the carpark slot.
JQuery
The project uses JQuery to simplify DOM manipulation.

Testing

Try to search for a location and click on the more detail button make sure it show detail information of the carpark
or it will pop out an error message "data not found" because for some location the api don't have the data

There is bugs on RestDB when you call it too many time it will block you from it
can't access the data.

For favourite page some carpark data will show twice.

Credits
Content
The css for login and register page was copied from YouTube
https://youtu.be/hlwlM4a5rxg?si=Jt22RE3Dt1MWj9Vl
The table Css was copied from YouTube
https://youtu.be/Ay8BXbAmEYM?si=AHBUMUhYZgd4XZlG
Media
The photos background used in this site were obtained from google
Acknowledgements
I received inspiration for this project from My PRG1 Assignment

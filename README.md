
# Weather for a trip

The main concept of the project - plan several trips and see, what weather is waiting for you these days. Having this information in front of you provides a simple solution to know, what trip, in case of weather, is more suitable now, placing all needed infomration on one screen. 



## Demo
Website is online, being deployed on **Neflity**: https://regal-stroopwafel-4d594b.netlify.app/
## Process descriptoin
#### Backend
First two days of working on the project were concentreted on working with data on back-end. For back-end I used Firebase to save users, provide them simple Google logining and saving their data to Firebase DB. Other info about current weather and forecast was set up to be taken from visualcrossing weather API, where I simply passed user's trips, based on authed user information, retrived from the DB.
![image](https://github.com/Maxv1z/trip-forecast/assets/122612827/0df9bd64-f361-47a5-a6a1-e91e3d49dd08)

#### DB 
The way the DB is structured is simple: system saves added trip to general `trips` array in the db, passing all required information, but also including `userID`, which system gets from Googel authentication. In this case we minimaze the data in our DB and have a normilized data.
#### FrontEnd 
After being sure that I have basic back-end actions set up, I've started to do mock components, just the way it should be, but without passing any information from the db yet. In that process I faced small amount of issues I guesse, since I had similar way of development in my previous project (Microsoft Todo clone on redux). 
Further steps are not so interesing - working with jsx and css to place everything as design says and make that look good on different devices.

## Optimizations
To make search function better in case of optimization, I added some delay between user's typing process and search city function firing. Having small amount of trips and cities will not show any results, however having 100 and more trips in an array will be triggering a re-render everytime user types a sign, but obviously, we know that a user will not stop on first sign of search (at least), but we already trigger client side to work on it. Thinking about this and remembering some optimization patterns I studied, diving into `memo`, `useCallback`, `useMemo`, I've come up with an intereting (at least to me) idea to make a delay, after user stops typing, before passing new input value to search city function. Can see the code in `Search` component in folder `Components`.

## Ways to improve
#### City images
Currently the web-app doens't have any images for cities. It could be hard-coded, simply adding links or downloaded images, however that's not the real-life use-case. I tried another way, that, unfortunately, failed. I saw the ability to use another API, this time from Google, that provides photos of places based on its geolocation. To avoid hardcoding, I wanted to use that API passing location or even city names, however I couldn't register the account on their Developers platform. Later on, that can be another cool thing to add new API to the project
#### Full `tanstack-query` usage
Having functions to get everthing needed in app, in future I'll make the functions as custom hooks using `useQuery`, what will simplify the process of getting state of requests (pending, error, fullfiled), work with inavalidation and general code beauty. 

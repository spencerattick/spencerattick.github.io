const dotenv = require('dotenv');
require('dotenv').config();
const fs = require('fs');


//NEED TO MOVE THIS TO SERVER
//UNDEFINED VALUES ARE BEING STORED TO .ENV FILE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const checkIfStravaTokenIsExpired = (expirationTime) => {
    if (!expirationTime) {
      return true;
    }
    console.log('Checking if token is still valid...');
    const currentEpochTime = Math.floor(new Date().getTime() / 1000);
    return currentEpochTime > expirationTime;
}

const getNewStravaToken = async (cachedRefreshToken) => {
    const requestOptions = {
        method: 'POST',
        redirect: 'follow'
      };

    try {
        let response = await fetch(`https://www.strava.com/oauth/token?client_id=${process.env.STRAVA_CLIENT_ID}&client_secret=${process.env.STRAVA_CLIENT_SECRET}&grant_type=refresh_token&refresh_token=ReplaceWithRefreshToken&refresh_token=${cachedRefreshToken}`, requestOptions);
        response = await response.json();
        console.log('STRAVAAADATAAA: ', response)
        if (!response.ok) {
          console.log(`Response status is ${response.status}`);
          return 'error';
        }

        return {
            refreshToken: await response.refresh_token, 
            expirationTime: await response.expires_at,
            accessToken: await response.access_token
        }

    } catch (error) {
        console.log(error);
    }

}



const getDataFromStrava = async () => {
    console.log('Requesting activity data from Strava...');
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${process.env.STRAVA_CACHED_TOKEN}`);

    console.log('TOKENN', process.env.STRAVA_CACHED_TOKEN)
    console.log(`HEADERSS ${JSON.stringify(myHeaders)}`);


    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    console.log(`Request Options: ${JSON.stringify(requestOptions)}`);


    try {
        const response = await fetch("https://www.strava.com/api/v3/athlete/activities", requestOptions);
        console.log(`Request URL: ${response.url}`);
        return response.json();

    } catch (error) {
        console.log('error', error)
    }      
};

const manageRefreshToken = async () => {
  const isTokenExpired = checkIfStravaTokenIsExpired(process.env.STRAVA_EXPIRATION_TIME);
  if (isTokenExpired === 'error') {
    console.log('There was an error getting the refresh token!')
    return;
  } else if (isTokenExpired === true) {
    console.log("The token is still valid!");
  } else {
    // If the data is not in the cache, get it from the server and cache it
    console.log("The token has expired! Fetching a new one!");
    const newStravaData = await getNewStravaToken(process.env.STRAVA_CACHED_REFRESH_TOKEN);
    
    console.log('NEW STRAVA DATA: ', await newStravaData)

    //update the .env values
          //update the .env values
          const envBuffer = fs.readFileSync('.env');
          const envConfig = dotenv.parse(envBuffer);
          envConfig.STRAVA_EXPIRATION_TIME = newStravaData.expirationTime;
          envConfig.STRAVA_CACHED_REFRESH_TOKEN = newStravaData.cachedToken;
          envConfig.STRAVA_CACHED_TOKEN = newStravaData.cachedRefreshToken;
          const envText = Object.keys(envConfig).map((key) => `${key}=${envConfig[key]}`).join('\n');
          await fs.promises.writeFile('.env', envText);

  }
  getDataFromStrava()
  .then(data => console.log(data));
};
  
  // Use the getData function to fetch data from a URL
  manageRefreshToken();




// https://developers.strava.com/docs/getting-started/#account

// const { get } = require("http")

// get an API key

//CODE WILL NEED TO CHECK TO SEE IF TOKEN IS VALID
    //IF SO PROCEDE
    //IF NOT WILL NEED TO GENERATE A NEW ONE

    //USE THIS TO CACHE: https://medium.com/@spencer.attick/a-guide-to-immediately-invoked-function-expressions-iife-17f6e29a07ba

    //should be able to refresh like this: https://developers.strava.com/docs/authentication/#refreshingexpiredaccesstokens:~:text=curl%20%2DX%20POST%20https%3A//www.strava.com/api/v3/oauth/token%20%5C%0A%20%20%2Dd%20client_id%3DReplaceWithClientID%20%5C%0A%20%20%2Dd%20client_secret%3DReplaceWithClientSecret%20%5C%0A%20%20%2Dd%20grant_type%3Drefresh_token%20%5C%0A%20%20%2Dd%20refresh_token%3DReplaceWithRefreshToken


// FOLLOWING STEPS HERE: https://developers.strava.com/docs/getting-started/#oauth (this vid is pretty good: https://www.youtube.com/watch?v=sgscChKfGyg)


//AUTHORIZE IN THE UI TO GET THE CODE
// 1. http://www.strava.com/oauth/authorize?client_id=105494&response_type=code&redirect_uri=http://localhost/exchange_token&approval_prompt=force&scope=activity:read_all

// http://localhost/exchange_token?state=&code=1c49f418910a609b0097ae5ce0016c9b8141e8cd&scope=read,activity:read_all


//MAKE A REQUEST WITH POSTMAN TO GET THE ACCESS TOKEN
// 2. curl --location 'https://www.strava.com/oauth/token?client_id=105494&client_secret=aeca4b4832d195c467d23e1c465781eed04be76b&code=1c49f418910a609b0097ae5ce0016c9b8141e8cd&grant_type=authorization_code' \
// --header 'Content-Type: application/json' \

// {
//     "token_type": "Bearer",
//     "expires_at": 1681350948,
//     "expires_in": 21600,
//     "refresh_token": "25bd1cf38e37ee07e53d446f10ef812daee4d9bc",
//     "access_token": "87b070c5b099c8b17398cc3f6884e2645ccf222a",
//     "athlete": {
//         "id": 8470431,
//         "username": "sattick",
//         "resource_state": 2,
//         "firstname": "Spencer",
//         "lastname": "Attick",
//         "bio": null,
//         "city": "Oakland",
//         "state": "California",
//         "country": "United States",
//         "sex": null,
//         "premium": false,
//         "summit": false,
//         "created_at": "2015-04-01T00:46:54Z",
//         "updated_at": "2023-04-11T18:24:23Z",
//         "badge_type_id": 0,
//         "weight": 0.0,
//         "profile_medium": "https://graph.facebook.com/1226490129/picture?height=256&width=256",
//         "profile": "https://graph.facebook.com/1226490129/picture?height=256&width=256",
//         "friend": null,
//         "follower": null
//     }
// }

// USE THE ACCESS TOKEN AS THE BEARER TO MAKE A REQUEST (CANNOT HAVE A BODY FOR GET)
// 3. curl --location 'https://www.strava.com/api/v3/athlete/activities' \
// --header 'Authorization: Bearer 87b070c5b099c8b17398cc3f6884e2645ccf222a'

// THERE IS DATA RETURNED - IT WAS LONG AND TOO ANNOYING TO KEEP HERE
 
// 4. REFRESH TOKEN
// curl --location --request POST 'https://www.strava.com/oauth/token?client_id=105494&client_secret=aeca4b4832d195c467d23e1c465781eed04be76b&grant_type=refresh_token&refresh_token=ReplaceWithRefreshToken&refresh_token=25bd1cf38e37ee07e53d446f10ef812daee4d9bc'

// {
//     "token_type": "Bearer",
//     "access_token": "6e6e9dbf5c63983cf2cf018278a3dc1b3a0f129c",
//     "expires_at": 1681430228,
//     "expires_in": 21600,
//     "refresh_token": "25bd1cf38e37ee07e53d446f10ef812daee4d9bc"
// }
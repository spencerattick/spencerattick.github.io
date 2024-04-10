const dotenv = require('dotenv');
require('dotenv').config();
const fs = require('fs');

const isStravaTokenExpired = (currentExpirationTime) => {
    const currentEpochTime = Date.now();
    if (currentExpirationTime === 'undefined') {
        return `There is an error with the currentEpirationTime, it's value is: ${currentExpirationTime}.`
    }
    return currentEpochTime > currentExpirationTime;
}

const generateNewToken = async () => {
    const requestOptions = {
        method: 'POST',
        redirect: 'follow'
      };
    const requestURL = `https://www.strava.com/oauth/token?client_id=${process.env.STRAVA_CLIENT_ID}&client_secret=${process.env.STRAVA_CLIENT_SECRET}&grant_type=refresh_token&refresh_token=ReplaceWithRefreshToken&refresh_token=${process.env.STRAVA_CACHED_REFRESH_TOKEN}`;

    try {
        let response = await fetch(requestURL, requestOptions);
        response = await response.json(); 
        if (response.message === 'Bad Request') {
            return 'Something is wrong with the request to generate a new Strava token.';
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

const persistNewTokenData = async (newTokenData) => {
    const envBuffer = fs.readFileSync('.env');
    const envConfig = dotenv.parse(envBuffer);
    envConfig.STRAVA_EXPIRATION_TIME = newTokenData.expirationTime;
    envConfig.STRAVA_CACHED_REFRESH_TOKEN = newTokenData.refreshToken;
    envConfig.STRAVA_CACHED_TOKEN = newTokenData.accessToken;
    const envText = Object.keys(envConfig).map((key) => `${key}=${envConfig[key]}`).join('\n');
    await fs.promises.writeFile('.env', envText);
}

const getStravaActivityData = async () => {
    console.log('Requesting activity data from Strava...');
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${process.env.STRAVA_CACHED_TOKEN}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    try {
        const response = await fetch("https://www.strava.com/api/v3/athlete/activities", requestOptions);
        return response.json();

    } catch (error) {
        console.log('error', error)
    }   
}

//check to see if the expiration time has passed
const executeStravaLogic = (async () => {
    const isTokenExpired = isStravaTokenExpired(process.env.STRAVA_EXPIRATION_TIME);

    if (typeof isTokenExpired === 'string') {
        console.log('Please resolve the error with the current expiration time stored in the .env file.');
        return;
    } else if (isTokenExpired) {
        console.log('The expiration time has passed. Generating a new token...');
        //if yes - generate a new token
        const newTokenData = await generateNewToken();
        if (!newTokenData.expirationTime) {
            console.log('There was an error getting refresh token data.')
            return;
        } 
        //save the new token info to .env
        persistNewTokenData(newTokenData);

    } 
    //make request to Strava activities endpoint
    const stravaActivityData = await getStravaActivityData();
    console.log(stravaActivityData[0]);
})();

//IMPORTANT FILEDS RETURNED FROM ACTIVITIES API:
//name
//distance
//moving_time
//type
//start_date
//average_speed
//max_speed


// {
//     resource_state: 2,
//     athlete: { id: 8470431, resource_state: 1 },
//     name: 'Afternoon Run',
//     distance: 4030,
//     moving_time: 1716,
//     elapsed_time: 1811,
//     total_elevation_gain: 4.4,
//     type: 'Run',
//     sport_type: 'Run',
//     workout_type: 0,
//     id: 8890903152,
//     start_date: '2023-04-14T19:01:08Z',
//     start_date_local: '2023-04-14T15:01:08Z',
//     timezone: '(GMT-05:00) America/New_York',
//     utc_offset: -14400,
//     location_city: null,
//     location_state: null,
//     location_country: 'United States',
//     achievement_count: 0,
//     kudos_count: 0,
//     comment_count: 0,
//     athlete_count: 1,
//     photo_count: 0,
//     map: {
//       id: 'a8890903152',
//       summary_polyline: 'mo{hFpc|sMSk@i@gA{AeE_BsD_@o@Mi@q@_BGGOIQYWSM[]g@CBDBEBD@@KB?[cAE[Ym@Uy@Ys@@_@CW?m@QsAA]@[LYGI?EHCJWFE\\CVIrAi@nB}@RET?FBHFHPTt@VhApA|DZnAf@|AzAzDVZDLNLVr@VZFLJHd@x@b@|@rBhHd@pAD`@?TGNMNi@\\mBp@iCt@]@WKMMKSgC_HSi@wAsCc@eAIc@SYOc@MMKMGEK[KGGKW]UKi@mAEW]gAOm@Qg@C_@OYMu@I[A[Ga@EaBH]?WJOTEBEBWDC\\DjBu@r@_@~@]VAJDNNHLx@pCHRHh@x@lDZ`AVl@h@~A^`A^l@d@j@LVV\\Rd@h@t@b@`AbBzFXv@V`AHp@AJIT',
//       resource_state: 2
//     },
//     trainer: false,
//     commute: false,
//     manual: false,
//     private: false,
//     visibility: 'everyone',
//     flagged: false,
//     gear_id: null,
//     start_latlng: [ 38.31864684820175, -76.82715729810297 ],
//     end_latlng: [ 38.31877291202545, -76.82764202356339 ],
//     average_speed: 2.348,
//     max_speed: 3.948,
//     has_heartrate: false,
//     heartrate_opt_out: false,
//     display_hide_heartrate_option: false,
//     elev_high: 6.9,
//     elev_low: 4.6,
//     upload_id: 9540098951,
//     upload_id_str: '9540098951',
//     external_id: '9E17EEF1-BC5D-44FC-B2FD-7C5FC7EB319E-activity.fit',
//     from_accepted_tag: false,
//     pr_count: 0,
//     total_photo_count: 0,
//     has_kudoed: false
//   }
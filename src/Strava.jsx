// https://developers.strava.com/docs/getting-started/#account

// get an API key




// FOLLOWING STEPS HERE: https://developers.strava.com/docs/getting-started/#oauth (this vid is pretty good: https://www.youtube.com/watch?v=sgscChKfGyg)


// 1. http://localhost/exchange_token?state=&code=62b8194da84fd2f4455851e52b26f49a1ca9991e&scope=read,read_all

// 2. curl --location --request POST 'https://www.strava.com/oauth/token?client_id=105494&client_secret=aeca4b4832d195c467d23e1c465781eed04be76b&code=62b8194da84fd2f4455851e52b26f49a1ca9991e&grant_type=authorization_code' \
// --header 'Authorization: Basic SXI5RjJySjRYWUhNRTNuYjJvSDhPYU5zaklNVlFmdzY6' \
// --data ''

// {
//     "token_type": "Bearer",
//     "expires_at": 1681258716,
//     "expires_in": 21600,
//     "refresh_token": "cc5a66ffbe22e42dac7aa175097485bffa03b123",
//     "access_token": "b6ddf246cde306a6520efaf8c8686ce0d95cdfab",
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
//         "sex": "M",
//         "premium": false,
//         "summit": false,
//         "created_at": "2015-04-01T00:46:54Z",
//         "updated_at": "2023-03-23T00:01:05Z",
//         "badge_type_id": 0,
//         "weight": 0.0,
//         "profile_medium": "https://graph.facebook.com/1226490129/picture?height=256&width=256",
//         "profile": "https://graph.facebook.com/1226490129/picture?height=256&width=256",
//         "friend": null,
//         "follower": null
//     }
// }

3. 
# TrackUT
App to track match statistics on EAFC 24

## App
The app uses React Native and is deployed on Android and iOS devices.

## Database

Database design:
```
User:
  PK: user:{id}
  SK: metadata:user

Match:
  PK: user:{id}
  SK: match:{id}

Player:
  PK: player:{id}
  SK: metadata:player
```

## Test user
cormac@cormac.is
Test123!@

bigal
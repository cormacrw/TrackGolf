# TrackGolf
App to track match statistics on PGA 2k25. TGC is great for competitive golf, but the analytics and statistics tracking leaves a lot to be desired. Having the ability to track your progress and see where you could improve would be very helpful.

## MVP Features
- [ ] Track Rounds
- [ ] See basic stats
- [ ] See basic stats over time
- [ ] Follow friends
- [ ] Compare stats
- [ ] Link to TGC

## App
The client side is written using Svelte, while the backend uses Node.js and express.

## Database

Database design:
```
User:
  PK: user:{id}
  SK: metadata:user

Round:
  PK: user:{id}
  SK: match:{id}

```

## CI/CD and Deployment

The app is deployed onto AWS s3. The backend is a serverless API.
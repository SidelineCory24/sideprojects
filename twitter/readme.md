## Overview
This script removes the hassle of having to login to twitter daily from your phone to tweet the same tweets.

The daily tweets are stored in a dictonary and are tweeted out every few minutes.

The sleep timer on **Line 56** can be changed to whatever time suits you best.
`time.sleep(480)`

This script also enables the ability to do adhoc tweets as well.

From the command line, enter "daily" for daily tweets or "adhoc" to make an adhoc tweet.

You will need to have a Twitter account to access the Twitter API.
[Twitter API Documentation](https://developer.twitter.com/en/docs/basics/getting-started)


### Build requirements:
1. Access to the Twitter API (generates keys and token)
2. tweepy module (pip install tweepy)

*This was written with Python version 3.8.2*



 

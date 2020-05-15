import tweepy
import time
import sys


consumer_key = ''
consumer_secret = ''
access_token = ''
access_secret = ''


def OAuth():
    try:
        oauth = tweepy.OAuthHandler(consumer_key, consumer_secret)
        oauth.set_access_token(access_token, access_secret)
        return oauth
    except Exception as e:
        return None


def tweet_api():
    oauth = OAuth()
    api = tweepy.API(oauth)
    return api


def tweets():
    daily = {'tweet1': "Insert tweet here.",
             'tweet2': "Insert tweet here.",
             'tweet3': "Insert tweet here.",
             }
    return daily


def adhoc_tweet():
    print('\nAd-hoc Tweet')
    api = tweet_api()
    tweet = input('What would you like to tweet?: ')

    print(f'Tweeting...\n{tweet}')
    api.update_status(tweet)
    print('Tweet complete.')


def daily_tweets(*tweets):
    print('\nDaily Tweets')
    api = tweet_api()
    count = 1

    for tweet in tweets:
        for t in tweet:
            if count != len(tweet):
                print(f'Tweeting Tweet #{count}: {t.capitalize()} Tweet')
                api.update_status(tweet[t])
                count += 1
                time.sleep(480)
            else:
                print(f'Tweeting Tweet #{count}: {t.capitalize()}')
                api.update_status(tweet[t])

    print('Tweets are complete.')


if __name__ == '__main__':

    while True:
        choice = input(
            'Do you want to do an "adhoc" tweet or the "daily" tweets?: ').lower()

        if choice == 'adhoc' or choice == 'ad-hoc':
            adhoc_tweet()
            break

        if choice == 'daily':
            daily = tweets()
            daily_tweets(daily)
            break

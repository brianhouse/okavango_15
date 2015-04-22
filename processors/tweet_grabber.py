#!/usr/bin/env python3

import geojson, json, random, time, os, datetime
from twython import Twython, TwythonError
from housepy import config, log, util, process, net

AUTH = config['twitter']['main']
ACCOUNTS = list(config['twitter']['accounts'].keys())
MEMBERS = list(config['twitter']['accounts'].values())
HASHTAG = config['twitter']['hashtag']


def main():

    """Grab tweets from main timeline and associated accounts with tags"""

    twitter = Twython(AUTH['app_key'], AUTH['app_secret'], AUTH['oauth_token'], AUTH['oauth_token_secret'])
    twitter.verify_credentials() ## what does this do if it fails?
    
    for a, account in enumerate(ACCOUNTS):
        log.info("Checking %s..." % account)
        try: 
            timeline = twitter.get_user_timeline(screen_name=account)
        except TwythonError as e:
            log.error(log.exc(e))
            continue        
        log.info("--> %s has %s total tweets" % (account, len(timeline)))
        for tweet in timeline:            
            text = tweet.get('text')
            if a == 0 or HASHTAG.lower() in text.lower():  # the first entry in the accounts is the official account -- all tweets are processed
                try:
                    data = {}
                    dt = datetime.datetime.strptime(tweet.get('created_at'), '%a %b %d %H:%M:%S +0000 %Y')
                    data['t_utc'] = util.timestamp(dt)
                    data['Member'] = MEMBERS[a]
                    data['Handle'] = account                    
                    data['Text'] = text
                    data['Retweet'] = text[:2] == "RT"
                    data['Url'] = "https://twitter.com/%s/status/%s" % (account, tweet.get('id'))
                    log.info("--> %s (RT: %s): %s" % (account, data['Retweet'], data['Text']))
                    url = "%s/ingest/tweet" % config['url']
                    log.info("Sending to %s..." % url)
                    response = net.read(url, str(json.dumps(data)).encode('utf-8'))
                    log.info("--> %s" % response)                                                        
                except Exception as e:
                    log.error(log.exc(e))
                    continue
            else:
                log.info("--> skipping unrelated tweet")


main()



import os
import requests
import random
from requests_oauthlib import OAuth1

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"

CONSUMER_KEY = os.environ.get("TWITTER_CONSUMER_KEY")
CONSUMER_SECRET = os.environ.get("TWITTER_CONSUMER_SECRET")
ACCESS_TOKEN = os.environ.get("TWITTER_ACCESS_TOKEN")
ACCESS_TOKEN_SECRET = os.environ.get("TWITTER_ACCESS_TOKEN_SECRET")

topics = [
    "Solana sniper bots efficiency and speed in 2026",
    "Maximizing crypto yields and liquidity on Raydium",
    "MEV protection strategies for Solana traders",
    "Why low-latency infrastructure matters for DEX trading",
    "Automated trading insights with Krypton Apex"
]

def generate_tweet():
    topic = random.choice(topics)
    prompt = f"Write a short, engaging crypto Twitter post (under 260 characters) about '{topic}', including a call to visit kryptonapex.com and relevant hashtags. No markdown formatting."
    
    payload = {"contents": [{"parts": [{"text": prompt}]}]}
    headers = {"Content-Type": "application/json"}
    
    try:
        response = requests.post(GEMINI_URL, headers=headers, json=payload)
        result = response.json()
        tweet_text = result['candidates'][0]['content']['parts'][0]['text'].strip()
        return tweet_text
    except Exception as e:
        print("Error generating tweet content:", e)
        return None

def post_to_twitter(text):
    url = "https://api.twitter.com/2/tweets"
    auth = OAuth1(CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
    payload = {"text": text}
    
    response = requests.post(url, json=payload, auth=auth)
    if response.status_code == 201:
        print("Tweet posted successfully!")
    else:
        print(f"Failed to post tweet: {response.status_code} - {response.text}")

if __name__ == "__main__":
    tweet = generate_tweet()
    if tweet:
        print(f"Generated Tweet: {tweet}")
        post_to_twitter(tweet)

import os
import requests
import time
import json
from datetime import datetime

API_KEY = os.environ.get("GEMINI_API_KEY")
URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={API_KEY}"

topics = [
    "Ultimate Guide to Solana Sniper Bots in 2026",
    "How AI is Changing Crypto Liquidity Sniping on Raydium",
    "Protecting Your Trades: MEV Shields on Solana",
    "Zero-Latency Trading: Why Speed Matters in Crypto",
    "Top Strategies for Institutional Trading on Pump.fun"
]

def generate_blog():
    topic = topics[int(time.time()) % len(topics)]
    date_str = datetime.now().strftime("%Y-%m-%d %H:%M")
    
    img_prompt = topic.replace(" ", "%20") + "%20cyberpunk%20solana%20trading"
    img_url = f"https://image.pollinations.ai/prompt/{img_prompt}?width=800&height=400&nologo=true"

    print(f"Generating blog for: {topic}")
    
    prompt = f"""
    Write a professional SEO-optimized article body about '{topic}' for kryptonapex.com using clean HTML tags (like <h2>, <p>, <ul>, <li>).
    Use Tailwind CSS classes for styling (dark mode text-slate-300).
    Include this image URL: <img src="{img_url}" alt="{topic}" class="w-full rounded-xl shadow-lg my-6">
    Make the article 600 words, highly informative for crypto traders.
    Do NOT include <html>, <head>, or <body> tags. Output only the inner HTML content.
    Do NOT wrap the output in markdown code blocks like ```html. Output raw HTML only.
    """
    
    payload = {"contents": [{"parts": [{"text": prompt}]}]}
    headers = {"Content-Type": "application/json"}
    
    try:
        response = requests.post(URL, headers=headers, json=payload)
        result = response.json()
        html_content = result['candidates'][0]['content']['parts'][0]['text']
        html_content = html_content.replace("```html", "").replace("```", "").strip()
        
        os.makedirs("public", exist_ok=True)
        json_path = "public/blogs.json"
        
        blogs = []
        if os.path.exists(json_path):
            with open(json_path, "r", encoding="utf-8") as f:
                try:
                    blogs = json.load(f)
                except:
                    blogs = []
                    
        new_blog = {
            "title": topic,
            "date": date_str,
            "content": html_content
        }
        
        blogs.insert(0, new_blog)
        blogs = blogs[:10] # نحتفظوا بأخر 10 مقالات
        
        with open(json_path, "w", encoding="utf-8") as f:
            json.dump(blogs, f, ensure_ascii=False, indent=4)
            
        print("Blog successfully added to blogs.json")
        
    except Exception as e:
        print("Error generating content:", e)

generate_blog()

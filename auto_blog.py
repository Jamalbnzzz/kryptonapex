import os
import requests
import time
import re
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
    date_str = datetime.now().strftime("%Y-%m-%d-%H-%M")
    
    img_prompt = topic.replace(" ", "%20") + "%20cyberpunk%20solana%20trading"
    img_url = f"https://image.pollinations.ai/prompt/{img_prompt}?width=800&height=400&nologo=true"

    print(f"Generating blog for: {topic}")
    
    prompt = f"""
    Write a professional SEO-optimized blog post in HTML about '{topic}' for kryptonapex.com.
    Include a <head> tag with SEO meta title, description, and keywords.
    Use Tailwind CSS classes for styling (dark mode: bg-[#05070B] text-slate-200).
    Include this image URL seamlessly in the HTML: <img src="{img_url}" alt="{topic}" class="w-full rounded-xl shadow-lg my-6">
    Make the article 800 words, highly informative for crypto traders.
    Do NOT wrap the output in markdown code blocks like ```html. Output raw HTML only.
    """
    
    payload = {"contents": [{"parts": [{"text": prompt}]}]}
    headers = {"Content-Type": "application/json"}
    
    try:
        response = requests.post(URL, headers=headers, json=payload)
        result = response.json()
        html_content = result['candidates'][0]['content']['parts'][0]['text']
        
        html_content = re.sub(r'^```html|```$', '', html_content, flags=re.MULTILINE).strip()
        
        os.makedirs("public/blogs", exist_ok=True)
        filename = f"public/blogs/blog-{date_str}.html"
        
        with open(filename, "w", encoding="utf-8") as f:
            f.write(html_content)
        print(f"Success! Blog saved to {filename}")
        
    except Exception as e:
        print("Error generating content:", e)

for _ in range(2):
    generate_blog()
    time.sleep(5)

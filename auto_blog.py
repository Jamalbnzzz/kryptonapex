import os
import requests
import time
import json
from datetime import datetime

API_KEY = os.environ.get("GEMINI_API_KEY")
URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={API_KEY}"

# عناوين مختلفة ومتنوعة باش كل مرة يتختار عنوان جديد
topics = [
    "Advanced Solana MEV Protection Strategies for 2026",
    "Maximizing Yields with Raydium Liquidity Pools",
    "The Role of Autonomous AI Agents in Crypto Trading",
    "Decoding Pump.fun Token Launches: Risks and Rewards",
    "Why Low-Latency Infrastructure Dominates Decentralized Exchanges",
    "Secure Your Wallet: Best Practices for Solana Traders"
]

def generate_blog():
    # اختيار عنوان بناءً على الوقت الحالي باش ما يتكررش نفس العنوان ديما
    topic = topics[int(time.time()) % len(topics)]
    date_str = datetime.now().strftime("%Y-%m-%d")
    
    img_prompt = topic.replace(" ", "%20") + "%20cyberpunk%20solana%20trading"
    img_url = f"https://image.pollinations.ai/prompt/{img_prompt}?width=800&height=400&nologo=true"

    print(f"Generating blog for: {topic}")
    
    prompt = f"""
    Write a professional SEO-optimized article body about '{topic}' for kryptonapex.com using clean HTML tags (like <h2>, <p>, <ul>, <li>).
    Include this image URL: <img src="{img_url}" alt="{topic}" style="width:100%; border-radius:8px; margin:15px 0;">
    Make the article 400 words, highly informative for crypto traders.
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
        
        # التأكد من عدم تكرار نفس العنوان إذا كان موجود مسبقاً
        if not any(b.get('title') == topic for b in blogs):
            blogs.insert(0, new_blog)
        else:
            # إضافة رقم عشوائي للعنوان باش يتجدد ضروري
            new_blog["title"] = f"{topic} - Edition {int(time.time()) % 100}"
            blogs.insert(0, new_blog)

        blogs = blogs[:10] # الاحتفاظ بأحدث 10 مقالات
        
        with open(json_path, "w", encoding="utf-8") as f:
            json.dump(blogs, f, ensure_ascii=False, indent=4)
            
        print("Blog successfully written to public/blogs.json")
        
    except Exception as e:
        print("Error generating content:", e)

generate_blog()

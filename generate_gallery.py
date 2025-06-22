import os
import json
from datetime import datetime, timedelta
import random

# Beautiful romantic captions for images and videos
image_captions = [
    "Capturing the essence of pure joy",
    "The sparkle in your eyes outshines every star",
    "Sweet moments that make my heart flutter",
    "You make everything around you more beautiful",
    "The way you light up when you're happy",
    "Every moment with you feels like magic",
    "Your laugh is more beautiful than any sunset",
    "Gentle and kind, just like your heart",
    "The kind of beauty that stops time",
    "Dreamy and wonderful, just like thinking of you",
    "Every photo is a reminder of how beautiful life can be",
    "Natural beauty that takes my breath away",
    "Grace and elegance in every gesture",
    "Confidence and charm in every glance",
    "Sweet and serene, like peaceful moments",
    "You are the most beautiful part of every day",
    "Soft and gentle, radiating warmth",
    "Every photograph captures a piece of my heart",
    "The way you make me believe in magic",
    "Beautiful moments frozen in time",
    "Your smile lights up every room",
    "In your eyes, I see my future",
    "Every moment with you is a treasure",
    "Beautiful beyond words",
    "Every day with you is a gift",
    "The light of my life",
    "Perfect in every way",
    "My heart belongs to you",
    "The most beautiful soul I know",
    "Forever captured in my heart"
]

video_captions = [
    "The way you move, like poetry in motion",
    "Beautiful moments that make my heart flutter",
    "Every gesture filled with grace and charm",
    "The sweetest smile that melts my heart",
    "Dancing through life with endless beauty",
    "Capturing moments of pure joy and laughter",
    "The magic in every little movement",
    "Every second with you is a treasure",
    "The way you laugh lights up the whole world",
    "Watching you is like watching art come to life",
    "Every movement tells a story of love",
    "The grace with which you move through life",
    "Moments of pure happiness in motion",
    "Your energy is contagious and beautiful",
    "Every video captures your radiant spirit",
    "The way you express yourself is mesmerizing",
    "Living life with such beautiful passion",
    "Every frame shows your incredible soul",
    "The joy you bring to every moment",
    "Watching you is my favorite thing to do",
    "Your animations bring life to everything",
    "The most beautiful person in motion",
    "Every gesture is filled with love",
    "The way you make ordinary moments magical",
    "Your movements are like a beautiful dance",
    "Capturing the essence of your beautiful spirit",
    "Every video is a love letter to life",
    "The most enchanting person I know",
    "Your joy is absolutely infectious",
    "Every moment with you is a celebration"
]

def get_file_type(filename):
    if filename.endswith('.mp4'):
        return 'video'
    elif filename.endswith('.webp'):
        return 'webp'
    elif filename.endswith('.heic'):
        return 'heic'
    else:
        return 'unknown'

def extract_date_from_filename(filename):
    # Extract timestamp from filename (e.g., teewritesfp_1713153390_...)
    try:
        parts = filename.split('_')
        if len(parts) >= 2:
            timestamp = int(parts[1])
            date = datetime.fromtimestamp(timestamp)
            return date.strftime("%Y-%m-%d")
    except:
        pass
    return "2024-01-01"

def generate_gallery_json():
    # Get all files from the teewritesfp directory
    tee_dir = "/Users/shaswatraj/Desktop/alsocreative/gallery/public/teewritesfp"
    files = sorted(os.listdir(tee_dir))
    
    media_items = []
    used_image_captions = set()
    used_video_captions = set()
    
    for i, filename in enumerate(files):
        if filename.startswith('.'):
            continue
            
        file_type = get_file_type(filename)
        if file_type == 'unknown':
            continue
            
        # Get appropriate caption
        if file_type == 'video':
            available_captions = [cap for cap in video_captions if cap not in used_video_captions]
            if not available_captions:
                used_video_captions.clear()
                available_captions = video_captions
            caption = random.choice(available_captions)
            used_video_captions.add(caption)
        else:
            available_captions = [cap for cap in image_captions if cap not in used_image_captions]
            if not available_captions:
                used_image_captions.clear()
                available_captions = image_captions
            caption = random.choice(available_captions)
            used_image_captions.add(caption)
        
        media_item = {
            "id": i + 1,
            "filename": filename,
            "src": f"/teewritesfp/{filename}",
            "alt": caption,
            "type": file_type,
            "date": extract_date_from_filename(filename)
        }
        
        # Add muted property for videos
        if file_type == 'video':
            media_item["muted"] = True
            
        media_items.append(media_item)
    
    gallery_data = {
        "gallery": {
            "title": "My Beautiful Love Gallery 💕✨",
            "description": "A complete collection of precious moments, memories, and love stories",
            "media": media_items
        }
    }
    
    return gallery_data

# Generate the JSON
gallery_json = generate_gallery_json()

# Write to file
output_path = "/Users/shaswatraj/Desktop/alsocreative/gallery/src/data/complete-gallery.json"
with open(output_path, 'w') as f:
    json.dump(gallery_json, f, indent=2)

print(f"Generated gallery JSON with {len(gallery_json['gallery']['media'])} media items")
print(f"Videos: {sum(1 for item in gallery_json['gallery']['media'] if item['type'] == 'video')}")
print(f"WebP images: {sum(1 for item in gallery_json['gallery']['media'] if item['type'] == 'webp')}")
print(f"HEIC images: {sum(1 for item in gallery_json['gallery']['media'] if item['type'] == 'heic')}")

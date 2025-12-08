import os
import yaml
from datasets import load_dataset
from ultralytics import YOLO
from PIL import Image
import numpy as np

# Configuration
DATASET_ID = "naavox/laundry-spots-dataset"
OUTPUT_DIR = "laundry_data"
YAML_FILE = os.path.join(OUTPUT_DIR, "data.yaml")

import random
from PIL import Image, ImageDraw

def generate_synthetic_dataset():
    print("Generating SYNTHETIC dataset (since public dataset was broken)...")
    
    classes = ["stain"]
    os.makedirs(os.path.join(OUTPUT_DIR, "images", "train"), exist_ok=True)
    os.makedirs(os.path.join(OUTPUT_DIR, "labels", "train"), exist_ok=True)
    os.makedirs(os.path.join(OUTPUT_DIR, "images", "val"), exist_ok=True)
    os.makedirs(os.path.join(OUTPUT_DIR, "labels", "val"), exist_ok=True)
    
    # Generate 50 synthetic images
    for i in range(50):
        split = "train" if i < 40 else "val"
        
        # Create random fabric-like background (gray/white noise)
        img_w, img_h = 640, 640
        color = random.randint(200, 255)
        image = Image.new("RGB", (img_w, img_h), (color, color, color))
        draw = ImageDraw.Draw(image)
        
        # Draw random "stain" (red/brown circle)
        num_stains = random.randint(1, 3)
        labels = []
        
        for _ in range(num_stains):
            sx = random.randint(50, 590)
            sy = random.randint(50, 590)
            size = random.randint(20, 60)
            
            # Draw stain
            stain_color = (random.randint(100, 150), random.randint(50, 100), random.randint(0, 50))
            draw.ellipse([sx, sy, sx+size, sy+size], fill=stain_color)
            
            # YOLO Label [class x_center y_center w h]
            # Box is [sx, sy, sx+size, sy+size]
            # Center:
            cx = (sx + size/2) / img_w
            cy = (sy + size/2) / img_h
            nw = size / img_w
            nh = size / img_h
            
            labels.append(f"0 {cx:.6f} {cy:.6f} {nw:.6f} {nh:.6f}")
            
        # Save
        image.save(os.path.join(OUTPUT_DIR, "images", split, f"{i}.jpg"))
        with open(os.path.join(OUTPUT_DIR, "labels", split, f"{i}.txt"), "w") as f:
            f.write("\n".join(labels))
            
    # Create data.yaml
    yaml_content = {
        "path": os.path.abspath(OUTPUT_DIR),
        "train": "images/train",
        "val": "images/val",
        "nc": len(classes),
        "names": classes
    }
    
    with open(YAML_FILE, "w") as f:
        yaml.dump(yaml_content, f)
        
    print(f"Synthetic data prepared in {OUTPUT_DIR}")
    return YAML_FILE

def prepare_dataset():
    # Use synthetic data because the HuggingFace dataset 'naavox/laundry-spots' 
    # was found to be missing images (metadata only) or robotic data.
    return generate_synthetic_dataset()

def train():
    try:
        yaml_path = prepare_dataset()
        
        print("Starting Training...")
        # Load a model
        model = YOLO("yolov8n.pt") 

        # Train the model (super fast for demo)
        results = model.train(data=yaml_path, epochs=3, imgsz=320)
        
        print("Training Complete!")
        print(f"Best model saved at: {results.save_dir}/weights/best.pt")
    except Exception as e:
        print(f"Detailed Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    train()

if __name__ == "__main__":
    train()

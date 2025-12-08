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

def format_yolo_label(box, img_width, img_height, class_id):
    # HF usually gives box as [x_min, y_min, x_max, y_max] or similar
    # YOLO needs [x_center, y_center, width, height] normalized (0-1)
    
    # Assuming box is [x, y, w, h] based on typical "coco" format in HF object detection
    # BUT, we need to inspect the data. Let's assume standard [x_min, y_min, w, h] for now
    # If it fails, we might need to adjust.
    
    x, y, w, h = box
    
    x_center = (x + w / 2) / img_width
    y_center = (y + h / 2) / img_height
    width = w / img_width
    height = h / img_height
    
    return f"{class_id} {x_center} {y_center} {width} {height}"

def prepare_dataset():
    print(f"Downloading dataset: {DATASET_ID}...")
    # Load dataset
    ds = load_dataset(DATASET_ID, split="train")
    
    # Create directories
    for split in ["train", "val"]:
        os.makedirs(os.path.join(OUTPUT_DIR, "images", split), exist_ok=True)
        os.makedirs(os.path.join(OUTPUT_DIR, "labels", split), exist_ok=True)
        
    print("Formatting data for YOLO...")
    
    # Get categories
    # Assuming dataset features have 'objects' with 'category'
    # We might need to auto-detect classes
    classes = []
    if hasattr(ds.features['objects'], 'feature'):
         classes = ds.features['objects'].feature['category'].names
    else:
        # Fallback if names aren't in metadata
        classes = ["stain", "tear", "damage"] 

    # Split data (80% train, 20% val)
    ds = ds.train_test_split(test_size=0.2)
    
    for split in ["train", "test"]:
        folder_split = "train" if split == "train" else "val"
        dataset_split = ds[split]
        
        for idx, item in enumerate(dataset_split):
            image = item['image']
            objects = item['objects']
            
            # Save Image
            img_filename = f"{idx}.jpg"
            img_path = os.path.join(OUTPUT_DIR, "images", folder_split, img_filename)
            image.save(img_path)
            
            # Save Label
            label_filename = f"{idx}.txt"
            label_path = os.path.join(OUTPUT_DIR, "labels", folder_split, label_filename)
            
            img_w, img_h = image.size
            
            with open(label_path, "w") as f:
                categories = objects['category']
                bboxes = objects['bbox']
                
                for cat, box in zip(categories, bboxes):
                    yolo_line = format_yolo_label(box, img_w, img_h, cat)
                    f.write(yolo_line + "\n")
                    
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
        
    print(f"Data preparation complete. Saved to {OUTPUT_DIR}")
    return YAML_FILE

def train():
    yaml_path = prepare_dataset()
    
    print("Starting Training...")
    # Load a model
    model = YOLO("yolov8n.pt")  # load a pretrained model (recommended for training)

    # Train the model
    results = model.train(data=yaml_path, epochs=10, imgsz=640)
    
    print("Training Complete!")
    print(f"Best model saved at: {results.save_dir}/weights/best.pt")

if __name__ == "__main__":
    train()

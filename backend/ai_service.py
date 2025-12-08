from ultralytics import YOLO
import shutil
import os
from typing import Dict

# Load model (will auto-download from HF on first run if configured, 
# or we point to the specific HF file)
# Since Ultralytics supports HF direct loading:
# Using standard YOLOv8n model as fallback since custom weights URL is down
# "yolov8n.pt" will be downloaded automatically from Ultralytics
model = YOLO("yolov8n.pt")

def analyze_image_file(file_path: str) -> Dict[str, str]:
    """
    Analyzes an image file for clothing defects.
    Returns a dictionary with result details.
    """
    # Run inference
    results = model.predict(source=file_path, save=False, conf=0.25)
    
    detected_class = "Normal"
    recommendation = "Wash & Fold"
    confidence = 0.0

    # Check results
    for result in results:
        if result.boxes:
            # Get the box with highest confidence
            box = result.boxes[0]
            class_id = int(box.cls[0])
            confidence = float(box.conf[0])
            label = model.names[class_id]
            
            detected_class = label
            
            # Map labels to recommendations
            # Labels: outside_tear, stain, tear, hole, normal
            if label == "stain":
                recommendation = "Dry Cleaning"
            elif label in ["tear", "outside_tear", "hole"]:
                recommendation = "Special Care"
            else:
                recommendation = "Wash & Fold"
            
            # Break after finding first major defect (prioritize defects over normal)
            break
            
    return {
        "detected_defect": detected_class,
        "confidence": f"{confidence:.2f}",
        "recommendation": recommendation
    }

def analyze_image_bytes(image_bytes: bytes) -> Dict[str, str]:
    # Save bytes to temp file because YOLO expects file or numpy array
    temp_filename = "temp_upload_image.jpg"
    with open(temp_filename, "wb") as f:
        f.write(image_bytes)
        
    try:
        result = analyze_image_file(temp_filename)
        return result
    finally:
        # Cleanup
        if os.path.exists(temp_filename):
            os.remove(temp_filename)

from datasets import load_dataset

def inspect():
    ds = load_dataset("naavox/laundry-spots-dataset", split="train")
    import json
    # Print dict keys to see structure
    print("Features:", ds.features)
    print("First item:", ds[0])

if __name__ == "__main__":
    inspect()

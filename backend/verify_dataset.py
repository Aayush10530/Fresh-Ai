from datasets import load_dataset

def verify_alt():
    print("Checking 'naavox/merged-5'...")
    try:
        ds = load_dataset("naavox/merged-5", split="train")
        print("Success! Features:", ds.features)
        print("First Item:", ds[0])
    except Exception as e:
        print(f"Failed: {e}")

if __name__ == "__main__":
    verify_alt()

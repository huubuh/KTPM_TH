from app import add

if __name__ == "__main__":
    result = add.delay(2, 3)
    print("Task sent:", result.id)
from rembg import remove
from PIL import Image
import sys

def process(input_path, output_path):
    try:
        input_img = Image.open(input_path)
        output_img = remove(input_img)
        output_img.save(output_path)
        print("Processed " + output_path)
    except Exception as e:
        print("Error: " + str(e))

if __name__ == '__main__':
    process(sys.argv[1], sys.argv[2])

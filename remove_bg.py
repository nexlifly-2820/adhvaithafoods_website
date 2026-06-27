import sys
from PIL import Image

def remove_white_bg(img_path):
    try:
        img = Image.open(img_path).convert("RGBA")
        datas = img.getdata()

        newData = []
        for item in datas:
            # Change all white (also shades of whites) to transparent
            # Let's consider anything above 240, 240, 240 as white
            if item[0] > 240 and item[1] > 240 and item[2] > 240:
                newData.append((255, 255, 255, 0))
            else:
                newData.append(item)

        img.putdata(newData)
        img.save(img_path, "PNG")
        print("Processed " + img_path)
    except Exception as e:
        print("Error on " + img_path + ": " + str(e))

if __name__ == '__main__':
    for p in sys.argv[1:]:
        remove_white_bg(p)

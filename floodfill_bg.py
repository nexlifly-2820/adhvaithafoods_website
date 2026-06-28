from PIL import Image

def remove_bg_floodfill(img_path, out_path, tolerance=15):
    img = Image.open(img_path).convert("RGBA")
    
    # We will flood fill from the top-left corner
    target_color = (255, 255, 255)
    width, height = img.size
    pixels = img.load()
    
    # Stack for flood fill
    stack = [(0, 0), (width-1, 0), (0, height-1), (width-1, height-1)]
    visited = set()
    
    while stack:
        x, y = stack.pop()
        if (x, y) in visited:
            continue
        visited.add((x, y))
        
        if 0 <= x < width and 0 <= y < height:
            r, g, b, a = pixels[x, y]
            
            # Check if color is close to white
            if r >= 255 - tolerance and g >= 255 - tolerance and b >= 255 - tolerance:
                pixels[x, y] = (255, 255, 255, 0)
                
                # Add neighbors to stack
                stack.append((x+1, y))
                stack.append((x-1, y))
                stack.append((x, y+1))
                stack.append((x, y-1))
                
    img.save(out_path, "PNG")
    print(f"Processed {img_path} to {out_path}")

import sys
if __name__ == '__main__':
    for p in sys.argv[1:]:
        remove_bg_floodfill(p, p, tolerance=40)

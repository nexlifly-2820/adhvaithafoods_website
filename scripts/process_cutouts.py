import os
from PIL import Image, ImageFilter
from collections import deque
import numpy as np

def make_transparent(input_path, output_path, bg_threshold=236, feather_radius=1.5):
    img = Image.open(input_path).convert("RGBA")
    arr = np.array(img)
    h, w = arr.shape[:2]
    
    # Calculate whiteness distance: where all channels R, G, B are high
    # Also check difference between max and min channel (background is neutral grey/white)
    r = arr[:, :, 0].astype(int)
    g = arr[:, :, 1].astype(int)
    b = arr[:, :, 2].astype(int)
    
    brightness = (r + g + b) / 3.0
    color_diff = np.maximum(np.maximum(np.abs(r - g), np.abs(g - b)), np.abs(r - b))
    
    # Candidate background pixels: bright and neutral
    is_white = (brightness > bg_threshold) & (color_diff < 18)
    
    # Breadth-first search flood-fill from border pixels
    visited = np.zeros((h, w), dtype=bool)
    queue = deque()
    
    # Add border pixels that are white to queue
    for x in range(w):
        if is_white[0, x]:
            visited[0, x] = True
            queue.append((0, x))
        if is_white[h - 1, x]:
            visited[h - 1, x] = True
            queue.append((h - 1, x))
            
    for y in range(h):
        if is_white[y, 0]:
            visited[y, 0] = True
            queue.append((y, 0))
        if is_white[y, w - 1]:
            visited[y, w - 1] = True
            queue.append((y, w - 1))
            
    # Flood fill
    while queue:
        cy, cx = queue.popleft()
        for dy, dx in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            ny, nx = cy + dy, cx + dx
            if 0 <= ny < h and 0 <= nx < w and not visited[ny, nx]:
                if is_white[ny, nx]:
                    visited[ny, nx] = True
                    queue.append((ny, nx))
                    
    # Visited pixels are the true background
    alpha_mask = np.where(visited, 0, 255).astype(np.uint8)
    
    # Soften / antialias edges
    mask_img = Image.fromarray(alpha_mask, mode='L')
    if feather_radius > 0:
        mask_img = mask_img.filter(ImageFilter.GaussianBlur(feather_radius))
        
    arr[:, :, 3] = np.array(mask_img)
    
    # Crop to non-transparent bounding box with padding
    result = Image.fromarray(arr, mode='RGBA')
    bbox = result.getbbox()
    if bbox:
        # Add 10px margin around bbox
        pad = 12
        crop_box = (
            max(0, bbox[0] - pad),
            max(0, bbox[1] - pad),
            min(w, bbox[2] + pad),
            min(h, bbox[3] + pad)
        )
        result = result.crop(crop_box)
        
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    result.save(output_path, "PNG")
    print(f"Successfully saved transparent cutout: {output_path}")

images = [
    (r"C:\Users\DELL\.gemini\antigravity-ide\brain\629f37d0-234d-4fe2-a9cd-66f7c0dd176c\real_garlic_ginger_1792307028595.jpg",
     r"c:\Users\DELL\OneDrive\Documents\adhvaithafoods_website\public\images\real_garlic_cutout.png", 232),
    (r"C:\Users\DELL\.gemini\antigravity-ide\brain\629f37d0-234d-4fe2-a9cd-66f7c0dd176c\real_potato_chips_1792307064060.jpg",
     r"c:\Users\DELL\OneDrive\Documents\adhvaithafoods_website\public\images\real_chips_cutout.png", 232),
    (r"C:\Users\DELL\.gemini\antigravity-ide\brain\629f37d0-234d-4fe2-a9cd-66f7c0dd176c\real_coriander_leaves_1792307095969.jpg",
     r"c:\Users\DELL\OneDrive\Documents\adhvaithafoods_website\public\images\real_coriander_cutout.png", 232),
    (r"C:\Users\DELL\.gemini\antigravity-ide\brain\629f37d0-234d-4fe2-a9cd-66f7c0dd176c\real_millet_laddu_1792307131256.jpg",
     r"c:\Users\DELL\OneDrive\Documents\adhvaithafoods_website\public\images\real_laddu_cutout.png", 230)
]

for src, dst, th in images:
    if os.path.exists(src):
        make_transparent(src, dst, bg_threshold=th)
    else:
        print(f"File not found: {src}")

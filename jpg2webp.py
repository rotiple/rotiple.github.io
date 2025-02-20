from PIL import Image
import os

# 이미지 폴더 경로
folder_path = r"C:\Users\opveo\Desktop\rotiple.github.io\img\gallery"

# 폴더 내 모든 파일 검색
for filename in os.listdir(folder_path):
    if filename.lower().endswith('.jpg'):  # jpg 확장자 파일만 처리
        img_path = os.path.join(folder_path, filename)
        with Image.open(img_path) as img:
            # 원본 이미지 크기 확인
            original_width, original_height = img.size

            # 새로운 크기 계산 (가로와 세로를 각각 10분의 1로 축소)
            new_width = original_width // 3
            new_height = original_height // 3

            # 이미지 크기 조정
            resized_img = img.resize((new_width, new_height), Image.LANCZOS)

            # .webp 파일명 설정
            webp_filename = os.path.splitext(filename)[0] + '.webp'
            webp_path = os.path.join(folder_path, webp_filename)
            
            # webp로 저장
            resized_img.save(webp_path, 'WEBP')

# 파일 1개
# filename = r"C:\Users\opveo\Desktop\rotiple.github.io\img\map.jpg"

# img_path = os.path.join(folder_path, filename)
# with Image.open(img_path) as img:
#     # .webp 파일명 설정
#     webp_filename = os.path.splitext(filename)[0] + '.webp'
#     webp_path = os.path.join(folder_path, webp_filename)
    
#     # webp로 저장
#     img.save(webp_path, 'WEBP')

print("JPG 파일을 WEBP로 변환 완료.")

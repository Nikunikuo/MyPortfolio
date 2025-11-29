import fitz  # PyMuPDF
import re
import json

# PDFを読み込む
pdf_path = r'D:\Portfplio\100cha\100ch.pdf'
doc = fitz.open(pdf_path)

# 全テキストを抽出
full_text = ""
for page in doc:
    full_text += page.get_text()

# パターンで日付ごとに分割
# 「番号」「タイトル」「詳細」「Grokからのコメント」のパターンを探す
days_data = []

# 番号でセクションを分割
sections = re.split(r'番号\s*\n', full_text)

for section in sections[1:]:  # 最初は空なのでスキップ
    lines = section.strip().split('\n')
    if len(lines) < 4:
        continue
    
    day_info = lines[0].strip()  # "1 (8/9)" のような形式
    
    # タイトルを探す
    title_idx = -1
    for i, line in enumerate(lines):
        if line.strip() == 'タイトル':
            title_idx = i
            break
    
    # 詳細を探す
    detail_idx = -1
    for i, line in enumerate(lines):
        if line.strip() == '詳細':
            detail_idx = i
            break
    
    # Grokコメントを探す  
    grok_idx = -1
    for i, line in enumerate(lines):
        if 'Grokからのコメント' in line:
            grok_idx = i
            break
    
    if title_idx > 0 and detail_idx > 0 and grok_idx > 0:
        # 日番号を抽出
        day_match = re.search(r'(\d+)', day_info)
        day_num = day_match.group(1) if day_match else '0'
        
        # タイトルを抽出
        title = lines[title_idx + 1].strip() if title_idx + 1 < len(lines) else '仮タイトル'
        
        # 詳細を抽出（複数行の可能性あり）
        summary_lines = []
        for i in range(detail_idx + 1, grok_idx):
            if lines[i].strip() and lines[i].strip() != 'Grokからのコメント':
                summary_lines.append(lines[i].strip())
        summary = ' '.join(summary_lines) if summary_lines else '詳細なし'
        
        # Grokコメントを抽出
        grok_comment = lines[grok_idx + 1].strip() if grok_idx + 1 < len(lines) else 'コメントなし'
        
        days_data.append({
            'day': day_num,
            'title': title,
            'summary': summary,
            'grokComment': grok_comment
        })

print(f"抽出したデータ数: {len(days_data)}")
print("\n最初の3件:")
for data in days_data[:3]:
    print(json.dumps(data, ensure_ascii=False, indent=2))

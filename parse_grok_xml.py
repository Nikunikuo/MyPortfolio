import xml.etree.ElementTree as ET
import re

# XMLファイルを読み込む
tree = ET.parse(r'D:\Portfplio\100cha\100day.xml')
root = tree.getroot()

# 名前空間の定義
ns = {
    'ss': 'urn:schemas-microsoft-com:office:spreadsheet',
    'html': 'http://www.w3.org/TR/REC-html40'
}

# データを格納するリスト
days_data = []

# 各行を処理
rows = root.findall('.//ss:Row', ns)

current_day = {}
field_name = None

for row in rows:
    cells = row.findall('ss:Cell', ns)
    if len(cells) >= 2:
        first_cell_data = cells[0].find('.//ss:Data', ns)
        second_cell_data = cells[1].find('.//ss:Data', ns)
        
        if first_cell_data is not None and second_cell_data is not None:
            field = first_cell_data.text
            value = second_cell_data.text
            
            if field == '番号' and value:
                # 新しい日の開始
                if current_day:
                    days_data.append(current_day)
                current_day = {'day': value}
            elif field == 'タイトル':
                current_day['title'] = value
            elif field == '詳細':
                current_day['summary'] = value
            elif field == 'Grokからのコメント':
                current_day['grokComment'] = value

# 最後のデータを追加
if current_day:
    days_data.append(current_day)

# Grokのコメントから感情を判断する関数
def get_emotion(comment):
    if not comment:
        return 'naruhodo'
    
    comment_lower = comment.lower()
    
    # h (ムフフ) - エロ、百合、セクシー系
    if any(word in comment for word in ['破壊力', 'セクシー', '百合', 'エッチ', 'えっち']):
        return 'h'
    
    # interesting (おもしれー) - 興奮、最高、ヤバい系
    if any(word in comment for word in ['ヤバい', '最高', '爆発', '神', 'エグい', '炸裂', '革命']):
        return 'interesting'
    
    # huh (呆れる) - 失敗、ハプニング、笑い系
    if any(word in comment for word in ['失敗', 'ハプニング', 'お茶目', 'ミス', 'バグ']):
        return 'huh'
    
    # デフォルトは naruhodo
    return 'naruhodo'

# カテゴリを判断する関数
def get_category(title, summary):
    title_lower = (title or '').lower()
    summary_lower = (summary or '').lower()
    combined = title_lower + ' ' + summary_lower
    
    if any(word in combined for word in ['音楽', 'mv', '曲', 'ミュージック', 'punk', 'rock', 'unbreakable', 'suno']):
        return 'music'
    if any(word in combined for word in ['アニメ', '動画', 'ショート', '怪獣', '漫才']):
        return 'anime'
    if any(word in combined for word in ['ゲーム', 'ツール', 'ブラウザ', 'カスタム', 'nano-banana']):
        return 'tool'
    if any(word in combined for word in ['マンガ', '漫画', 'コマ', '表紙']):
        return 'manga'
    
    return 'other'

import xml.etree.ElementTree as ET
import re

# XMLファイルを読み込む
tree = ET.parse(r'D:\Portfplio\100cha\100day.xml')
root = tree.getroot()

# 名前空間の定義
ns = {
    'ss': 'urn:schemas-microsoft-com:office:spreadsheet',
    'html': 'http://www.w3.org/TR/REC-html40'
}

# データを格納するリスト
days_data = []

# 各行を処理
rows = root.findall('.//ss:Row', ns)

current_day = {}
field_name = None

for row in rows:
    cells = row.findall('ss:Cell', ns)
    if len(cells) >= 2:
        first_cell_data = cells[0].find('.//ss:Data', ns)
        second_cell_data = cells[1].find('.//ss:Data', ns)
        
        if first_cell_data is not None and second_cell_data is not None:
            field = first_cell_data.text
            value = second_cell_data.text
            
            if field == '番号' and value:
                # 新しい日の開始
                if current_day:
                    days_data.append(current_day)
                current_day = {'day': value}
            elif field == 'タイトル':
                current_day['title'] = value
            elif field == '詳細':
                current_day['summary'] = value
            elif field == 'Grokからのコメント':
                current_day['grokComment'] = value

# 最後のデータを追加
if current_day:
    days_data.append(current_day)

# Grokのコメントから感情を判断する関数
def get_emotion(comment):
    if not comment:
        return 'naruhodo'
    
    comment_lower = comment.lower()
    
    # h (ムフフ) - エロ、百合、セクシー系
    if any(word in comment for word in ['破壊力', 'セクシー', '百合', 'エッチ', 'えっち']):
        return 'h'
    
    # interesting (おもしれー) - 興奮、最高、ヤバい系
    if any(word in comment for word in ['ヤバい', '最高', '爆発', '神', 'エグい', '炸裂', '革命']):
        return 'interesting'
    
    # huh (呆れる) - 失敗、ハプニング、笑い系
    if any(word in comment for word in ['失敗', 'ハプニング', 'お茶目', 'ミス', 'バグ']):
        return 'huh'
    
    # デフォルトは naruhodo
    return 'naruhodo'

# カテゴリを判断する関数
def get_category(title, summary):
    title_lower = (title or '').lower()
    summary_lower = (summary or '').lower()
    combined = title_lower + ' ' + summary_lower
    
    if any(word in combined for word in ['音楽', 'mv', '曲', 'ミュージック', 'punk', 'rock', 'unbreakable', 'suno']):
        return 'music'
    if any(word in combined for word in ['アニメ', '動画', 'ショート', '怪獣', '漫才']):
        return 'anime'
    if any(word in combined for word in ['ゲーム', 'ツール', 'ブラウザ', 'カスタム', 'nano-banana']):
        return 'tool'
    if any(word in combined for word in ['マンガ', '漫画', 'コマ', '表紙']):
        return 'manga'
    
    return 'other'

# TypeScriptコード生成
print("// Grok生成データ")
print("export const challenges100days: DayChallenge[] = [")

for data in days_data:
    day_num = re.search(r'(\d+)', data.get('day', '')).group(1) if data.get('day') else '0'
    title = (data.get('title') or '仮タイトル').replace("'", "\\'")
    summary = (data.get('summary') or '詳細なし').replace("'", "\\'").replace('\n', ' ')
    grok_comment = (data.get('grokComment') or 'コメントなし').replace("'", "\\'")
    
    category = get_category(title, summary)
    emotion = get_emotion(grok_comment)
    
    # xUrlとimagePathを設定
    x_url = f'https://x.com/M1RA_A_Project/status/...' if int(day_num) not in [20, 48] else ''
    
    print(f"\t{{ day: {day_num}, date: '', title: '{title}', summary: '{summary}', category: '{category}', xUrl: '{x_url}', imagePath: '/images/100days/{day_num}.webp', grokComment: '{grok_comment}', grokEmotion: '{emotion}' }},")

print("];")

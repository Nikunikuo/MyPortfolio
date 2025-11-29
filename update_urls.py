import re

md_path = r"D:\Portfplio\100cha\100days.md"
ts_path = r"D:\Portfplio\src\data\100daysData.ts"

# 1. Parse 100days.md
day_urls = {}
with open(md_path, "r", encoding="utf-8") as f:
    for line in f:
        match = re.match(r"^\s*(\d+)\(.*\):(https?://x\.com/\S+)", line)
        if match:
            day = int(match.group(1))
            url = match.group(2).strip()
            # Remove trailing parenthesis or comments if any (simple heuristic)
            if "(" in url and ")" in url:
                url = url.split("(")[0]
            day_urls[day] = url

print(f"Found {len(day_urls)} URLs in markdown.")

# 2. Update 100daysData.ts
with open(ts_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

new_lines = []
updated_count = 0

for line in lines:
    # Check if line contains day definition
    day_match = re.search(r"day:\s*(\d+)", line)
    if day_match:
        day = int(day_match.group(1))
        if day >= 30 and day in day_urls:
            new_url = day_urls[day]
            # Check if xUrl exists in the line
            if "xUrl:" in line:
                # Replace existing URL
                line = re.sub(r"xUrl:\s*'[^']+'", f"xUrl: '{new_url}'", line)
                updated_count += 1
            else:
                # Add xUrl if missing (insert before imagePath for consistency)
                if "imagePath:" in line:
                    line = line.replace("imagePath:", f"xUrl: '{new_url}', imagePath:")
                    updated_count += 1
    new_lines.append(line)

with open(ts_path, "w", encoding="utf-8") as f:
    f.writelines(new_lines)

print(f"Updated {updated_count} entries in 100daysData.ts.")

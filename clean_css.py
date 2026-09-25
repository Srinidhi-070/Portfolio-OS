import re

with open('src/index.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Match the first .app-tile all the way down to the end of all app-tile definitions
# up to just before .glass-input
pattern = re.compile(r'\.app-tile \{.*?(?=\.glass-input)', re.DOTALL)

clean_app_tile = """
.app-tile {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 26%;
  background: var(--surface-2);
  border: 1px solid var(--glass-border);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease, background 0.2s ease;
}

.app-tile:hover, .group:hover .app-tile {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
  background: var(--accent);
  color: #ffffff;
}

"""

css = pattern.sub(clean_app_tile, css)

with open('src/index.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Cleaned app-tile CSS")

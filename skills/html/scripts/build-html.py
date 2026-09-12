#!/usr/bin/env python3
"""原稿のマーカーに同梱CSS・JSを埋め込み、単一HTMLを作る。"""

import argparse
from pathlib import Path


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('source', type=Path, help='2つの埋め込みマーカーを含む原稿HTML')
    parser.add_argument('output', type=Path, help='完成HTMLの保存先')
    args = parser.parse_args()
    if args.source.resolve() == args.output.resolve():
        parser.error('原稿と出力先には異なるパスを指定してください。')

    design = Path(__file__).resolve().parents[1] / 'design-system'
    html = args.source.read_text(encoding='utf-8')
    assets = [('styles', 'style', 'document.css'), ('script', 'script', 'document.js')]
    for name, tag, filename in assets:
        marker = f'<!-- html-skill:{name} -->'
        if html.count(marker) != 1:
            parser.error(f'{marker} を原稿に1箇所だけ置いてください。')
        content = (design / filename).read_text(encoding='utf-8').rstrip()
        if f'</{tag}' in content.lower():
            parser.error(f'{filename} に埋め込みを終了するタグが含まれています。')
        html = html.replace(marker, f'<{tag}>\n{content}\n</{tag}>')

    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(html, encoding='utf-8')
    print(args.output.resolve())


if __name__ == '__main__':
    main()

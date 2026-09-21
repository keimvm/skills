# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## リポジトリの性格

個人用の Agent Skills 集。ビルド・テスト・lint のツールチェーンはなく、成果物は `skills/<name>/SKILL.md` とその補助ファイルだけ。配布は `npx skills@latest add keimvm/skills --skill <name> -g` で行う（詳細は [README.md](README.md)）。

## コマンド

```bash
# 変更後の確認: 全スキルの name / description が認識されるか（唯一の検証手段）
npx skills@latest add . --list
```

```bash
# html スキルの原稿に同梱 CSS・JS を埋め込み、単一 HTML を作る
python3 skills/html/scripts/build-html.py <draft.html> <output.html>
```

```bash
# design-system の CSS・JS・template を変えたら、部品見本を再生成する
python3 skills/html/scripts/build-html.py skills/html/design-system/component-samples.template.html skills/html/design-system/component-samples.html
```

## 構成の要点

### SKILL.md の frontmatter

- `name` は英小文字・数字・ハイフンで 64 文字以内。先頭・末尾・連続のハイフンは不可。`description` は 1024 文字以内。
- 対話系スキル（natural-japanese, project-plan, software-spec, wait-what）は `disable-model-invocation: true` を付け、ユーザーが明示的に呼ぶ前提にしている。`html` は付けず、モデルが自動選択できる。新規スキルもこの区別に従う。
- `project-plan` と `software-spec` は、それぞれ対話から文書の保存まで担当し、ほかのスキルは呼び出さない。企画書 `project-plan.md` を介して連携し、標準の保存先は `docs/` とする。

### README の保守

スキルを追加・改名したら、README の「スキル一覧」の表に加えて、「使い方」の `--skill <name> -g` のインストール例の行も揃える。

### html スキルの design-system

唯一、SKILL.md 以外の資産を持つスキル。

- `skills/html/design-system/document.css`（`.mb-` プレフィックス）と `document.js` が配色・部品・用語欄の開閉の正。
- `component-samples.html` は **生成物**。`component-samples.template.html` を `build-html.py` に通した結果と一致させておく。直接編集せず、CSS・JS・template を変えたら上のコマンドで再生成する。
- `build-html.py` は自身の位置から `../design-system/` を探す。`scripts/` と `design-system/` は兄弟ディレクトリのまま動かさない。原稿には `<!-- html-skill:styles -->` と `<!-- html-skill:script -->` を各 1 回だけ置く（それ以外はエラー）。
- `document.css` 先頭の MIT ライセンス表記（mathbullet/skills 由来）は削除しない。スクリプトを使わず手で埋め込む場合も残す。

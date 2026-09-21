# リポジトリの管理方針

## 概要

個人用の Agent Skills 集。成果物は `skills/<skill-name>/SKILL.md` とその補助ファイルで、共通のビルド・テスト・lint のツールチェーンはない。配布・インストール方法は [README.md](README.md) を参照する。

README はスキルの利用者向けとし、用途・インストール・呼び出し方・更新・削除を案内する。スキルの作成・保守・検証に関する手順は、このファイルにまとめる。

## スキルの作成・編集

- 応答・ドキュメント・スキル本文は日本語を基本とする。識別子・ファイル名・コマンドは英語のまま扱う。
- スキルは `skills/<skill-name>/SKILL.md` に配置する。
- YAML frontmatter に `name` と `description` を記述する。
  - `name` はディレクトリ名と一致させ、英小文字・数字・ハイフンで 64 文字以内にする。先頭・末尾・連続のハイフンは使わない。
  - `description` は空にせず、用途と使用場面を 1024 文字以内で記述する。
- スキル本文は簡潔にし、必要な手順と期待する出力を記述する。
- 補足ファイルや依存ツールは、必要になった時点で追加する。補足資料や実行スクリプトはスキル配下の `references/`、`scripts/`、`assets/` などに置き、`SKILL.md` から参照する。
- スキルの追加・変更・改名・削除時は、README の「スキル一覧」「インストール」「使い方」も更新する。インストール例の `--skill <name> -g` と呼び出し例も揃える。

新規スキルは、以下をひな形に `skills/<skill-name>/SKILL.md` を作成する。frontmatter の詳細は [Agent Skills仕様](https://agentskills.io/specification) を参照する。

```markdown
---
name: my-skill
description: このスキルで何を行い、どのような依頼で使うか。
---

# スキル名

エージェントが従う手順と、期待する出力を記述する。
```

## 呼び出しとスキル間の連携

- 対話系スキル（`natural-japanese`、`project-plan`、`software-spec`、`wait-what`）は `disable-model-invocation: true` を付け、ユーザーが明示的に呼ぶ前提にする。`html` は付けず、モデルが自動選択できる。新規スキルもこの区別に従う。
- `project-plan` と `software-spec` は、それぞれ対話から文書の保存まで担当し、ほかのスキルは呼び出さない。企画書 `project-plan.md` を介して連携し、標準の保存先は `docs/` とする。

## html スキルの保守

- `skills/html/design-system/document.css`（`.mb-` プレフィックス）と `document.js` を、配色・部品・用語欄の開閉の編集元とする。
- `component-samples.html` は生成物。直接編集せず、CSS・JS・`component-samples.template.html` を変えたら、下のコマンドで再生成する。
- `build-html.py` は自身の位置から `../design-system/` を探す。`scripts/` と `design-system/` は兄弟ディレクトリのままにする。
- 原稿には `<!-- html-skill:styles -->` と `<!-- html-skill:script -->` を各 1 回だけ置く。それ以外はエラーになる。
- `document.css` 先頭の MIT ライセンス表記（mathbullet/skills 由来）は削除しない。スクリプトを使わず手で埋め込む場合も残す。

以下のコマンドはリポジトリのルートで実行する。

```bash
# 原稿に同梱 CSS・JS を埋め込み、単一 HTML を作る
python3 skills/html/scripts/build-html.py <draft.html> <output.html>

# CSS・JS・template の変更後に部品見本を再生成する
python3 skills/html/scripts/build-html.py skills/html/design-system/component-samples.template.html skills/html/design-system/component-samples.html
```

## 変更後の確認

ルートで以下を実行し、対象スキルの名前と説明が表示されること、差分に空白エラーがないことを確認する。

```bash
npx skills@latest add . --list
git diff --check
```

ステージ済みの変更には `git diff --cached --check` を使う。

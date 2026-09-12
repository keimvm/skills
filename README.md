# skills

個人用のAgent Skillsを管理するリポジトリです。

## スキル一覧

| スキル | 用途 |
| --- | --- |
| [html](skills/html/SKILL.md) | 文章や仕組みを構造化し、必要な図表を添えた単一HTMLの説明資料を作る |
| [natural-japanese](skills/natural-japanese/SKILL.md) | AIの回答を、必要な補足を添えつつ、自然で理解しやすい日本語に整える |
| [rfp](skills/rfp/SKILL.md) | 対話で言葉にした要望の骨格を、人にもエージェントにも渡せるRFP（提案依頼書）のMarkdownにまとめる |
| [thinking-partner](skills/thinking-partner/SKILL.md) | 対話で思いと要望の骨格を一緒に言語化する |
| [wait-what](skills/wait-what/SKILL.md) | 直前の説明を、背景や話のつながりを補って、やさしい日本語で短く説明し直す |

## 使い方

Node.jsとnpmが利用できる環境で実行します。
以下はGitHubの `keimvm/skills` にpushした後のコマンドです。

```bash
# スキルを選んでインストール
npx skills@latest add keimvm/skills

npx skills@latest add keimvm/skills --skill html -g
npx skills@latest add keimvm/skills --skill natural-japanese -g
npx skills@latest add keimvm/skills --skill rfp -g
npx skills@latest add keimvm/skills --skill thinking-partner -g
npx skills@latest add keimvm/skills --skill wait-what -g
```

```bash
npx skills@latest add . --list
```

`rfp`は、`thinking-partner`で骨格がまとまった後に「RFP にしますか」と聞かれて呼ばれるほか、単体でも「`$rfp` ここまでの要望をRFPにして」のように呼び出せます。目的・実現したい状態・範囲・大切にしたいことに、完了条件と成果物の形式を加えたMarkdownファイルを保存します。`thinking-partner`から呼ぶ場合も、`rfp`は別途インストールが必要です。

`thinking-partner`からRFPを作成する機能は、`rfp`に依存します。`thinking-partner`の導入・更新だけでは`rfp`は自動追加されないため、この連携を使う場合は両方をインストールしてください。要望の骨格を整理する対話は、`thinking-partner`だけで利用できます。

```bash
npx skills@latest add keimvm/skills --skill thinking-partner rfp -g
```

## 更新・削除

上の `-g` でインストールしたスキルの例です。`html` は対象のスキル名に置き換えてください。

```bash
# インストール済みのスキルを最新版へ更新
npx skills@latest update html -g

# Codexからスキルを削除
npx skills@latest remove html -g
```

プロジェクト単位で入れた場合は、そのプロジェクトで、更新時は `-g` を `-p` に変更し、削除時は `-g` を外して実行します。

## スキルの追加

1. `skills/<skill-name>/SKILL.md` を作成します。
2. 以下をひな形に、説明と手順を記述します。
3. このREADMEの一覧を更新し、ルートで `npx skills@latest add . --list` を実行して追加したスキルが表示されることを確認します。

```markdown
---
name: my-skill
description: このスキルで何を行い、どのような依頼で使うか。
---

# スキル名

エージェントが従う手順と、期待する出力を記述する。
```

ディレクトリ名と `name` を一致させ、英小文字・数字・ハイフンを使います。名前は64文字以内とし、先頭・末尾のハイフンや連続するハイフンは避けます。`description` は空にせず、1024文字以内にします。

補足資料や実行スクリプトが必要になったら、スキル配下に `references/`、`scripts/`、`assets/` を追加し、`SKILL.md` から参照します。

## 参考

- [skills CLI](https://github.com/vercel-labs/skills)
- [Agent Skills仕様](https://agentskills.io/specification)
- [htmlの移植元](https://github.com/mathbullet/skills/tree/5ab997fcb8a80da4938bacb0a86cbd568e1018a7/plugins/html/skills/html)（MIT License。配色と基本部品を継承し、用語欄の開閉・補足の折りたたみ・単一HTML出力へ調整）
- [wait-whatの着想元](https://github.com/mattpocock/skills/blob/main/skills/productivity/wait-what/SKILL.md)（日本語・汎用の会話向けに構成）

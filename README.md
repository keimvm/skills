# skills

個人用のAgent Skillsを管理するリポジトリです。

## 構成

```text
.
├── README.md
├── AGENTS.md
├── .gitignore
└── skills/
    └── requirement-dialogue/
        └── SKILL.md
```

## スキル一覧

| スキル | 用途 |
| --- | --- |
| [requirement-dialogue](skills/requirement-dialogue/SKILL.md) | 短い対話で認識を合わせ、要望の骨格を整理する |

## 使い方

Node.jsとnpmが利用できる環境で実行します。
以下はGitHubの `keimvm/skills` にpushした後のコマンドです。

```bash
# スキルを選んでインストール
npx skills@latest add keimvm/skills

# Codexで全プロジェクトから使う
npx skills@latest add keimvm/skills --skill requirement-dialogue -g -a codex
```

push前でも、このリポジトリのルートで検出を確認できます。`--list` はインストールを行いません。

```bash
npx skills@latest add . --list
```

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

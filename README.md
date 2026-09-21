# skills

個人用のAgent Skillsを管理するリポジトリです。

## スキル一覧

| スキル | 用途 |
| --- | --- |
| [html](skills/html/SKILL.md) | 文章や仕組みを構造化し、必要な図表を添えた単一HTMLの説明資料を作る |
| [natural-japanese](skills/natural-japanese/SKILL.md) | AIの回答を、必要な補足を添えつつ、自然で理解しやすい日本語に整える |
| [project-plan](skills/project-plan/SKILL.md) | 対話で企画の骨格を言葉にし、Markdownの企画書project-plan.mdに残す |
| [software-spec](skills/software-spec/SKILL.md) | 企画書を出発点に、実装に必要な最小限の要件と技術構成を対話で決め、二つのMarkdownに残す |
| [wait-what](skills/wait-what/SKILL.md) | 直前の説明を、背景や話のつながりを補って、やさしい日本語で短く説明し直す |

## 使い方

Node.jsとnpmが利用できる環境で実行します。
以下はGitHubの `keimvm/skills` にpushした後のコマンドです。

```bash
# スキルを選んでインストール
npx skills@latest add keimvm/skills

npx skills@latest add keimvm/skills --skill html -g
npx skills@latest add keimvm/skills --skill natural-japanese -g
npx skills@latest add keimvm/skills --skill project-plan -g
npx skills@latest add keimvm/skills --skill software-spec -g
npx skills@latest add keimvm/skills --skill wait-what -g
```

```bash
npx skills@latest add . --list
```

### 企画から要件定義へ

`project-plan`は「`$project-plan このアイデアの目的や範囲を整理したい`」のように呼び出します。答えを渡すのではなく、問いかけと見立てで考えを引き出す側に立ち、目的・実現したい状態・範囲・大切にしたいことの四つがそろったら、文書化の要否を聞き直さずに `project-plan.md` へ保存します。概略の完了条件と成果物の形式、未決事項を添えた、一画面に収まる企画書です。対象はソフトウェアに限りません。

`software-spec`は、企画書を渡して「`$software-spec docs/project-plan.mdから要件と技術構成を詰めたい`」のように呼び出します。実装の方向を左右する論点を一つずつ取り上げ、選択肢と推奨理由を示して判断を仰ぎ、決まったことを `software-requirements.md` と `software-stack.md` に残します。細部は実装時に委ね、まだ判断が必要な未決事項とは分けて書きます。

両スキルとも、途中でまとめを求めればその時点の内容を保存し、判断が必要な未決事項が残る場合は「検討中」と明記します。未確認・推定・案は合意事項と区別し、要件定義への引き継ぎでも確定扱いにしません。保存先はユーザー指定、既存の文書配置、標準の `docs/` の順に従います。

| スキル | 標準の出力先 |
| --- | --- |
| `project-plan` | `docs/project-plan.md` |
| `software-spec` | `docs/software-requirements.md`、`docs/software-stack.md` |

両スキルはそれぞれ文書の保存まで完結し、ほかのスキルは呼び出しません。`software-spec`は企画書があれば単体で使え、既存のRFPもファイル名や保存場所を変えずに渡せます。

### 旧スキルからの切り替え

`thinking-partner`を `project-plan` に改名し、`rfp` の文書作成機能を統合しました。旧二スキルを使っていた場合は、`project-plan`をインストールし、以後は `$project-plan` を呼び出してください。要件定義にも使う場合は、`software-spec`も最新版をインストールします。

```bash
npx skills@latest add keimvm/skills --skill project-plan -g
npx skills@latest add keimvm/skills --skill software-spec -g

# 旧スキルをグローバルにインストールしていた場合
npx skills@latest remove thinking-partner -g
npx skills@latest remove rfp -g
```

プロジェクト単位のインストールでは `-g` を外し、対象プロジェクトで実行します。過去に作成した文書を移動・改名する必要はありません。

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

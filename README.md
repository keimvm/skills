# skills

AIエージェントとの会話で、考えの整理、文章の推敲、説明資料の作成に使えるスキル集です。

## スキル一覧

| スキル | 用途 |
| --- | --- |
| [html](skills/html/SKILL.md) | 文章や仕組みを構造化し、必要な図表を添えた単一HTMLの説明資料を作る |
| [natural-japanese](skills/natural-japanese/SKILL.md) | 文章の意味を保ちながら、自然で理解しやすい日本語に整える |
| [project-plan](skills/project-plan/SKILL.md) | 対話で企画の骨格を言葉にし、Markdownの企画書 `requirements.md` に残す |
| [software-spec](skills/software-spec/SKILL.md) | 企画書を出発点に、実装に必要な最小限の要件と技術構成を対話で決め、二つのMarkdownに残す |
| [wait-what](skills/wait-what/SKILL.md) | 直前の説明を、背景や話のつながりを補って、やさしい日本語で短く説明し直す |

## インストール

Node.jsとnpmが利用できる環境で、次のコマンドを実行し、使いたいスキルと利用するエージェントを選びます。

```bash
npx skills@latest add keimvm/skills
```

スキルを指定してインストールする場合は、使いたいスキルのコマンドを実行します。

```bash
npx skills@latest add keimvm/skills --skill html -g
npx skills@latest add keimvm/skills --skill natural-japanese -g
npx skills@latest add keimvm/skills --skill project-plan -g
npx skills@latest add keimvm/skills --skill software-spec -g
npx skills@latest add keimvm/skills --skill wait-what -g
```

`-g` は、プロジェクトを問わず使えるようにインストールする指定です。特定のプロジェクトだけで使う場合は、そのディレクトリで `-g` を外して実行します。

## 使い方

Codexでは、会話に `$スキル名` と依頼内容を入力して呼び出します。ほかのエージェントでは、それぞれのスキルの呼び出し方に従ってください。

| スキル | 呼び出し例 |
| --- | --- |
| `html` | `$html この仕組みを、図を交えたHTMLの説明資料にして` |
| `natural-japanese` | `$natural-japanese この文章を自然な日本語に整えて` |
| `project-plan` | `$project-plan このアイデアの目的や範囲を整理したい` |
| `software-spec` | `$software-spec docs/requirements.mdから要件と技術構成を詰めたい` |
| `wait-what` | `$wait-what 今の説明をもう少しかみ砕いて` |

対象の文章・資料は、依頼と一緒に貼り付けるか、ファイルを指定してください。`html` の成果物は、ブラウザで直接開ける単一のHTMLファイルです。

### 企画から要件定義へ

アイデアを整理するところから始めるなら、まず `project-plan` を呼び出します。一度に一つの問いに答えながら、目的・実現したい状態・範囲・大切にしたいことを整理し、まとまった内容を企画書に保存します。ソフトウェア以外の企画にも使えます。

ソフトウェアとして実現するための要件と技術構成を決めたいときは、保存した企画書を指定して `software-spec` を呼び出します。選択肢と推奨理由を確認しながら一つずつ決め、要件と技術構成を二つの文書に残します。対話の中で企画の目的や範囲が変わったときは、企画書も合わせて更新します。実装は、文書ができた後に別途依頼してください。すでに企画書があれば、`software-spec` から始められます。企画書のファイル名や保存場所を変える必要はありません。企画書がない場合は、会話で伝えた内容から始めるか、先に `project-plan` で企画書を作るかを選べます。

どちらも、途中で「ここまでを保存して」と頼めます。未確認・推定・案・未決事項は、決まったことと区別して残します。保存先を指定しなければ、既存の文書配置に合わせ、配置が決まっていない場合は次の場所に保存します。

| スキル | 標準の出力先 |
| --- | --- |
| `project-plan` | `docs/requirements.md` |
| `software-spec` | `docs/software-requirements.md`、`docs/software-stack.md` |

## 更新・削除

`-g` でインストールしたスキルの例です。`html` は対象のスキル名に置き換えてください。

```bash
# インストール済みのスキルを最新版へ更新
npx skills@latest update html -g

# スキルを削除
npx skills@latest remove html -g
```

プロジェクト単位で入れた場合は、そのプロジェクトで、更新時は `-g` を `-p` に変更し、削除時は `-g` を外して実行します。

## 関連リンク・クレジット

- [skills CLI](https://github.com/vercel-labs/skills)
- [htmlの移植元](https://github.com/mathbullet/skills/tree/5ab997fcb8a80da4938bacb0a86cbd568e1018a7/plugins/html/skills/html)（MIT License。配色と基本部品を継承し、用語欄の開閉・補足の折りたたみ・単一HTML出力へ調整）
- [wait-whatの着想元](https://github.com/mattpocock/skills/blob/main/skills/productivity/wait-what/SKILL.md)（日本語・汎用の会話向けに構成）

/**
 * rename-script.js
 * Node.js v18+
 */
const fs = require("fs");
const path = require("path");

// ディレクトリ設定（既存前提）
const SRC_DIR = path.join(__dirname, "files");
const RENAMED_DIR = path.join(__dirname, "renamed");
const NOT_FOUND_DIR = path.join(__dirname, "notFound");

// ★ {oldName, newName} の置換ルール (list.json から読み込み)
const nameMap = JSON.parse(
	fs.readFileSync(path.join(__dirname, "list.json"), "utf-8")
);

function main() {
	// 出力フォルダが無い場合はエラー
	if (!fs.existsSync(SRC_DIR)) {
		console.error(`files フォルダが見つかりません。`);
		process.exit(1);
	}

	// 出力フォルダ作成()上書きされなかったらこっちを採用)
	for (const dir of [RENAMED_DIR, NOT_FOUND_DIR]) {
		if (!fs.existsSync(dir)) {
			console.log(`フォルダがなかったため作成します: ${dir}`);
			fs.mkdirSync(dir, { recursive: true });
		}
	}

	// file/** のファイル一覧
	const files = fs.readdirSync(SRC_DIR);

	for (const filename of files) {
		const srcPath = path.join(SRC_DIR, filename);

		// ディレクトリはスキップ
		if (fs.statSync(srcPath).isDirectory()) continue;

		// oldName にマッチするルールをすべて取得
		const rules = nameMap.filter((r) => r.oldName === filename);

		if (rules.length > 0) {
			// マッチするルールが1つ以上ある場合
			rules.forEach((rule, index) => {
				const destPath = path.join(RENAMED_DIR, rule.newName);

				if (index === rules.length - 1) {
					// 最後のルールは移動（元ファイルを削除）
					fs.renameSync(srcPath, destPath);
					console.log(`✔ 移動しました: ${filename} → renamed/${rule.newName}`);
				} else {
					// それ以外はコピー（元ファイルは残す）
					fs.copyFileSync(srcPath, destPath);
					console.log(
						`✔ コピーしました: ${filename} → renamed/${rule.newName}`
					);
				}
			});
		} else {
			// 見つからない → notFound/** へ移動
			const destPath = path.join(NOT_FOUND_DIR, filename);
			fs.renameSync(srcPath, destPath);
			console.log(`✘ 見つかりません: ${filename} → notFound`);
		}
	}
}

main();

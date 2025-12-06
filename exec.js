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

// ★ {oldName, newName} の置換ルール (リスト.json から読み込み)
const nameMap = JSON.parse(
	fs.readFileSync(path.join(__dirname, "リスト.json"), "utf-8")
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

		// oldName マッチするルールを探す
		const rule = nameMap.find((r) => r.oldName === filename);

		if (rule) {
			// 一致 → renamed/** へ移動
			const destPath = path.join(RENAMED_DIR, rule.newName);
			fs.renameSync(srcPath, destPath);
			console.log(`✔ Moved: ${filename} → renamed/${rule.newName}`);
		} else {
			// 見つからない → notFound/** へ移動
			const destPath = path.join(NOT_FOUND_DIR, filename);
			fs.renameSync(srcPath, destPath);
			console.log(`✘ Not found: ${filename} → moved to notFound/`);
		}
	}
}

main();

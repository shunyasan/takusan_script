#!/bin/bash

# ファイルリネームスクリプトの実行
# chmod +x run.command で権限追加

# スクリプトのディレクトリに移動
cd "$(dirname "$0")"

# Node.jsがインストールされているか確認
if ! command -v node &> /dev/null
then
    echo "エラー: Node.jsがインストールされていません。"
    echo "https://nodejs.org/ からNode.jsをインストールしてください。"
    read -p "Enterキーを押して終了..."
    exit 1
fi

# exec.jsを実行
echo "ファイルのリネーム処理を開始します..."
echo ""
node exec.js

# 実行結果を確認
if [ $? -eq 0 ]; then
    echo ""
    echo "処理が完了しました。"
else
    echo ""
    echo "エラーが発生しました。"
fi

# macOSでターミナルが閉じないように待機
# read -p "Enterキーを押して終了..."

@echo off
chcp 65001 > nul
setlocal

REM ファイルリネームスクリプトの実行

REM スクリプトのディレクトリに移動
cd /d "%~dp0"

REM Node.jsがインストールされているか確認
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo エラー: Node.jsがインストールされていません。
    echo https://nodejs.org/ からNode.jsをインストールしてください。
    pause
    exit /b 1
)

REM exec.jsを実行
echo ファイルのリネーム処理を開始します...
echo.
node exec.js

REM 実行結果を確認
if %ERRORLEVEL% equ 0 (
    echo.
    echo 処理が完了しました。
) else (
    echo.
    echo エラーが発生しました。
)

pause

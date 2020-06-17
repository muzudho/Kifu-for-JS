# Kifu for JS (ver. 2.0.0)

作り直し。

## 書き直し

以下のWebサイトから、NodeJSをインストールしてください。  

[nodejs](https://nodejs.org/ja/)  

カレント・ディレクトリーを移動してください。  
例:  

```shell
cd C:/Users/むずでょ/source/repos/kifu-for-js
```

もし、初めてダウンロードしたときに、以下のものがあれば、削除してください。

* /package-lock.json ファイル
* /node_modules フォルダー
* packages.json のリストから `babel-jest` パッケージを除外してください。

```shell
# 元のソースが deprecated のコードをアップデートしていないので、アップデートしようぜ☆（＾～＾）
npm install -g npm-check-updates
ncu -u

npm cache clean --force

npm install

# 脆弱性が見つかったなら、以下のコマンドを打鍵してください
npm audit fix
# それでもまだ脆弱性が取れなかったら、以下のコマンドを打鍵してください
npm audit fix --force
```

`create-react-app` パッケージをインストールするために、以下のコマンドを打鍵してください。  

Input:  

```shell
npm install -g create-react-app
```

プロジェクトを作成するために、以下のコマンドを打鍵してください。  

Input:  

```shell
npx create-react-app myfirstreact
ncu -u
npm install
npm audit fix
```

## 概要
* Kifu for JSは，Kifu for FlashやJava同様，HTML内で棋譜を読み込み表示，再生を行う．
	* **KIF**, **KI2**, **CSA**, [**JKF**](https://github.com/na2hiro/json-kifu-format)形式に対応．
* Kifu for JSブックマークレットは，1クリックで
	* Kifu for FlashやKifu for JavaをKifu for JSに置き換えて盤面を表示する．
	* 選択された棋譜テキストから盤面を表示する．
* Flash, Javaなどを必要としないため，iOSやAndroidでも表示できる

## 動作例
[**こちら**](http://na2hiro.github.io/Kifu-for-JS/examples/example.html)

## Kifu for JS ブックマークレット
1クリックでKifu for {Flash/Java}をKifu for JSに置き換えて盤面を表示します．
また，棋譜テキストを選択してブックマークレットを開くことで，盤面を表示できます．

### 使い方(Java/Flash置換)

1. あらかじめ次のコードをブックマークへ追加しておく→
`javascript:!function(){var s=document.createElement("script");s.src="https://na2hiro.github.io/Kifu-for-JS/src/public-bookmarklet.min.js",document.body.appendChild(s)}();void 0;`
2. Kifu for FlashやKifu for Javaが使われているページ([例](http://live.shogi.or.jp/oui/kifu/55/oui201409100101.html))を開く
![](https://na2hiro.github.io/Kifu-for-JS/readme-ss/1.png)
3. ブックマークレットを開く
![](https://na2hiro.github.io/Kifu-for-JS/readme-ss/2.png)
4. FlashやJava部分が置き換えられ，Kifu for JSの再生盤になる
![](https://na2hiro.github.io/Kifu-for-JS/readme-ss/3.png)

### 使い方(棋譜テキスト)

1. あらかじめブックマークレットを追加しておく
2. 棋譜テキストが書かれているページ([例](http://shogikakolog.web.fc2.com/part121.htm))を開く
3. 棋譜テキストを選択する
![](https://na2hiro.github.io/Kifu-for-JS/readme-ss/select-1.png)
4. ブックマークレットを開く
5. 棋譜テキストの直後にKifu for JSの再生盤が表示される
![](https://na2hiro.github.io/Kifu-for-JS/readme-ss/select-2.png)

## Kifu for JS
### 機能
既にKifu for Flashとほぼ同等以上の機能を備えています．

* 対応棋譜形式: **kif**, **ki2**, kifu, ki2u, **csa**, jkf
* 駒落ちや詰将棋等の初期局面指定にも対応
* 変化手順の再生が可能
* 棋譜中継のための自動更新機能
* 棋譜クリックや矢印キーでの再生
* 棋譜入力機能
	* 再生中に本譜以外の手を進めることができる
	* 進めた手は変化手順(分岐)として格納
* 棋譜読み込み機能
	* 棋譜ファイルをドラッグ&ドロップで読み込み

### 設置方法
[Releases](https://github.com/na2hiro/json-kifu-format/releases) からどうぞ．`kifu-for-js-*.*.*.min.js`を読み込むと，`KifuForJS` が使えるようになります．

jQuery(2.1以降で動作確認), kifuforjs.js (`test/loadKif.html`にコード例)

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script src="./kifu-for-js-2.0.0.min.js" charset="utf-8"></script>
```

`KifuForJS.load` (v1では`Kifu.load`)関数にkifファイルのアドレスを渡して呼び出すと，この場所に盤面を表示する．

```html
<script>KifuForJS.load("../json-kifu-format/jt201409130101.kif");</script>
```

第二引数にidを渡すと，このコードがある場所ではなく，そのidを持つ要素の子の位置に盤面を挿入する．この方法の場合，ひと通り読み込みが済んでから挿入されるため，scriptはhead内などにあってもよい．

```html
<script>KifuForJS.load("../json-kifu-format/jt201409130101.kif", "board");</script>
〜
<div id="board"></div>
```

## 動作環境
以下は確認済み．

* Mac Chrome 37
* Mac Firefox 32
* Mac Safari 8
* Windows Internet Explorer 11
* Android Chrome 37
* Android Firefox 32
* Android Habit 1.1
* iOS 8 Safari

以下は手元に確認環境がありません．情報を[@na2hiro](https://twitter.com/na2hiro)までお待ちしています．

* Internet Explorer 10以下

## お願い

* 棋譜形式の対応には注意を払っていますが，もし動作しない棋譜がありましたら対応しますので，Twitterやissuesでご報告いただければ幸いです．
* 要望やバグ報告は[issues](https://github.com/na2hiro/Kifu-for-JS/issues)へよろしくお願いします．
* 棋譜形式そのものについては[JSON棋譜フォーマット](https://github.com/na2hiro/json-kifu-format)もご参照ください．

## 開発環境

Input with any user:  

```shell
npm install
```

上記コマンドを実行することで開発に必要なパッケージをインストールできます．

* [na2hiro/json-kifu-format](https://github.com/na2hiro/json-kifu-format) 1.0: 将棋の盤駒を扱うライブラリ
* [na2hiro/Shogi.js](https://github.com/na2hiro/Shogi.js): 将棋の盤駒を扱うライブラリ
* TypeScript 2
* React 16
* React DnD
* MobX
* Webpack 3 (バンドルツール)
* Jest (テストフレームワーク，カバレッジ計測)
* TSLint (Linter)

### コマンド

package.json ファイルから、  

```plain
"start": "./node_modules/webpack-dev-server/bin/webpack-dev-server.js --open",
```

の行を

```plain
"start": "node ./node_modules/webpack-dev-server/bin/webpack-dev-server.js --open",
```

に置き換えます。

Input with any user:  

```shell
npm run start
```

開発用サーバが立ち上がり，`examples/`以下の`example.html`や`loadJkf.html`にアクセスすることで動作を確認できます．

```
npm install --save-dev @babel/preset-env
npm install --save-dev @babel/plugin-proposal-decorators 
# npm add @babel/runtime
npm install babel-preset-react-app

npm run build
npm run build:watch
npm run build:analyze
```

ビルドが走ります．`build:watch`の場合，変更されるたびにビルドが走ります．`build:analyze`の場合，バンドルの大きさの可視化ができます．

```
$ npm run test:watch
```

コンソールでテスト結果が表示されます．コードの変更が保存されるたびに必要なテストが再実行されるため，実装が既存の有効なテストを壊してないか簡単に確認できます．

```
$ npm run test
```

全てのテストが走るとともにカバレッジレポートが表示されます．`coverage/lcov-report/index.html`では，行ごとのカバレッジを確認できます．追加されたコードのブランチカバレッジが100%になるようにしてください．push時にチェックされ満たしていなければ却下されるはずです．

```
$ npm run lint
```

コードの品質が検査されます．エラーがあればそれに従い直してください．push前にもチェックされます．

```
$ npm run lint:fix
```

自動的に修正可能な問題(インデント等)を直してくれます．

## license
[Shogi images by muchonovski](http://mucho.girly.jp/bona/) below `images` directory are under a [Creative Commons 表示-非営利 2.1 日本 License](http://creativecommons.org/licenses/by-nc/2.1/jp/).

Other files are released under MIT license. See LICENSE.txt.

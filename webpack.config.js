//node.js 환경에서 작동한다
const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
//export
module.exports = {
  //파일을 읽어들이기 시작하는 진입점 설정(js 파일을 사용)
  entry: './js/main.js',
  //결과물(bundles)을 반환하는 설정
  output: {
    // path: path.resolve(__dirname, 'public'),
    // filename: 'main.js',
    clean: true
  },

  module: {
    rules: [
      {
        test: /\.s?css$/,  //.scss or .css로 끝나는 것을 찾는 정규식
        use: [
          'style-loader',  //해석된 내용을 index.html에 삽입해줌. 실행순서 4번째
          'css-loader',  //js가 css를 해석하게 해준다.  실행순서 3번째
          'postcss-loader', //공급업체 접두사 적용  실행순서 2번째
          'sass-loader' // scss 해석     실행순서 1번째
        ]
      },
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ]
      }
    ]
  },

  plugins: [
    new HtmlPlugin({
      template: './index.html'
    }),
    //static 폴더 안의 파일들을 dist 폴더로 복사해주는 플러그인이로 patterns라는 옵션에 명시
    //배열 []은 이러한 경로들을 여러개 명시할 수 있도록 배열을 사용한다.
    new CopyPlugin({
      patterns: [
        { from: 'static'}
      ]
    })
  ],
  devServer: {
    host: 'localhost'
  }
}

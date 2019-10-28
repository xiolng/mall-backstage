module.exports = {
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
        "jest": true
    },
    "plugins": ["react"],
    "settings": {
        "react": {
            "createClass": "createReactClass",
            "pragma": "React",
            "version": "detect",
            "flowVersion": "0.53"
        },
        "propWrapperFunctions": [
            "forbidExtraProps",
            {"property": "freeze", "object": "Object"},
            {"property": "myFavoriteWrapper"}
        ]
    },
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "ecmaVersion": 6,
        "sourceType": "module"
    },
    "extends": "standard",
    "rules": {
        "indent": [0, 4, {
            "SwitchCase": 1
        }], //tab缩进4格
        // "no-extra-semi": "error", //禁止分号
        "semi": [
          "error",
          "always"
        ],
        "eol-last": 1, //
        // allow paren-less arrow functions
        "arrow-parens": 1,
        "padded-blocks": 1,
        // allow async-await
        "generator-star-spacing": 1,
        "quotes": 1, //单双引号关闭检验
        "no-unused-vars": 0, //关闭检验系统变量
        "no-multiple-empty-lines": 1,
        "space-before-function-paren": [0, "always"], //es方法小括号前面禁止空格
        "object-curly-spacing": 1, //关闭对象 大括号换行检验
        "no-extra-boolean-cast": 1 //禁止不必要的bool转换
    }
}

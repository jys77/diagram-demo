// 本规则在airbnb基础规则上进行了定制
// airbnb规则：https://lin-123.github.io/javascript/
module.exports = {
    // 兼容ts,配置eslint的解析器
    parser: '@typescript-eslint/parser',
    // 解析器选项
    parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 6,
        //指定ESLint可以解析JSX语法
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    // 设置环境变量
    env: {
        es6: true,
        browser: true,
        node: false,
    },
    // 设置扩展项目
    extends: [
        // 使用airbnb的规则
        'airbnb-typescript',
        // 检查react相关规则
        'plugin:react/recommended',
        // 启用typescript规则
        'plugin:@typescript-eslint/recommended',
        // 使用prettier中的样式规范，且如果使得ESLint会检测prettier的格式问题，同样将格式问题以error的形式抛出
        // 'plugin:prettier/recommended',
    ],
    // 插件
    plugins: ['@typescript-eslint'],
    // 全局配置
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
        module: true,
    },
    // 共享设置
    settings: {
        'import/extensions': ['.ts', '.tsx', '.d.ts'],
        'import/resolver': {
            node: {
                extensions: ['.ts', 'tsx', '.d.ts'],
            },
        },
        //自动发现React的版本，从而进行规范react代码
        react: {
            pragma: 'React',
            version: 'detect',
        },
    },
    //自定义规则
    rules: {
        // 注释以空格开头
        'spaced-comment': ['error', 'always'],
        // 在代码上方注释（便于IDE读取）
        'line-comment-position': [
            'error',
            {
                position: 'above',
            },
        ],
        // 引用都被使用
        'import/no-unresolved': [
            'error',
            {
                ignore: ['@*', 'react'],
            },
        ],
        // 尽可能得使用default导出
        'import/prefer-default-export': ['warn'],
        // 在类中不使用this的函数不必要使用static静态声明
        'class-methods-use-this': 'off',
        // 可以在return中使用await
        'no-return-await': 'off',
        // 尽可能得不要修改参数，使用拷贝后的值
        'no-param-reassign': 'warn',
        // 一行长度限制
        'max-len': 'off',
        // 强制使用unix的结尾符
        'linebreak-style': [0, 'error', 'unix'],
        // 可以使用一元运算符
        'no-plusplus': 'off',
        // 尽可能得使用有效转义字符
        'no-useless-escape': 'warn',
        // 引用可以来自dev依赖
        'import/no-extraneous-dependencies': [
            'warn',
            {
                devDependencies: true,
            },
        ],
        // 不允许有未使用的变量(一个声明了但未使用的变量更像是由于重构未完成产生的错误。这种在代码中出现的变量会使阅读者迷惑)
        '@typescript-eslint/no-unused-vars': ['error'],
        // 关闭prop-types类型检查（类型检查依赖ts）
        'react/prop-types': 'off',
        // 关闭a标签必须使用href
        'jsx-a11y/anchor-is-valid': 'off',
        // 关闭禁止解构Props
        'react/jsx-props-no-spreading': 'off',
        // 箭头函数要求有返回值
        'consistent-return': 'warn',
        // jsx代码需要括号wrap
        'react/jsx-wrap-multilines': 'warn',
        'react/display-name': 'warn',
        // 可以位运算
        'no-bitwise': 'off',
        // 大括号不得省略
        'curly': ['error', 'all'],
        // jsx换行
        'react/jsx-one-expression-per-line': 'off',
        // 三元表达式嵌套
        'no-nested-ternary': 'warn',
        // index做为key
        'react/no-array-index-key': 'warn',
        // 没有交互的html元素绑定点击事件
        'jsx-a11y/no-noninteractive-element-interactions': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        // 私有属性
        'no-underscore-dangle': 'off',
    },
};

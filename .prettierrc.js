module.exports = {
    // 使用单引号, 默认false
    singleQuote: true,
    // 尾随逗号
    trailingComma: 'all',
    // 设置prettier单行输出(不折行)的(最大)长度
    printWidth: 120,
    // 如何解析无法识别的文件
    overrides: [
        {
            files: '.prettierrc',
            options: { parser: 'json' },
        },
    ],
    // 在语句末尾打印分号
    semi: true,
    // 在对象文字中的括号之间保留空格。
    bracketSpacing: true,
    // 将多行JSX元素的闭合符>放在下一行
    jsxBracketSameLine: false,
    // 箭头函数只有一个参数时使用括号包裹
    arrowParens: 'always',
    // 在文件顶部插入一个特殊的@format标记，表明该文件需要被prettier格式化
    insertPragma: false,
    // 指定每个缩进级别的空格数
    tabWidth: 2,
    // 使用空格而不是制表符缩进行
    useTabs: false,
    // 结尾符
    endOfLine: 'lf',
};

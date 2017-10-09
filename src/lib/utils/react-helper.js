import {createElement} from 'react';

const __DEV__ = window.__DEV__;

/* global __DEV__ */
const helper = function (tagOrComp, classNameOrProps, props = undefined, ...content) {
    if (__DEV__) {
        if ((classNameOrProps && classNameOrProps.$$typeof)
            || (typeof classNameOrProps === 'string'
            && (props && props.$$typeof || (typeof props !== 'object' && props)))
        ) {
            console.error('[ERROR] helper 函数调用出错, 正确为 `h.div(\'class-name\', {propName: SOME_VALUE}, ...)` '
                + '或者`h.div({propName: SOME_VALUE}, ...)`', tagOrComp);
        }
    }

    if (typeof classNameOrProps === 'object') {
        return createElement(tagOrComp, classNameOrProps, props, ...content);
    }
    props = props || {};
    props.className = props.className || classNameOrProps;
    return createElement(tagOrComp, props, ...content);
};

[
    'div',
    'span',
    'a',
    'img',
    'pre',

    // 标题
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',

    // 表格相关
    'table',
    'thead',
    'tbody',
    'th',
    'tr',
    'td',

    // 文档语义化
    'aside',
    'header',
    'footer',
    'section',
    'article',

    // 行内样式
    'em',
    'strong',

    // 不建议使用
    'i',
    'b',

    // 表单
    'label',
    'input',
    'button',
    'textarea',
    'p',
    'select',
    'option',
    'form',

    // 列表
    'ul',
    'ol',
    'li',

    // media
    'video',
    'audio',

    'iframe',
    'colgroup',
    'col',
    'area'
].forEach(tag => {
    helper[tag] = helper.bind(null, tag);
});

export default helper;

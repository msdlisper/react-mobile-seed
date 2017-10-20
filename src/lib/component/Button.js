/**
 * @file --
 * @author zhangpeng
 */

import {
    inject,
    observer,
    React,
    h
} from '../utils/default';


@inject('context') @observer
export class Button extends React.Component {
    render() {
        return h.button({
            style: {
                background: this.props.context.a
            }
        }, this.props.children);
    }
}
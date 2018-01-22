/**
 * @file
 * @author zhangpeng
 */

import {
    Component,
    h,
    observer,
    action,
    inject,
    observable
} from 'utils/default';

import style from './page.use.less';

import fastdom from 'fastdom';
import moment from 'moment';
import messageIcon from 'images/message.png';
import {
    Dialog
} from 'hi-ui';
@inject('context') @observer
export default class extends Component {
    constructor(props) {
        super(props);
        this.user = {
            headImage: '',
            userName: '路人甲',
            departmentName: '流程酱油部'
        };
    }


    componentWillMount() {
        style.use();
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {}

    componentWillUnmount() {
        fastdom.mutate(() => {
            style.unuse();
        });
    }


    showHello = content => {
        /* 普通弹窗 */
        const dialog = new Dialog({
            target: document.querySelector('.dialog'),
            data: {
                title: 'HIUI',
                content
            }
        });
        dialog.show();

    }


    render() {
        return h.div(style.locals.pageUse + ' user-page', {},
            h.div('user-head', {},
                h.div('img', {},
                    h.img({
                        src: 'https://note.youdao.com/web/images/02292a2c.dummy_user.jpg'
                    })
                ),
                h.div('info', {},
                    h.div('name', {}, this.user.userName),
                    h.div('department', {}, this.user.departmentName)
                )
            ),
            h.div('user-info', {
                    ref: r => r && (this.dialogRef = r),
                    onClick: e => this.showHello('hi'),
                },
                h.spansvg('icon-camera blue', 'icon', {})
            ),
            h.div('dialog', {})
        );
    }
}
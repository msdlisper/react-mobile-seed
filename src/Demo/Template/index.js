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

    componentWillReceiveProps(nextProps) {}

    componentWillUnmount() {
        fastdom.mutate(() => {
            style.unuse();
        });
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
            )
        );
    }
}
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
} from '../../lib/utils/default';

import style from './page.use.less';

import fastdom from 'fastdom';
import moment from 'moment';

@inject('context') @observer
export default class extends Component {
    constructor(props) {
        super(props);
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
        return h.div(style.locals.pageUse, {},
            h.div('test', {}, 'hi ' + moment().format('MMMM Do YYYY, h:mm:ss a'))
        );
    }
}
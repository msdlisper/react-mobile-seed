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
            headImage: 'iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAIAAAC2BqGFAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMzgwMTE3NDA3MjA2ODExODIyQUJEOTcyREQwQTM4NSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxQjBBREJEQzdBNkMxMUUzQUYwMzkxNUY1QzJBQTZCRCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxQjBBREJEQjdBNkMxMUUzQUYwMzkxNUY1QzJBQTZCRCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDM4MDExNzQwNzIwNjgxMTgyMkE4OTk0MjZEQTQ3RjciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDM4MDExNzQwNzIwNjgxMTgyMkFCRDk3MkREMEEzODUiLz4gPC9yZGY6RGVzY3Jp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',
            userName: '路人甲',
            departmentName: '流程酱油部'
        }
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
                    this.user.headImage
                    ? h.img({
                        src: 'data:image/png;base64,' + this.user.headImage
                    })
                    : null
                ),
                h.div('info', {},
                    h.div('name', {}, this.user.userName),
                    h.div('department', {}, this.user.departmentName)
                )
            )
        );
    }
}
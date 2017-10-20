/**
 * @file --
 * @author zhangpeng
 */

import {
    React,
    h,
    observer
} from '../utils/default';
import {
    Button
} from './Button';
export class Message extends React.Component {

    fun = () => {
        console.log('ss');
    }
    render() {
        // return  <div > {this.props.text} <Button> Delete </Button> </div>;
        return h.div({},
            this.props.text,
            h(Button, {}, 'Delete')
        );
    }
}
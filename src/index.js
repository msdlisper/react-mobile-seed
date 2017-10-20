/**
 * @file --
 * @author zhangpeng
 */


import {
    render
} from 'react-dom';
import {
    hashHistory,
    Router,
    Redirect
} from 'react-router';
import {
    h,
    Provider
} from './lib/utils/default';
import {
    Message
} from './lib/component/Message';

import {
    routes
} from './routes';

render(
    h(Provider, {
            context: {
                a: 'red'
            }
        },
        h(Router, {
            routes,
            history: hashHistory
        })
    ),
    document.getElementById('root')
);
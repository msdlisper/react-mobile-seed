/**
 * @file --
 * @author zhangpeng
 */

import App from './App';


export const routes = {
    path: '/',
    component: App,
    indexRoute: {
        getComponent(location, callback) {
            require.ensure([], () => {
                let Page = require('./project/Template').default;
                callback(null, Page);
            });
        },
    },
    childRoutes: [{
        path: 'template',
        // component: Template,
        indexRoute: {
            getComponent(location, callback) {
                require.ensure([], () => {
                    let Page = require('./project/Template').default;
                    callback(null, Page);
                });
            }
        },

        childRoutes: [{
            path: 'test',
            indexRoute: {
                getComponent(location, callback) {
                    require.ensure([], () => {
                        let Page = require('./project/Test').default;
                        callback(null, Page);
                    });
                }
            }
        }]
    }, {
        path: 'test',
        indexRoute: {
            getComponent(location, callback) {
                require.ensure([], () => {
                    let Page = require('./project/Test').default;
                    callback(null, Page);
                });
            }
        }
    }]
};
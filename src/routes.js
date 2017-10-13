import App from './App';
// import Template from './project/Template';
// import Old from './project/Old';


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
            },
        },

        childRoutes: [{
            path: 'old',
            indexRoute: {
                getComponent(location, callback) {
                    require.ensure([], () => {
                        let Page = require('./project/Old').default;
                        callback(null, Page);
                    });
                },
            },
        }]
    }, {
        path: 'old',
        indexRoute: {
            getComponent(location, callback) {
                require.ensure([], () => {
                    let Page = require('./project/Old').default;
                    callback(null, Page);
                });
            },
        },
    }]
}
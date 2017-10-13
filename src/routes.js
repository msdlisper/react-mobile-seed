import App from './App';
import Template from './project/Template';
import Old from './project/Old';


export const routes = {
    path: '/',
    component: App,
    indexRoute: {
        component: Template
    },
    childRoutes: [{
        path: 'template',
        // component: Template,

        childRoutes: [{
            path: 'old',
            component: Old,
            onChange(prevState, nextState, replace, cb) {
                console.log(prevState)
                replace('/old');
            },
        }]
    }, {
        path: 'old',
        component: Template,
        onChange(prevState, nextState, replace, cb) {
            console.log(prevState)
            // replace('old');
        }
    }]
}
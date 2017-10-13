import {Component, h, observer, observable, action, inject} from 'lib/utils/default';

@inject('context') @observer
export default class App extends Component {


    constructor(props) {
        super(props);
        this.state = this.props.context.app;
    }

   
    componentWillMount() {
      
    }

    componentWillReceiveProps(nextProps) {}

    
    render() {
		return h.div('content', {},
            this.props.children
        );
    }
}

// import _ from 'lodash';
// import './style.css';
// import Icon from './icon.jpg';

// function component() {
//   var element = document.createElement('div');

//   // Lodash, currently included via a script, is required for this line to work
//   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//   element.classList.add('hello');

//   var myIcon = new Image();
//   myIcon.src = Icon;

//   element.appendChild(myIcon);
//   return element;
// }

// document.body.appendChild(component());
import {
    render
} from 'react-dom';
import {h} from './lib/utils/default';
render(
    h.div('hi', {}, 'hhhh'), document.getElementById('root')
)
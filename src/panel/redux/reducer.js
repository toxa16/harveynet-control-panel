import { combineReducers } from 'redux';

import machines from './machines';
import control from './control';


const panel = combineReducers({ machines, control });

export default panel;

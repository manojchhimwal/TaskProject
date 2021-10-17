import {createStore} from 'redux';
import Reducer from './Reducer/combineReducer';

const Store = createStore(Reducer, {});

export default Store;

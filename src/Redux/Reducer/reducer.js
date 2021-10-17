import {Giphy} from '../Constants/Constans';

export const SelectedGiphy = (state = {}, action) => {
  switch (action.type) {
    case Giphy.SELECTED_GIPHY:
      return {
        ...action.payload,
      };

    default:
      return state;
  }
};

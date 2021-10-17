import {Giphy} from '../Constants/Constans';
export const SelectedGiphy = data => {
  return {
    type: Giphy.SELECTED_GIPHY,
    payload: data,
  };
};

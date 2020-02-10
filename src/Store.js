import React from "react";
export const Store = React.createContext();
export function StoreProvider(props) {
  const initialState = {
    user: {},
    entries: [],
    currentPage: 1,
    displayUploadModal: false,
    temporaryFeatureImage: "",
    imageGallery:[],
    maximizeEditor: false
  };
  function reducer(state, action) {
    switch (action.type) {
      case "SET_CURRENT_USER":
        return {
          ...state,
          user: action.userData
        };
      case "FETCH_ALL_PUBLIC_ENTRIES":
        return {
          ...state,
          entries: action.entries,
          currentPage: action.currentPage
        };
      case "SET_TEMPORARY_FEATURE_IMAGE":
        return { ...state, temporaryFeatureImage: action.payLoad };
      case "ADD_ENTRY":
        return {
          ...state,
          entries: state.entries.concat([action.entries]),
          currentPage: action.currentPage
        };
        case "SET_IMAGE_GALLERY":
        return {
          ...state,
          imageGallery: state.imageGallery.concat(action.gallery)
        };
        case "TOGGLE_EDITOR_SIZE":
          return {...state, maximizeEditor:action.payload}
      default:
        return state;
    }
  }
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}

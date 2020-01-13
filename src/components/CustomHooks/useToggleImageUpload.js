import { useContext } from "react";
import { Store } from "../../Store";
const useToggleImageUpload = () => {
    const { dispatch } = useContext(Store);
    const dispatchToggleUpload = () => {
      return dispatch({
        type: "TOGGLE_UPLOAD_MODAL"
      });
    };
    return {
      dispatchToggleUpload
    };
  };
  export default useToggleImageUpload
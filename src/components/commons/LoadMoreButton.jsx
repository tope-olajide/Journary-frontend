import React from 'react';
const LoadMoreButton = ({isLoading}) => {
    if (isLoading){
     return (
         <>
<button disabled = 'true' className="fit" ><div class="loader"></div> </button>
         </>
     )}
     return (<>
   <button className="fit load-more" >Load More </button>  
     </>
     )
}
export default LoadMoreButton
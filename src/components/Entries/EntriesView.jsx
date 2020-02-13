import React from 'react'
import Image from 'react-graceful-image'
import { Link } from "react-router-dom";
const EntriesView = ({title, entry_image_url, entry_id}) => {
    return (
        <><Link className="entry"  to={`/entry-details/${entry_id}`}>
      <Image className="column-img"alt={entry_image_url} src={entry_image_url} />
      
        <div class="entry-title">
          <h1>{title}</h1>
        </div>
      </Link>
        </>
    )
}
export default EntriesView
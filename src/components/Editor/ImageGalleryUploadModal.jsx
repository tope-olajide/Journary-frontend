import React, {useContext} from "react";
import useToggleImageUpload from '../CustomHooks/useToggleImageGallery'
import ImageGallery from '../ImageGallery/ImageGallery'
import UploadNewImage from '../ImageGallery/UploadNewImage'
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Store } from "../../Store";
const ImageGalleryUploadModal = ({addImage, toggleGalleryModal}) => {
    return (
      <>
        <Tabs>
          <section className="editor-image-modal" >
            <section className="modal-header">
              <span onClick={toggleGalleryModal} className="close">&times;</span>
              <TabList className="tab-nav">
                <Tab selectedClassName="tab-nav-active">
                  <p>Image Gallery</p>
                </Tab>
                <Tab selectedClassName="tab-nav-active">
                  <p>Upload New</p>
                </Tab>
              </TabList>
            </section>
            <div class="modal-body">
              <TabPanel>
               <ImageGallery addImage={addImage} toggleGalleryModal={toggleGalleryModal} />
               
              </TabPanel>
              <TabPanel>
               <UploadNewImage />
               
              </TabPanel>
            </div>
          </section>
        </Tabs>
      </>
    );
  };
  export default ImageGalleryUploadModal
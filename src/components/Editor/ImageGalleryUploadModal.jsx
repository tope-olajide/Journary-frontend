import React from "react";
import useToggleImageUpload from '../CustomHooks/useToggleImageUpload'
import ImageGallery from '../ImageGallery/ImageGallery'
import UploadNewImage from '../ImageGallery/UploadNewImage'
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
const ImageGalleryUploadModal = ({addImage}) => {
    const { dispatchToggleUpload } = useToggleImageUpload();
    const toggleUploadView = () => {
      return dispatchToggleUpload();
    };
    const selectImage = imageUrl => {
      addImage(imageUrl);
      dispatchToggleUpload()
    };

    return (
      <>
        <Tabs>
          <section className="editor-image-modal"  >
            <section className="modal-header">
              <span onClick={toggleUploadView} className="close">&times;</span>
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
               <ImageGallery selectImage={selectImage} />
               
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
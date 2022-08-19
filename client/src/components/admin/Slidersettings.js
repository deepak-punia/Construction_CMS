import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addSliderPicture, deleteSliderPicture } from "../../reducers/settings";
import { API_ENDPOINT } from "../../reducers/types";
import { loadData } from "../../reducers/customSettings";
import { setAlert } from "../../reducers/alert";
import Alerts from "../Alerts";

const Slidersettings = () => {
  const sliderpictures = useSelector(
    (state) => state.settings.data.sliderpictures
  );
  const dispatch = useDispatch();
  const [uploadfile, setUploadfile] = useState("");

  const onFileChange = (e) => {
    setUploadfile(e.target.files[0]);
  };

  const handleSliderDelete = (id) => {
    dispatch(deleteSliderPicture({ id }))
      .unwrap()
      .then((originalPromiseResult) => {
        dispatch(loadData());
        dispatch(
          setAlert({
            componentName: "slider",
            alertType: "success",
            msg: "Picture Deleted.",
          })
        );
      })
      .catch((rejectedValueOrSerializedError) => {
        // handle error here
        dispatch(
          setAlert({
            componentName: "slider",
            alertType: "danger",
            msg: "Erron. Please try again.",
          })
        );
      });
  };
  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("grid", uploadfile);
    dispatch(addSliderPicture(formData))
      .unwrap()
      .then((originalPromiseResult) => {
        dispatch(loadData());
        setUploadfile("");
        dispatch(
          setAlert({
            componentName: "grid",
            alertType: "success",
            msg: "Picture Uploaded.",
          })
        );
      })
      .catch((rejectedValueOrSerializedError) => {
        // handle error here
        dispatch(
          setAlert({
            componentName: "grid",
            alertType: "danger",
            msg: "Erron. Please try again.",
          })
        );
      });
  };
  return (
    <div>
      <div className="show-apt-data card">
        <div className="show-apt-header">
          <h2>Slider Pictures</h2>
        </div>
        <div className="reviews-edit-container">
          {sliderpictures?.map((item, index) => {
            return (
              <div className="display-review-container" key={index}>
                <img src={`${API_ENDPOINT}/${item.url}`} />
                <button
                  className="select-button"
                  onClick={() => handleSliderDelete(item._id)}
                >
                  Delete
                </button>
              </div>
            );
          })}
          {/* START > Add Picture */}
          <div className="display-review-container ">
            <div className="display-review-name">Upload grid picture</div>
            <div className="display-review-position"></div>
            <div className="display-review-details">
              {sliderpictures.length > 6 ? (
                <div>Upload limit reached.</div>
              ) : (
                <>
                  <input type="file" onChange={onFileChange} />
                </>
              )}
            </div>
            <div className="display-review-button">
              <button className="select-button" onClick={handleUploadSubmit}>
                Upload
              </button>
            </div>
          </div>
          {/* END > Add picture */}
        </div>{" "}
        <Alerts componentName={"slider"} />
      </div>

      <div className="show-apt-data card">
        <div className="show-apt-info">
          <h2>Info</h2>
        </div>
        <div className="information-section">
          <span><i class="fa fa-info-circle"></i> Click on a Delete button to delete a image from Slider.</span>
          <span><i class="fa fa-info-circle"></i> Select a image and click on Upload button to upload image for Slider.</span>
          <span><i class="fa fa-info-circle"></i> Make sure images are large enough to avoid pixal breaking.</span>
          <span><i class="fa fa-info-circle"></i> Recommanded image size is 2000x1000.</span>
          <span><i class="fa fa-info-circle"></i> Slider images Limit is 6. Delete a image first to upload new image.</span>
        </div>
      </div>
    </div>
  );
};

export default Slidersettings;

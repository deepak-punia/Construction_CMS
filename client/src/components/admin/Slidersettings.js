import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addSliderPicture, deleteSliderPicture } from "../../reducers/settings";
import { API_ENDPOINT } from "../../reducers/types";
import { loadData } from "../../reducers/customSettings";

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
      })
      .catch((rejectedValueOrSerializedError) => {
        // handle error here
        console.log("error in handleReviewUpdate");
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
      })
      .catch((rejectedValueOrSerializedError) => {
        // handle error here
        console.log("error in handleReviewUpdate");
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
        </div>
      </div>

      <div className="show-apt-data card">
        <div className="show-apt-info">
          <h2>Info</h2>
        </div>
        info here
      </div>
    </div>
  );
};

export default Slidersettings;

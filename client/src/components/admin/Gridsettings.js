import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addGridPicture, deleteGridPicture } from "../../reducers/settings";
import { API_ENDPOINT } from "../../reducers/types";
import { loadData } from "../../reducers/customSettings";
import { setAlert } from "../../reducers/alert";
import Alerts from '../Alerts';

const Gridsettings = () => {
  const gridpictures = useSelector((state) => state.settings.data.gridpictures);
  const dispatch = useDispatch();
  const [uploadfile, setUploadfile] = useState("");

  const onFileChange = (e) => {
    setUploadfile(e.target.files[0]);
  };

  const handleGridDelete = (id) => {
    dispatch(deleteGridPicture({ id }))
      .unwrap()
      .then((originalPromiseResult) => {
        dispatch(loadData());
        dispatch(setAlert({componentName:'grid', alertType:'success', msg:'Picture Deleted.'}));
      })
      .catch((rejectedValueOrSerializedError) => {
        // handle error here
        dispatch(setAlert({componentName:'grid', alertType:'danger', msg:'Erron. Please try again.'}));
      });
  };
  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("grid", uploadfile);
    dispatch(addGridPicture(formData))
      .unwrap()
      .then((originalPromiseResult) => {
        dispatch(loadData());
        setUploadfile("");
        dispatch(setAlert({componentName:'grid', alertType:'success', msg:'Picture Uploaded.'}));
      })
      .catch((rejectedValueOrSerializedError) => {
        // handle error here
        dispatch(setAlert({componentName:'grid', alertType:'danger', msg:'Erron. Please try again.'}));
      });
  };
  return (
    <div>
      <div className="show-apt-data card">
        <div className="show-apt-header">
          <h2>Grid Pictures</h2>
        </div>
        <div className="reviews-edit-container">
          {gridpictures?.map((item, index) => {
            return (
              <div className="display-review-container" key={index}>
                <img src={`${API_ENDPOINT}/${item.url}`} />
                <button
                  className="select-button"
                  onClick={() => handleGridDelete(item._id)}
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
              {gridpictures.length > 3 ? (
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
          
        </div><Alerts componentName={"grid"} />
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

export default Gridsettings;

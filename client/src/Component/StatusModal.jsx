import { useRef, useEffect } from "react";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPost, updatePost } from "../redux/actions/postAction";
const StatusModal = () => {
  const [images, setImages] = useState([]);
  const [content, setContent] = useState("");
  const [stream, setStream] = useState(false);
  const [tracks, setTracks] = useState("");
  const dispatch = useDispatch();
  const videoRef = useRef();
  const refCanvas = useRef();
  const { auth, theme, status } = useSelector((state) => state);

  useEffect(() => {
    if (status.onEdit) {
      setContent(status.content);
      setImages(status.images);
    }
  }, [status]);

  const handleChangeImages = (e) => {
    const files = [...e.target.files];
    let err = "";
    let newImages = [];

    files.forEach((file) => {
      if (!file) return (err = "File does not exist.");

      if (file.size > 1024 * 1024 * 5) {
        return (err = "The image/video largest is 5mb.");
      }

      return newImages.push(file);
    });

    if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
    setImages([...images, ...newImages]);
  };

  const deleteImage = (index) => {
    console.log(index);
    let newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  const handleStream = () => {
    setStream(true);

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
          console.log(mediaStream);
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play();

          const track = mediaStream.getTracks();
          console.log(track);
          setTracks(track[0]);
        })
        .catch((err) => {});
    }
  };

  const handleCapture = () => {
    console.log(videoRef.current);
    const width = videoRef.current.clientWidth;
    const height = videoRef.current.clientHeight;
    console.log(width);
    console.log(height);

    refCanvas.current.setAttribute("width", width);
    refCanvas.current.setAttribute("height", height);

    const ctx = refCanvas.current.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, width, height);

    let URL = refCanvas.current.toDataURL();
    setImages([...images, { camera: URL }]);
    console.log(images);
  };

  const handleStopStream = () => {
    tracks.stop();
    setStream(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (images.length === 0) {
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: "Please Add your photo" },
      });
    }

    if (status.onEdit) {
      dispatch(updatePost({ content, images, auth, status }));
    } else {
      dispatch(createPost({ content, images, auth }));
    }

    setContent("");
    setImages([]);
    if (tracks) tracks.stop();
    dispatch({ type: GLOBALTYPES.STATUS, payload: false });
  };

  return (
    <div className="status_modal">
      <form onSubmit={handleSubmit}>
        <div className="status_header">
          <div className=""></div>
          <h5 className="m-0">Create Post</h5>
          <span
            onClick={() =>
              dispatch({ type: GLOBALTYPES.STATUS, payload: false })
            }
          >
            &times;
          </span>
        </div>

        <div className="status_body">
          <textarea
            name="content"
            value={content}
            placeholder={`${auth.user.username},what are you thinking?`}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="show_images">
            {images.map((image, index) => (
              <div key={index} id="file_img">
                <img
                  src={
                    image.camera
                      ? image.camera
                      : image.url
                      ? image.url
                      : URL.createObjectURL(image)
                  }
                  alt="image"
                  className="img-thumbnail"
                  style={{ filter: theme ? "invert(1)" : "invert(0)" }}
                />
                <span onClick={() => deleteImage(index)}>&times;</span>
              </div>
            ))}
          </div>

          {stream && (
            <div className="stream position-relative">
              <video
                src=""
                autoPlay
                muted
                ref={videoRef}
                width="100%"
                height="100%"
              />

              <span onClick={handleStopStream} style={{ cursor: "pointer" }}>
                &times;
              </span>
              <canvas ref={refCanvas} style={{ display: "none" }} />
            </div>
          )}

          <div className="input_images">
            {stream ? (
              <i className="fas fa-camera" onClick={handleCapture} />
            ) : (
              <>
                <i className="fas fa-camera" onClick={handleStream} />
                <div className="file_upload">
                  <i className="fas fa-image" />
                  <input
                    type="file"
                    name="file"
                    id="file"
                    multiple
                    accept="image/*"
                    onChange={handleChangeImages}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <div className="status_footer">
          <button className="btn btn-secondary w-100" type="submit">
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default StatusModal;

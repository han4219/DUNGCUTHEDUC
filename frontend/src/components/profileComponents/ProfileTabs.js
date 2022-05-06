import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "./../../components/LoadingError/Toast";
import Message from "./../../components/LoadingError/Error";
import Loading from "./../../components/LoadingError/Loading";
import { toast } from "react-toastify";
import { updateProfile } from "../../redux/actions/userActions";

const ProfileTabs = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userDetails = useSelector((state) => state.userDetails);
  const { load, error, user } = userDetails;

  const { load: updateLoading } = useSelector(
    (state) => state.userUpdateProfile
  );
  const toastId = React.useRef(null);
  const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("Mật khẩu không khớp", ToastObjects);
      }
    } else {
      dispatch(
        updateProfile({
          name,
          email,
          password,
        })
      );
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.success(
          "Cập nhật thông tin thành công",
          ToastObjects
        );
      }
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, user]);

  return (
    <>
      <Toast />
      {error && <Message variant="alert-danger">{error}</Message>}
      {load && <Loading />}
      {updateLoading && <Loading />}
      <form className="row  form-container" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <div className="form">
            <label for="account-fn">Tên người dùng</label>
            <input
              className="form-control"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label for="account-email">Địa chỉ email</label>
            <input
              className="form-control"
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label for="account-pass">Mật khẩu mới</label>
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label for="account-confirm-pass">Xác nhận mật khẩu mới</label>
            <input
              className="form-control"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <button type="submit">Cập nhật</button>
      </form>
    </>
  );
};

export default ProfileTabs;

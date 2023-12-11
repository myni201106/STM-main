import Image from "next/image";
import { useRouter } from "next/router";
import {useState, useEffect } from "react";
import { updateProfile, onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";


function Profile() {
  const router = useRouter();
  const [user, setUser] = useState({
    displayName: "",
    displayAge: 0,
    displayStreet: "",
    displaySex: "",
    photoURL: "",
  });
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setUser({
          displayName: user.displayName,
          displayAge: user.displayAge,
          displayStreet: user.displayStreet,
          displaySex: user.displaySex,
          photoURL: user.photoURL,
          
          
        });
      } else {
        router.push("/auth/signin");
      }
    });
  }, [auth]);

  const changeMode = () => {
    setIsEdit(true);
  };

  const handleUpdate = () => {
    updateProfile(auth.currentUser, {
      displayName: user.displayName,
      displayAge: user.displayAge,
      displayStreet: user.displayStreet,
      displaySex: user.displaySex,
      photoURL: user.photoURL,
    })
      .then(() => {
        setIsEdit(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [error, setError] = useState(null);

  const handleChange = (e) => {

    const { name, value } = e.target;
    if (name === "displayAge") {
      // Kiểm tra xem giá trị nhập vào có phải là số không
      const age = parseInt(value, 10);
  
      // Kiểm tra xem giá trị là một số và nằm trong khoảng từ 0 đến 100 không
      if (isNaN(age) || age < 0 || age > 100) {
        setError("Tuổi phải là một số từ 0 đến 100");
        return;
      }
    // Kiểm tra nếu nhập họ và tên không đúng định dạng (chỉ chứa chữ cái)
    if (name === "displayName" && !/^[a-zA-Z\s]*$/.test(value)) {
      // Hiển thị thông báo lỗi
      setError("Dùng kí tự, không dùng số hay kí tự đặc biệt");
      return;
    }
    }

    // Nếu không có lỗi, xóa thông báo
    setError(null);
    
    console.log(user); // Log giá trị của user để xem nó sau mỗi lần cập nhật
    setUser({
      ...user,
      [name]: value,
    });
  };
  

  return (
    <div className="container">
      <div className="main-profile ">
        <div className="row">
          <div className="col-lg-4">
            {user.photoURL && (
              <Image
                src={user.photoURL}
                alt={user.displayName}
                style={{ borderRadius: "23px" }}
                width={300}
                height={300}
              />
            )}
            {isEdit && (
              <input
                name="photoURL"
                id="photoURL"
                type="text"
                className="tw-outline-none tw-py-1 tw-px-2 tw-bg-gray-100 tw-rounded-md tw-mt-2 tw-w-full"
                defaultValue={user.photoURL}
                onChange={handleChange}
              />
            )}
          </div>
          <div className="col-lg-4 align-self-center">
            <div className="main-info header-text">
              <h4>{user.displayName}</h4>
              <p>Tôi đang là Graphic Design tôi đang sinh sống tại {user.displayStreet}</p>
              <div className="main-border-button">
                {isEdit ? (
                  <button onClick={handleUpdate}>Lưu</button>
                ) : (
                  <button onClick={changeMode}>Chỉnh Sửa</button>
                )}
              </div>
            </div>
          </div>
          <form className="col-lg-4 align-self-center">
            <ul>
              <li>
                Họ Và Tên{" "}
                {isEdit ? (
                  <span>
                    <input
                      name="displayName"
                      id="displayName"
                      type="text"
                      autoFocus
                      className="tw-outline-none tw-py-1 tw-px-2 tw-bg-transparent"
                      defaultValue={user.displayName}
                      onChange={handleChange}
                      placeholder={error || ""}
                    />
                  </span>
                ) : (
                  <span>{user.displayName}</span>
                )}
              </li>
              <li>
              Tuổi{" "}
                {isEdit ? (
                  <span>
                    <input
                      name="displayAge"
                      id="displayAge"
                      type="text"
                      autoFocus
                      className="tw-outline-none tw-py-1 tw-px-2 tw-bg-transparent"
                      defaultValue={user.displayAge}
                      onChange={handleChange}
                      placeholder={error || ""}
                    />
                  </span>
                ) : (
                  <span>{user.displayAge}</span>
                )}
              </li>
              <li>
                Thành Phố{" "}
                {isEdit ? (
                  <span>
                    <input
                      name="displayStreet"
                      id="displayStreet"
                      type="text"
                      autoFocus
                      className="tw-outline-none tw-py-1 tw-px-2 tw-bg-transparent"
                      defaultValue={user.displayStreet}
                      onChange={handleChange}
                    />
                  </span>
                ) : (
                  <span>{user.displayStreet}</span>
                )}
              </li>
              <li>
              Giới tính{" "}
                {isEdit ? (
                  <span>
                    <input
                      name="displaySex"
                      id="displaySex"
                      type="text"
                      autoFocus
                      className="tw-outline-none tw-py-1 tw-px-2 tw-bg-transparent"
                      defaultValue={user.displaySex}
                      onChange={handleChange}
                    />
                  </span>
                ) : (
                  <span>{user.displaySex}</span>
                )}
              </li>
            </ul>
          </form>
        </div>
      </div>
    </div>
  );
}

Profile.layout = "default";
export default Profile;

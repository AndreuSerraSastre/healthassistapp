import React, { useRef, useState } from "react";
import { Button, Spin } from "antd";
import { ProfileAvatarWrapper, AvatarX } from "./styles";
import { useDispatch } from "react-redux";
import { updateUser } from "../../actions/usersActions";

const ProfileAvatar = ({ profile }) => {
  const { picture } = profile || {};
  const inputFile = useRef(null);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const getBase64FromUrl = async (url, name, type) => {
    const docdata = await fetch(url);
    const blob = await docdata.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = async () => {
        const base64data = reader.result;
        await dispatch(updateUser({ _id: profile._id, picture: base64data }));
        window.location.reload(true);
        setLoading(false);
      };
    });
  };

  const onChange = async (file) => {
    setLoading(true);
    try {
      let doc = file.target.files[0];
      const blob = new Blob([doc], { type: doc.type });
      const docURL = URL.createObjectURL(blob);
      await getBase64FromUrl(docURL, doc.name, doc.type);
    } catch { }
  };

  return (
    <ProfileAvatarWrapper>
      <Spin spinning={loading}>
        {picture ? (
          <AvatarX size={100} src={picture.url}></AvatarX>
        ) : (
          <AvatarX
            size={100}
            src={process.env.PUBLIC_URL + "/user-profile.png"}
          ></AvatarX>
        )}
      </Spin>
      <input
        type="file"
        id="file"
        ref={inputFile}
        onChange={(file) => onChange(file)}
        style={{ display: "none" }}
      />
      <Button
        style={{ margin: "10px 0px" }}
        onClick={() => inputFile.current.click()}
      >
        Cambiar foto
      </Button>
    </ProfileAvatarWrapper>
  );
};

export default ProfileAvatar;

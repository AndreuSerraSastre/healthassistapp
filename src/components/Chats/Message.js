import React from 'react';
import { getCurrentTheme, getUsers } from '../../store/selectors';
import { useSelector } from 'react-redux';
import { AvatarX } from '../Profile/styles';
import { FlexSpace } from '../../styles';

const Message = ({ user, message, model }) => {
    const users = useSelector(getUsers);
    const theme = useSelector(getCurrentTheme)

    const getPicture = () => {
        if (!users) return

        if (!user) {
            return process.env.PUBLIC_URL + "/logo192.png"
        } else {
            if (users[user].picture) {
                return users[user].picture.url
            } else {
                return process.env.PUBLIC_URL + "/user-profile.png"
            }
        }
    }

    const getName = () => {
        if (!users) return

        if (!user) {
            return "Health Assistant (" + model + ")"
        } else {
            if (users[user].label) {
                return users[user].label
            } else {
                return "Unknown"
            }
        }
    }

    return (
        <div style={{ color: theme ? "black" : "#fff", marginBottom: 40 }}>
            <FlexSpace>
                <AvatarX
                    size={25}
                    src={getPicture()}
                ></AvatarX>
                <div style={{ marginLeft: 5 }}>
                    {getName()}
                </div>
            </FlexSpace>
            <p style={{ marginLeft: 35 }}>{message}</p>
        </div>
    );
};

export default Message;

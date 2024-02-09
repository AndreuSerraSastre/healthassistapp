import { Form, Avatar } from 'antd'
import styled from 'styled-components';

export const BasicInfoSettingsWrapper = styled.div`
    display: flex;
    align-items: center;
    @media only screen and (max-width: 600px) {
        flex-direction: column-reverse;
    }
    & > :first-child {
        min-width: 300px;
    }
`;

export const AvatarX = styled(Avatar)`
    & > .ant-avatar-string {
        font-size: 40px;
        font-weight: 600;
    }
`;

export const ProfileAvatarWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto;
    padding-bottom: 30px;
    & > :nth-child(2) {
        margin-top: 10px;
    }
`;

export const ProfileFormWrapper = styled(Form)`

`;
import styled from 'styled-components';
import { Collapse } from 'antd';

export const PasswordChangeWrapper = styled(Collapse)`
    width: 100%;
    margin: 40px 0px;
    border: 1px dashed red;
    & > .ant-collapse-item > .ant-collapse-content {
        border: none;
        & > .ant-collapse-content-box > * { 
            margin-bottom: 10px;
        };
    };
`;
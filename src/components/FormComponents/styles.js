import styled from 'styled-components';
import { Drawer, Radio, Tag, Checkbox, Space, Button } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import FadeIn from 'react-fade-in';
import { color_array } from '../../constants/colors';

export const PickerWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    & > :first-child {
        width: 50% !important;
        margin-right: 12px;
        & > div > .SingleDatePickerInput {
            width: 100%auto;
        }
    }
    & > :nth-child(2) {
        width: 50% !important;
        margin-left: 12px;
        & > .ant-picker-input > input {
            text-align: center !important;
            font-weight: 600 !important;
        } 
    }
`;

export const DatePickerWrapper = styled.div`
`;

export const TypeInputWrapper = styled(Radio.Group)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    & > label {
        flex-grow: 1;
        text-align: center;
    }
`;

export const Label = styled.div`
    font-weight: 600;
`;

export const DrawerFormWrapper = styled(Drawer)`
    & > .ant-drawer-content-wrapper {
        ${({ width }) => `width: ${width};`}
        right: 0;
        left: 0;
        margin: auto;
    }
    & > .ant-drawer-content-wrapper > .ant-drawer-content {
        background-color: transparent;
        & > .ant-drawer-wrapper-body > .ant-drawer-body {
            @media only screen and (max-width: 600px) {
                padding: 24px 18px;
            }
            background: #FFF;
        };
        & > .ant-drawer-wrapper-body > .ant-drawer-header {
            background: #22222240;
            backdrop-filter: blur(4px);
        };
        & > .ant-drawer-wrapper-body > .ant-drawer-footer {
            background: #FFF;
        };
    };
`;

export const FormTitleWrapper = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFF;
    & > :first-child {
        margin-right: 5px;
    }
`;

export const FooterWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const Spacer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    column-gap: 10px;
`;

export const QuestFormModalWrapper = styled(Modal)`
    & > .ant-modal-content > .ant-modal-body {
        padding: 24px 10px;
    }
`;

export const QuestionsFormFieldsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    /* background: #f9f9f9; */
    border-radius: 5px;
    padding: 10px;
    & > :nth-child(1) { 
        grid-area: 1 / 1 / 2 / 2; 
        margin: auto 0 auto 0;
    }
    & > :nth-child(2) { 
        grid-area: 2 / 1 / 3 / 2; 
        margin: auto 0 auto 0;
    }
    & > :nth-child(3) { 
        grid-area: 3 / 1 / 4 / 2; 
        margin: auto 0 auto 0;
    }
    & > :nth-child(4) { 
        grid-area: 4 / 1 / 5 / 2; 
        margin: auto 0 auto 0;
    }
    & > :nth-child(5) { 
        grid-area: 5 / 1 / 6 / 2; 
        margin: auto 0 auto 0;
    }
    & > :nth-child(6) { 
        grid-area: 6 / 1 / 7 / 2; 
        margin: auto 0 auto 0;
    }
    & > :nth-child(7) { 
        grid-area: 7 / 1 / 8 / 2; 
        margin: auto 0 auto 0;
    }
    & > :nth-child(8) { 
        grid-area: 8 / 1 / 9 / 2; 
        margin: auto 0 auto 0;
    }
`;

export const NoAnswerWrapper = styled(Tag)`
        margin-bottom: 8px;
    & > span > span {
        margin-right: 5px;
    }
`;

export const InputWithDividerWrapper = styled.div`
    & > :first-child {
        margin: 0px 0px 16px 0px;
        font-weight: 600;
    };
    & > :last-child {
        margin-bottom: 28px !important;
    }
`;

export const DatepickerAndPeriodicitySelectorWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
`;

export const PeriodicitySelectorWrapper = styled.div`
    margin-top: 10px;
    width: 100%;
`;

export const SwitchWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    & > :first-child {
        font-size: 12px;
        font-weight: 300;
    }
`;

export const LeftSeparator = styled.div`
    display: flex;
    justify-content: space-between;
    width: 5px;
`;

export const DaysSelector = styled(Checkbox.Group)`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin: 10px 0px;
    width: 100%;
    & > label > :nth-child(2) {
        padding: 0px 3px;
    }
    `;

export const MonthsSelector = styled(Checkbox.Group)`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin: 10px 0px;
    width: 100%;
    & > label > :nth-child(2) {
        padding: 0px 3px;
    }
`;

export const PeriodicityOptionsPanel = styled.div`
    /* padding: 10px; */
    /* background: #2728220a; */
    /* border-radius: 5px; */
`;

export const FrequencySelectorWrapper = styled(Space)`
    & > :first-child {
        flex: 1 1 auto;
    }
`;

export const PrIconWrapper = styled(Button)`
    width: 55px !important;
    height: 55px !important;
    padding: 6px !important;
    background-color: #f5f5f5;
`;

export const IconSelectorWrapper = styled(FadeIn)`
    display: flex;
    justify-content: space-between;
    flex-flow: wrap;
    & > * {
        margin: 3px;
    };
    & > div > .selected-icon {
        border: 2px solid #8000805e;
    }
`;

export const QuestFormListWrapper = styled.div`
    margin-bottom: 15px;
    border-left: 3px solid ${props => color_array[props.$color] || 'black'};
    padding-left: 5px;
   & > .ant-list > div > div > ul > li {
       padding-left: 0px;
       padding-bottom: 0px;
   }
`;
import { Menu } from 'antd';
import styled from 'styled-components';

export const HomeWrapper = styled.div`
    height: 100%;
    /* position: relative; */
    /* overflow-y: hidden; */
    & > .mobile-home {
        padding-top: 10px;
        padding-bottom: 100px;
        & > .ant-tabs-nav > .ant-tabs-nav-wrap {
            justify-content: center;
        };
    };
`;

export const HomeInnerWrapper = styled.div`
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    min-width: 1px;
    position: relative;
    height: 100%;
    & > :first-child {
        height: 42px;
        display: flex;
        align-items: center;
    }
`;

export const ProfileWrapper = styled.div`
    max-width: 600px;
    margin: auto;
`;

export const DepartmentsWrapper = styled.div`
    margin: auto;
    padding-top: 10px;
    & > .ant-tabs-top {
        & > .ant-tabs-content-holder {
            background: #fff;
            border-radius: 5px;
        }
    } 
`;

export const ListWrapper = styled.div`
    margin: auto;
    padding-top: 10px;
    /* min-height: 100vh; */
    height: 100%;
    & > .ant-tabs-top {
        & > .ant-tabs-content-holder {
            background: #fff;
            border-radius: 5px;
        }
    } 
`;

export const ProjectsWrapper = styled.div`
    margin: auto;
    padding-top: 10px;
    /* min-height: 100vh; */
    height: 100%;
`;

export const ServicesWrapper = styled.div`
    margin: auto;
    padding-top: 10px;
    /* min-height: 100vh; */
    height: 100%;
    & > .ant-tabs-top {
        & > .ant-tabs-content-holder {
            background: #fff;
            border-radius: 5px;
            padding: 10px;
        }
    } 
`;

export const SettingsWrapper = styled.div`
    max-width: 600px;
    margin: auto;
    & > .ant-tabs-top {
        & > .ant-tabs-content-holder {
            padding: 15px 30px;
            background: #fff;
            border-radius: 5px;
        }
    } 
`;

export const SearchWrapper = styled.div`
    margin: auto;
    padding-top: 10px;
    /* min-height: 100vh; */
    height: 100%;
`;

export const SearchBarWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
`;

export const ChatMain = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const TaskCalendarMain = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    margin: auto;
    width: 100%;
`;

export const ColorExpRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;


export const CardWrapper = styled.div`
  background: #ffffff;
  border: 1px solid #ddddeb;
  box-sizing: border-box;
  box-shadow: 0px 4px 8px rgba(91, 92, 102, 0.1);
  border-radius: 12px;
  padding: 20px;
`;

export const MessagesWrapper = styled.div`
    ::-webkit-scrollbar {
        width: 5px;               /* width of the entire scrollbar */
    }

    ::-webkit-scrollbar-track {
        background: tranparent;        /* color of the tracking area */
    }

    ::-webkit-scrollbar-thumb {
        background-color: grey;    /* color of the scroll thumb */
        border-radius: 15px;       /* roundness of the scroll thumb */
    }
`;

export const MenuScrollWrapper = styled(Menu)`
    ::-webkit-scrollbar {
        width: 5px;               /* width of the entire scrollbar */
    }

    ::-webkit-scrollbar-track {
        background: tranparent;        /* color of the tracking area */
    }

    ::-webkit-scrollbar-thumb {
        background-color: grey;    /* color of the scroll thumb */
        border-radius: 15px;       /* roundness of the scroll thumb */
    }
`;

export const HolidayCalendarWrapper = styled.div`
width: 50%;
margin: auto;
margin-top: 50px;
.fc-theme-standard th {
    border: 1px solid #5f20581c !important;
};
& > .fc > .fc-header-toolbar > :first-child > .fc-toolbar-title {
    font-weight: bold;
    text-transform: uppercase;
};
.fc-daygrid-day-number {
    color: #902f82;
};
.fc-daygrid-day.fc-day-today {
    background-color: rgb(205 32 120 / 15%) !important;
    border: 1px solid #7a267f73;
};
.fc-day-today  > .fc-daygrid-day-frame
> .fc-daygrid-day-top > .fc-daygrid-day-number {
    font-weight: bold;
};
.fc-col-header-cell {
    background-color: #222222;
};
.fc-col-header-cell-cushion  {
    font-weight: 600;
    text-transform: capitalize;
    color: #FFF;
};
.fc .fc-button-primary {
    background-color: #6f277c !important;
    outline: none !important;
};

.fc .fc-highlight {
    background: rgb(249 224 235 / 75%);
    border: 1px solid #7a267f73;
}
`;
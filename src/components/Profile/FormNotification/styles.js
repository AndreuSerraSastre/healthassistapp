import styled from 'styled-components';

export const TasksSettingsWrapper = styled.div`
    display: flex;
    align-items: center;
    @media only screen and (max-width: 600px) {
        flex-direction: column-reverse;
    }
    & > :first-child {
        min-width: 300px;
    }
`;
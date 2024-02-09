import { useEffect } from 'react';
import { notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getNotificationsState } from '../../store/selectors';
import { CLOSE_NOTIFICATION } from '../../constants';

const NotificationsHandler = () => {

    const state = useSelector(getNotificationsState);

    const dispatch = useDispatch();

    useEffect(() => {
        if (state && state.show && state.message) {
            const key = Date.now().toString();
            notification.open(
                {
                    key,
                    type: state.status || 'info',
                    placement: 'topRight',
                    message: state.message,
                    duration: 2,
                    closeIcon: null,
                    onClose: () => dispatch({ type: CLOSE_NOTIFICATION }),
                }
            )
        }
    });

    return null;
};

export default NotificationsHandler;
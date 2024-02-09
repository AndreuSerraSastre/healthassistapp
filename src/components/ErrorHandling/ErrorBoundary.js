import { Alert, Button, Space } from 'antd';
import { ErrorBoundary as ErrorHandler } from 'react-error-boundary';
import { useHistory } from 'react-router';

const ErrorFallback = ({ error, resetErrorBoundary }) => {

    const history = useNavigate();

    const goHome = () => history('/');

    return (
        <Alert message="No se ha podido renderizar el componente."
            description={error.message} type="error" showIcon
            action={
                <Space direction="vertical">
                    <Button size="small" onClick={resetErrorBoundary} danger>
                        Recargar
                    </Button>
                    <Button size="small" onClick={goHome} type="primary" >
                        Ir a incio
                    </Button>
                </Space>
            } />
    )
};

const ErrorBoundary = props => {
    return (
        <ErrorHandler FallbackComponent={ErrorFallback}>
            {props.children}
        </ErrorHandler>
    )
};

export default ErrorBoundary;
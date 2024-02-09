import FadeIn from 'react-fade-in';
import { useSelector } from 'react-redux';
import { getSideMenuState } from '../store/selectors';
import logoIso from '../assets/app/logoIso.png'
import { useHistory } from 'react-router';

const AppIso = () => {

    const history = useNavigate();
    const isCollapsedSideMenu = useSelector(getSideMenuState);
    const goHome = () => history('/machines');

    return (
        <>
            {
                isCollapsedSideMenu
                    ?
                    <FadeIn>
                        <img src={logoIso} alt="App Iso" onClick={goHome}
                            style={{ maxHeight: '100%', maxWidth: '100%', height: 30 }} />
                    </FadeIn> : <div />
            }
        </>
    )
};

export default AppIso;
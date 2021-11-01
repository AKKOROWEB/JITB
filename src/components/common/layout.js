import {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import Navbar from './navbar';
import LoginModal from '../loginModal';
import {startCore} from '../../actions/';
import {useRouter} from 'next/router';
function Layout({children, layoutContainerStyle = '', startCore}) {
  const router = useRouter();
  const [show, setShow] = useState(false);
  // INITS WEB3 Functionality
  useEffect(() => {
    startCore();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`d-flex flex-column h-100 w-100`}>
      <style jsx global>
        {`
          html,
          body,
          #__next,
          #__next > div {
            height: 100%;
            font-family: Baskerville Old Face monospace;
            background-color: #000;
          }

          .content-wrapper {
            height: calc(100% - 36px);
            width: 100%;
          }
        `}
      </style>
      {/* NAVBAR */}
      <Navbar
        navbarContainerStyle={'sticky-top border-top border-bottom border-dark'}
        brandText={process.env.BRAND_NAME || 'JITB'}
        brandTextStyle={`text-uppercase`}
        onClick={() => setShow(true)}
      />
      <div className={`content-wrapper contianer-fluid d-flex flex-column`}>
        {/**Main Content */}
        <main className={`w-100 h-100 ${layoutContainerStyle}`}>
          {children}

          <div className='text-center text-white w-100 p-3 mx-auto text-capitalize'>
            OFFICIAL CONTRACT:
            <br />
            <a
              className='text-break text-white'
              rel='noreferrer'
              target='_blank'
              href={`https://etherscan.com/dapp/${process.env.CONTRACT_ADDRESS}`}>
              {process.env.CONTRACT_ADDRESS}
            </a>
          </div>
          <hr className={`container`} />
        </main>
      </div>
      {/* LOGIN MODAL */}
      {show && <LoginModal handleShow={() => setShow(!show)} />}
      <a href='#' id='open_preferences_center' className={'d-none'}>
        Open Preferences Center
      </a>
    </div>
  );
}
export default connect(null, {startCore})(Layout);

import React from 'react';
import { useSelector } from 'react-redux';
import AccountVerificationAlertWarning from './Alerts/AccountVerificationAlertWarning';
import AdminNavbar from './Admin/AdminNavbar';
import PrivateNavbar from './Private/PrivateNavbar';
import PublicNavbar from './Public/PublicNavbar';
import AccountVerificationSuccessAlert from './Alerts/AccountVerificationSuccessAlert';

const Navbar = () => {
  //get user from store
  const state = useSelector((state) => state?.users);
  const { userAuth } = state;
  const isAdmin = userAuth?.isAdmin;

  //account verification from store
  const account = useSelector((state) => state?.accountVerification);
  const { loading, appErr, serverErr, token } = account;
  return (
    <>
      {isAdmin ? (
        <AdminNavbar isLogin={userAuth} />
      ) : userAuth ? (
        <PrivateNavbar isLogin={userAuth} />
      ) : (
        <PublicNavbar />
      )}
      {/* Display Alert */}
      {userAuth && !userAuth.isVerified && <AccountVerificationAlertWarning />}
      {/* Display sucess message */}
      {loading && <h2 className="text-center">Loading please wait...</h2>}
      {token && <AccountVerificationSuccessAlert />}
      {appErr || serverErr ? (
        <h2 className="text-center text-red-500">
          {' '}
          {serverErr} {appErr}
        </h2>
      ) : null}
    </>
  );
};

export default Navbar;

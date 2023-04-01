import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersAction } from '../../../redux/slices/users/usersSlices';
import LoadingComponent from '../../../utils/LoadingComponent';
import UsersListHeader from './UsersListHeader';
import UsersListItem from './UsersListItem';

const UsersList = () => {
  const dispatch = useDispatch();

  // get data from store
  const users = useSelector((state) => state?.users);
  const { usersList, appErr, serverErr, loading, block, unblock } = users;

  // fetch all users
  useEffect(() => {
    dispatch(fetchUsersAction());
  }, [dispatch, block, unblock]);

  return (
    <>
      <section class="py-8 bg-gray-900 min-h-screen">
        {loading ? (
          <LoadingComponent />
        ) : appErr || serverErr ? (
          <h1 className="text-yellow-600 text-center text-lg">
            {serverErr} {appErr}{' '}
          </h1>
        ) : usersList?.length <= 0 ? (
          <h2> No Users Found</h2>
        ) : (
          usersList?.map((user) => (
            <>
              <UsersListItem user={user} />
            </>
          ))
        )}
      </section>
    </>
  );
};

export default UsersList;

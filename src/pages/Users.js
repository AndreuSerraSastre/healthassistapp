import React from "react";
import UsersForm from "../components/Users/Form";
import { ListWrapper } from "./styles";
import { useSelector } from "react-redux";
import { getUsers } from "../store/selectors";
import List from "../components/List";
import { UserRole } from "../components/Users/Components";
import {
  EDIT_SELECTED_USER,
  OPEN_USERS_FORM,
  SHOW_NOTIFICATION,
} from "../constants";
import { useDispatch } from "react-redux";
import { createUser, deleteUsers, fetchUsers } from "../actions/usersActions";
import status from "http-status";
import { ROLES } from "../constants/permissions";
import moment from "moment";

const Users = () => {
  const users = useSelector(getUsers);

  const dispatch = useDispatch();

  const handleDelete = async (users) => {
    const usersId = users.map((user) => user._id);
    dispatch(deleteUsers(usersId));
  };

  const handleFetch = async () => {
    const response = await dispatch(fetchUsers());
    if (status[`${response}_CLASS`] === status.classes.SUCCESSFUL) {
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: {
          show: true,
          status: "success",
          message: "Usuarios refrescados.",
        },
      });
    } else {
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: {
          show: true,
          status: "error",
          message: "Usuarios no refrescados.",
        },
      });
    }
  };

  const handleClone = async (datas) => {
    if (datas) {
      for (let i = 0; i < datas.length; i++) {
        const data = datas[i];
        delete data._id
        await dispatch(createUser((
          {
            ...data,
            username: data.username + "(" + (i + 1) + ")",
            email: data.email + "(" + (i + 1) + ")",
          }
        )))
      }
    }
  };

  return (
    <ListWrapper>
      <List
        data={users}
        columns={columns}
        ADD={OPEN_USERS_FORM}
        EDIT={EDIT_SELECTED_USER}
        handleDataDelete={handleDelete}
        handleDataClone={handleClone}
        handleDataFetch={handleFetch}
      />
      <UsersForm />
    </ListWrapper>
  );
};

export default Users;

const columns = [
  {
    title: "Nombre",
    dataIndex: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: "Apellidos",
    dataIndex: "surname",
  },
  {
    title: "Rol",
    dataIndex: "role",
    render: (data) => <UserRole key={data} role={data} />,
    onFilter: (value, record) => {
      return record.role.indexOf(value) === 0;
    },
    filters: Object.values(ROLES).map((x) => {
      return { text: x.label, value: x.role };
    }),
  },
  {
    title: "Correo",
    dataIndex: "email",
    responsive: ["lg"],
  },
  {
    title: "Última conexión",
    dataIndex: "last_login",
    render: (data) => moment(data).format("LLL"),
    responsive: ["lg"],
  }
];

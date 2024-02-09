import React from "react";
import { Button, Popconfirm } from "antd";
import Search from "antd/lib/input/Search";
import { ListButton, ListRefreshButton, TableButtons } from "./styles";
import {
  DeleteIcon,
  EditIcon,
  InProcessTaskIcon,
  PlusIcon,
} from "../../constants/icons";
import { useIsMobile } from "../../utils";
import { CopyOutlined } from "@ant-design/icons";

const ListButtons = ({
  handleAdd,
  handleDelete,
  handleEdit,
  handleClone,
  handleFetch,
  setFind,
  selectedRows,
  disableButtons,
  moreButtons,
  hideButtons,
  disabledCreate,
  disabledEdit,
  disabledDelete,
}) => {
  const count = selectedRows.length;

  const isMobile = useIsMobile();

  const confirm = (e) => {
    handleDelete();
  };

  return (
    <TableButtons style={{ display: "flex" }}>
      {!hideButtons && (
        <Button
          type="primary"
          disabled={disableButtons || disabledCreate}
          onClick={handleAdd}
        >
          <PlusIcon></PlusIcon>
          {!isMobile && "Crear"}
        </Button>
      )}
      {!hideButtons && (
        <Popconfirm
          title="¿Está seguro de realizar esta acción?"
          onConfirm={confirm}
          okText="Si"
          cancelText="No"
          disabled={count === 0 || disableButtons || disabledDelete}
        >
          <ListButton
            disabled={count === 0 || disableButtons || disabledDelete}
            danger
          >
            <DeleteIcon></DeleteIcon>
            {!isMobile && "Borrar"}
          </ListButton>
        </Popconfirm>
      )}
      {!hideButtons && (
        <ListButton
          disabled={count !== 1 || disableButtons || disabledEdit}
          onClick={handleEdit}
        >
          <EditIcon></EditIcon>
          {!isMobile && "Editar"}
        </ListButton>
      )}
      {!hideButtons && (
        <ListButton
          disabled={count === 0 || disableButtons}
          onClick={handleClone}
        >
          <CopyOutlined />
          {!isMobile && "Clonar"}
        </ListButton>
      )}
      {moreButtons}
      <ListRefreshButton onClick={handleFetch}>
        <InProcessTaskIcon></InProcessTaskIcon>
      </ListRefreshButton>
      <div style={{ width: "100%" }}>
        <Search
          allowClear={true}
          placeholder="Buscar..."
          onChange={(e) => setFind(e.target.value)}
          style={
            isMobile
              ? { marginLeft: 5, width: "100%" }
              : { width: 300, float: "right" }
          }
        />
      </div>
    </TableButtons>
  );
};

export default ListButtons;

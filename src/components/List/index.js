import React from "react";
import { MainTable } from "./styles";
import { Table } from "antd";
import { useState } from "react";
import ListButtons from "./ListButtons";
import { useDispatch } from "react-redux";

const List = ({
  data,
  columns,
  ADD,
  handleDataDelete,
  handleDataFetch,
  handleDataClone,
  EDIT,
  disableButtons,
  moreButtons,
  setSelectedRowsCustom,
  hideButtons,
  disabledCreate,
  disabledEdit,
  disabledDelete,
  props,
}) => {
  const [selectedRowKeys, setselectedRowKeys] = useState([]);

  const [selectedRows, setselectedRows] = useState([]);

  const [find, setFind] = useState("");

  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch({ type: ADD });
  };

  const resetRows = () => {
    setselectedRowKeys([]);
    setselectedRows([]);
    setSelectedRowsCustom && setSelectedRowsCustom([]);
  };

  const handleEdit = () => {
    dispatch({ type: EDIT, payload: selectedRows[0] });
    resetRows();
  };

  const handleDelete = () => {
    handleDataDelete(selectedRows);
    resetRows();
  };

  const handleFetch = () => {
    handleDataFetch();
    resetRows();
  };

  const handleClone = async () => {
    await handleDataClone(selectedRows);
    resetRows();
  };


  const rowSelection = {
    selectedRowKeys,
    onChange: (index, data) => {
      setselectedRowKeys(index);
      setselectedRows(data);
      setSelectedRowsCustom && setSelectedRowsCustom(data);
    },
  };

  const formatDataList = () => {
    const listData = Object.values(data)
      .filter((x) =>
        columns
          .map((column) => {
            try {
              const text = column.render
                ? column.render(x[column.dataIndex])
                : x[column.dataIndex];

              try {
                return text.toUpperCase().includes(find.toUpperCase());
              } catch (error) {
                return text
              }
            } catch {
              return "err";
            }
          })
          .includes(true)
      )
      .map((data, key) => ({
        key: key + 1,
        ...data,
      }));
    return listData;
  };

  const calculatePageSize = () => {
    const heightCell = 54;
    const height = window.innerHeight - 64 - 32 - 55 - 32 - 54;

    return Math.floor(height / heightCell);
  }

  return (
    <MainTable>
      <ListButtons
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleFetch={handleFetch}
        setFind={setFind}
        selectedRows={selectedRows}
        disableButtons={disableButtons}
        moreButtons={moreButtons}
        hideButtons={hideButtons}
        disabledCreate={disabledCreate}
        disabledEdit={disabledEdit}
        disabledDelete={disabledDelete}
        handleClone={handleClone}
      ></ListButtons>
      {data && (
        <Table
          pagination={{ showSizeChanger: true, defaultPageSize: calculatePageSize(), pageSizeOptions: [calculatePageSize(), 30, 60, 500] }}
          scroll={{ x: '100vh' }}
          rowSelection={rowSelection}
          onRow={(record) => {
            return {
              onClick: () => {
                resetRows();
                if (EDIT && !disabledCreate) dispatch({ type: EDIT, payload: record });
              },
            };
          }}
          columns={columns}
          dataSource={formatDataList()}
          {...props}
        />
      )}
    </MainTable>
  );
};

export default List;

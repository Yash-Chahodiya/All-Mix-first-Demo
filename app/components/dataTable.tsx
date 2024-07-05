import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { useState } from "react";
import { deleteProduct, editProduct } from "~/zustand/action";
import { stylesheet } from "~/tailwind.css?url";

const DataTable = ({ rowData }) => {
  const handleEdit = (data: any) => {
    editProduct(data);
    console.log("Edit", data);
  };
  const deleteProductdata = (id: any) => {
    console.log(id);
    deleteProduct(id);
  };

  const customButtonData = (data: any) => {
    return (
      <div className="flex flex-row gap-2 justify-center items-center">
        <button
          onClick={() => handleEdit(data)}
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Edit
        </button>
        <button
          onClick={() => deleteProductdata(data.id)}
          className="text-sm px-5 py-2.5 me-2 mb-2 rounded-lg bg-red-900 hover:bg-red-950   "
        >
          Delete
        </button>
      </div>
    );
  };

  const [colDefs, setColDefs] = useState([
    {
      field: "name",
      flex: 2,
      editable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      field: "Quantity",
      flex: 2,
      editable: true,
      filter: true,
      floatingFilter: true,
    },

    {
      field: "action",
      flex: 2,
      cellRenderer: ({ data }: any) => customButtonData(data),
    },
  ]);

  const pagination = true;
  const paginationAutoPageSize = 500;
  const paginationPageSizeSelector = [5, 10, 15, 20];

  return (
    <div className=" flex justify-center items-center w-screen">
      <div
        className="ag-theme-material-dark"
        style={{ height: 500, width: 1100 }}
      >
        <AgGridReact
          columnDefs={colDefs}
          rowData={rowData}
          pagination={pagination}
          paginationAutoPageSize={paginationAutoPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
      </div>
    </div>
  );
};

export default DataTable;

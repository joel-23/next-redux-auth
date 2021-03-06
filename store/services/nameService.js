import axios from "axios";
import * as actions from "../actions/names";

export const getNames = (page, rowsPerPage) => {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await axios({
          method: "post",
          url: "/names",
          data: { page, rowsPerPage },
        });
        await dispatch(actions.namesGetAll(response.data.names));
        await dispatch(
          actions.getPaginationDetails({
            page: response.data.page,
            rowsPerPage: rowsPerPage,
            rows: response.data.rows,
            pages: response.data.pages,
          })
        );
        return resolve();
      } catch (err) {
        let code = err.response.status;
        let error = err.response.data.message;
        let data = {
          code,
          error,
        };
        return reject(data);
      }
    });
  };
};

export const editName = (details) => {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await axios({
          method: "post",
          url: `/names/edit/${details.id}`,
          data: details,
        });
        await dispatch(actions.namesEdit(response.data));
        return resolve();
      } catch (err) {
        let code = err.response.status;
        let error = err.response.data.message;
        let data = {
          code,
          error,
        };
        return reject(data);
      }
    });
  };
};

export const addName = (details) => {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await axios({
          method: "post",
          url: "/names/add",
          data: details,
        });
        await dispatch(actions.namesAdd(response.data));
        return resolve();
      } catch (err) {
        let code = err.response.status;
        let error = err.response.data.message;
        let data = {
          code,
          error,
        };
        return reject(data);
      }
    });
  };
};

export const deleteName = (id) => {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await axios({
          method: "post",
          url: `/names/delete/${id}`,
        });
        await dispatch(actions.namesDelete({ id }));
        return resolve();
      } catch (err) {
        let code = err.response.status;
        let error = err.response.data.message;
        let data = {
          code,
          error,
        };
        return reject(data);
      }
    });
  };
};

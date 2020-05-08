const url = process.env.REACT_APP_OWNERSHIP_SERVER_URL;


export default class OwnershipClient {
  constructor(store) {
    this.store = store;
  }

  getUserMachines = async () => {
    const accessToken = this.store.getState().auth.accessToken;
    const res = await fetch(`${url}/me/machines`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    return await res.json();
  }
}

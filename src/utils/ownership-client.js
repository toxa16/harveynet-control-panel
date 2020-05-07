const url = process.env.REACT_APP_OWNERSHIP_SERVER_URL;


export default class OwnershipClient {
  getUserMachines = async () => {
    const res = await fetch(`${url}/me/machines`);
    return await res.json();
  }
}

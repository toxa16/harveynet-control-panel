const url = process.env.REACT_APP_OWNERSHIP_SERVER_URL;


export default async function getUserMachines(accessToken) {
  //console.log(accessToken);
  const res = await fetch(`${url}/me/machines`, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });
  return await res.json();
}

//process.env.DB_PASSWORD for env variables
import axios from 'axios';
import msal from '@azure/msal-node';

const msalConfig = {
    auth: {
        clientId: process.env.CLIENT_ID,
        authority: process.env.AAD_ENDPOINT + '/' + process.env.TENANT_ID,
        clientSecret: process.env.CLIENT_SECRET,
    }
};

const tokenRequest = {
    scopes: [process.env.GRAPH_ENDPOINT + '/.default'],
};

const apiConfig = {
    uri: process.env.GRAPH_ENDPOINT + '/v1.0/users',
};

async function getToken(tokenRequest) {
    const cca = new msal.ConfidentialClientApplication(msalConfig);
    return await cca.acquireTokenByClientCredential(tokenRequest);
}

async function callApi(endpoint, accessToken, userID) {

    const options = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    };

    console.log('request made to web API at: ' + new Date().toString());

    try {
        const response = await axios.get(endpoint+`/${userID}`, options);
        return response.data;
    } catch (error) {
        console.log(error)
        return error;
    }
};


export async function get({
  params,
  request
}) {

  try {
    
    const userID = request.headers.get('X-MS-CLIENT-PRINCIPAL-ID');

    
    // here we get an access token
    const authResponse = await getToken(tokenRequest);

    // call the web API with the access token
    const users = await callApi(apiConfig.uri, authResponse.accessToken, userID);

    return new Response(JSON.stringify(users), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.log(error);

    return new Response(JSON.stringify("Error"), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  }

}
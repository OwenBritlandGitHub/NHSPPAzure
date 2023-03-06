//import.meta.env.DB_PASSWORD for env variables

import {
  BlobServiceClient
} from '@azure/storage-blob';
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
  scopes: [process.env.GRAPH_ENDPOINT + '.default'],
};

const apiConfig = {
  uri: process.env.GRAPH_ENDPOINT + 'v1.0/users',
};

async function getToken(tokenRequest) {
  const cca = new msal.ConfidentialClientApplication(msalConfig);
  return await cca.acquireTokenByClientCredential(tokenRequest);
}

async function streamToText(readable) {
  readable.setEncoding('utf8');
  let data = '';
  for await (const chunk of readable) {
    data += chunk;
  }
  return data;
}

async function getHomeList(containerClient) {
  const blobClient = containerClient.getBlobClient("homeList.json");
  const downloadedBlob = await blobClient.download(0);
  const readableBlob = await streamToText(downloadedBlob.readableStreamBody);
  return (JSON.parse(readableBlob));

}

async function getGroups(endpoint, accessToken, userID) {

  const groupsEndpoint = `${endpoint}/${userID}/memberOf`;

  const options = {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }

  console.log('request made to web API at: ' + new Date().toString());

  try {
    const response = await axios.get(groupsEndpoint, options);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export async function post({
  request
}) {
  console.log("Button received");
  const blobServiceClient = await BlobServiceClient.fromConnectionString("DefaultEndpointsProtocol=https;AccountName=nhsppblobstorage;AccountKey=jwYBG9hCqxK3GC5HLWeQszi+Q63AOGt3qrSLBiBJ7TipokUG65Y/nCpc+NdtFGMy2sZeIzykjkqB+AStyme/sw==;EndpointSuffix=core.windows.net");
  const containerClient = await blobServiceClient.getContainerClient("bst-home-details");

  const homeIDList = await getHomeList(containerClient);
  console.log(homeIDList);

  let authenticated = 0;
  let tempName = '';

  try {

    const userID = request.headers.get('X-MS-CLIENT-PRINCIPAL-ID');

    console.log(1);

    const data = await request.json();

    console.log(2);

    // here we get an access token
    const authResponse = await getToken(tokenRequest);

    console.log(3);

    // call the web API with the access token
    const usersGroups = await getGroups(apiConfig.uri, authResponse.accessToken, userID);

    console.log(4);

    for (var i = 0; i < usersGroups.value.length; i++) {
      tempName = usersGroups.value[i].displayName;
      if (homeIDList.IDs.hasOwnProperty(tempName)) {
        if (usersGroups.value[i].id === homeIDList.IDs[tempName] && data['GUID'] === homeIDList.IDs[tempName]) {
          authenticated = 1;
        }
      }
    }

    console.log(5);

    if (authenticated === 0) {
      console.log("UnAuthenticated");
      return new Response("Error: Unauthenticated", {
        status: 401,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } else if (authenticated === 1) {
      console.log("Authenticated");

      const blobName = `${data['Title']}Details.json`;

      console.log(blobName);
      const blockBlobClient = await containerClient.getBlockBlobClient(blobName);

      const dataString = await JSON.stringify(data);

      const userEmail = request.headers.get('X-MS-CLIENT-PRINCIPAL-NAME');

      const blobOptions = {
        metadata: {
          "user": userEmail
        }
      }

      const uploadBlobResponse = await blockBlobClient.upload(dataString, dataString.length, blobOptions);


      return new Response("Data Uploaded", {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }


  } catch {
    return new Response("Server Error", {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
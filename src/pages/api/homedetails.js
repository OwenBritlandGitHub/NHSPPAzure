//import.meta.env.DB_PASSWORD for env variables
import axios from 'axios';
import msal from '@azure/msal-node';

import example from '../../../data/multihomeUser.json';

import {
  BlobServiceClient
} from '@azure/storage-blob';
//import usersGroups from '../../../data/exampleUserGroups.json'; //remove this when graph call returns correct groups

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

export async function get({
  params,
  request
}) {

  return new Response(JSON.stringify(example), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  /*

  const blobServiceClient = BlobServiceClient.fromConnectionString("DefaultEndpointsProtocol=https;AccountName=nhsppblobstorage;AccountKey=jwYBG9hCqxK3GC5HLWeQszi+Q63AOGt3qrSLBiBJ7TipokUG65Y/nCpc+NdtFGMy2sZeIzykjkqB+AStyme/sw==;EndpointSuffix=core.windows.net");
  const containerClient = blobServiceClient.getContainerClient("bst-home-details");

  const homeIDList = await getHomeList(containerClient);

  let usersAuthorisedCarehomes = [];
  let tempName = '';

  try {

    const userID = request.headers.get('X-MS-CLIENT-PRINCIPAL-ID');

    // here we get an access token
    const authResponse = await getToken(tokenRequest);

    // call the web API with the access token
    const usersGroups = await getGroups(apiConfig.uri, authResponse.accessToken, userID);

    for (var i = 0; i < usersGroups.value.length; i++) {
      tempName = usersGroups.value[i].displayName;
      if (homeIDList.IDs.hasOwnProperty(tempName)) {
        if (usersGroups.value[i].id === homeIDList.IDs[tempName]) {
          usersAuthorisedCarehomes.push(tempName);
        }
      }
    }

    var blobClient;
    var downloadedBlob;
    var readableBlob;
    var blobJson;
    var jsonObjects = [];

    for (var i = 0; i < usersAuthorisedCarehomes.length; i++) {
      blobClient = await containerClient.getBlobClient(`${usersAuthorisedCarehomes[i]}Details.json`);
      downloadedBlob = await blobClient.download(0);
      readableBlob = await streamToText(downloadedBlob.readableStreamBody);
      blobJson = JSON.parse(readableBlob);
      jsonObjects.push(blobJson);
    }


    return new Response(JSON.stringify(jsonObjects), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch {
    return new Response(JSON.stringify("Error"), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  */

}
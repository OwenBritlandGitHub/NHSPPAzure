//import.meta.env.DB_PASSWORD for env variables

import {BlobServiceClient} from '@azure/storage-blob';

export async function post({ request }) {
    const blobServiceClient = await BlobServiceClient.fromConnectionString("DefaultEndpointsProtocol=https;AccountName=nhsppblobstorage;AccountKey=jwYBG9hCqxK3GC5HLWeQszi+Q63AOGt3qrSLBiBJ7TipokUG65Y/nCpc+NdtFGMy2sZeIzykjkqB+AStyme/sw==;EndpointSuffix=core.windows.net");
    const containerClient = await blobServiceClient.getContainerClient("bst-home-details");

    const blobName = 'residentialplaces.json';
    const blockBlobClient = await containerClient.getBlockBlobClient(blobName);
    

    const data = await request.json();
    const dataString = await JSON.stringify(data);
    const uploadBlobResponse = await blockBlobClient.upload(dataString, dataString.length);
    
    return new Response("Data Uploaded", {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
}

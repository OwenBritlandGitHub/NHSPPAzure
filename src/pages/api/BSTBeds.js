//import.meta.env.DB_PASSWORD for env variables

import {BlobServiceClient} from '@azure/storage-blob';

async function streamToText(readable) {
    readable.setEncoding('utf8');
    let data = '';
    for await (const chunk of readable) {
      data += chunk;
    }
    return data;
}

export async function get({params, request}) {

    const blobServiceClient = BlobServiceClient.fromConnectionString("DefaultEndpointsProtocol=https;AccountName=nhsppblobstorage;AccountKey=jwYBG9hCqxK3GC5HLWeQszi+Q63AOGt3qrSLBiBJ7TipokUG65Y/nCpc+NdtFGMy2sZeIzykjkqB+AStyme/sw==;EndpointSuffix=core.windows.net");
    const containerClient = blobServiceClient.getContainerClient("bst-home-details");
    
    const blobClient = containerClient.getBlobClient("residentialplaces.json"); 
    const downloadedBlob = await blobClient.download(0);
    const readableBlob = await streamToText(downloadedBlob.readableStreamBody);
    const blobJson = JSON.parse(readableBlob);
    // console.log(blobJson);
    
    return new Response(JSON.stringify(blobJson), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }





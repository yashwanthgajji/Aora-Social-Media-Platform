import { Account, Client, ID } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.hardrock.aora',
    projectId: '66c0c7db00371d904f22',
    databaseId: '66c0c984002f0d699936',
    userCollectionId: '66c0c9b8000327c6070a',
    videoCollectionId: '66c0c9e6002b097728d3',
    storageId: '66c0cbda003c2a505759'
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
;

const account = new Account(client)

export const createUser = () => {
    account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe')
    .then(function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    });
}
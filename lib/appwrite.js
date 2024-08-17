import { Account, Avatars, Client, Databases, ID } from 'react-native-appwrite';

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
const avatars = new Avatars(client)
const databases = new Databases(client)

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )
        if (!newAccount) throw Error
        const avatarUrl = avatars.getInitials(username)
        await signIn(email, password)
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        )
        return newUser
    } catch(error) {
        console.log(error)
        throw new Error(error)
    }
}

export async function signIn(email, password) {
    try {
        const session = await account.createEmailPasswordSession(email, password)
        return session
    } catch(error) {
        throw new Error(error)
    }
}
// Function to validate the API key
import fs from "fs";

export const writeToEnv = (key, val) => {
    const envContent = fs.readFileSync('.env', 'utf8');
    const regex = new RegExp(`${key}=[^\n]*`, 'g');
    const newEnvContent = envContent.replace(
        regex, // Use the dynamic regex for the key
        `${key}=${val}` // Replace with the new key=value pair
    );

    // If the key wasn't found, throw error
    if (!envContent.match(regex)) {
        throw new Error(`Key ${key} not found in .env file`);
    }

    // Write the updated content back to the .env file
    fs.writeFileSync('.env', newEnvContent, 'utf8');
}

// Function to generate random string of length n for testing
export const generateLicense = (n) =>
    Array.from({ length: n }, () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'[Math.floor(Math.random() * 36)]).join('');


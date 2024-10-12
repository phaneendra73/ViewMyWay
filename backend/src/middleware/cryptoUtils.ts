// src/middleware/cryptoUtils.ts

export async function hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }
  
  export async function verifyPassword(inputPassword: string, storedHash: string): Promise<boolean> {
    const inputHash = await hashPassword(inputPassword);
    return inputHash === storedHash;
  }
  
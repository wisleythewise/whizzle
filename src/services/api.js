import { db } from '../firebaseConfig'; 

export async function getUserData(userId) {
  const doc = await db.collection('users').doc(userId).get();
  return doc.exists ? doc.data() : null;
}

// Deze functie maakt de API call naar de databse om user info op te vragen. Hierdoor kan je in andere components deze functie aanroepen ipv de api call telkens opnieuw te coderen
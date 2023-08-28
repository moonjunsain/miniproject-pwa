// TODO: Install the following package:
import { openDB } from 'idb';

// TODO: Complete the initDb() function below:
const initdb = async () => {
    openDB('idc', 1, {
        upgrade(db){
            if(db.objectStoreNames.contains('idc')){
                return
            }
            db.createObjectStore('idc', {keyPath: 'id', autoIncrement: true})
        }
    })
};


// TODO: Complete the postDb() function below:
export const postDb = async (name, home, cell, email)  => {
    const obj = {
        name,
        home,
        cell,
        email
    }
    const idcDb = await openDB('idc', 1)
    const tx = idcDb.transaction('idc', 'readwrite')
    const store = tx.objectStore('idc')
    const request = store.add({info: obj})
    const result = await request
    return result
};

// TODO: Complete the getDb() function below:
export const getDb = async () => {
    const idcDb = await openDB('idc', 1);
    const tx = idcDb.transaction('idc', 'readonly');
    const store = tx.objectStore('idc');
    const request = store.getAll();
    const result = await request;
    console.log('result.value', result);
    return result;
};

// TODO: Complete the deleteDb() function below:
export const deleteDb = async (id) => {
    console.log('DELETE from the database', id);
    const idcDb = await openDB('idc', 1);
    const tx = idcDb.transaction('idc', 'readwrite');
    const store = tx.objectStore('idc');
    const request = store.delete(id);
    const result = await request;
    console.log('result.value', result);
    return result;
};

initdb();

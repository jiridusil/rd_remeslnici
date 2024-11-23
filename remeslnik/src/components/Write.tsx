import { getDatabase, ref, set, push } from "firebase/database";
import { app } from "../firebaseConfig";
import { useState } from "react";

export const Write = () => {
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');

    const saveData = async () => {
        const db = getDatabase(app);
        console.log('db', db);
        const newPostKey = push(ref(db, 'remeslo/jmeno'));
        set(newPostKey, {
            firstName: value1,
            lastName: value2
        }).then(() => { alert('Data saved') }).catch((error) => { alert('Data not saved') });
    }

    return (
        <div>
            <input onChange={(e) => setValue1(e.target.value)} type="text" placeholder="Write something..." />
            <input onChange={(e) => setValue2(e.target.value)} type="text" placeholder="Write something2..." />
            <button onClick={saveData}>Save</button>
        </div >
    )
}
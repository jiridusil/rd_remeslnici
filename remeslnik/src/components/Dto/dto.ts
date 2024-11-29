import { get, getDatabase, ref, remove } from "firebase/database";
import { app } from "../../firebaseConfig";

export const readData = async () => {
    const db = getDatabase(app);
    const contractorRef = ref(db, "remeslnik/");
    const snapshot = await get(contractorRef);
    if (snapshot.exists()) {
      const val = snapshot.val();
      const jsonData = Object.values(val);
      console.log("jsonData", jsonData);
      return jsonData;
    } else {
      console.log("No data available");
      return [];
    }
  };


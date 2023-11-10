import './tracking.css'
import DatePicker from 'react-datepicker';
import React, { useEffect, useState } from 'react';
import Sidebar from '../../Scenes/Global/Sidebar';
import Topbar from '../../Scenes/Global/Topbar';
import { Button } from '@mui/material';
import 'react-datepicker/dist/react-datepicker.css';
import { db } from '../../firebase_config';
import { collection, getDocs } from "firebase/firestore";

const Tracking = () =>{
    const [isSidebar, setIsSidebar] = useState(true);
    const [selectedDate, setSelectedDate] = useState(null);
    const [driverNames, setDriverNames] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const querySnapshot = await getDocs(collection(db, 'users'));
            const names = [];
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              names.push(data.fistName);
            });
            setDriverNames(names);
          } catch (error) {
            console.error('Erreur lors de la récupération des noms de chauffeurs : ', error);
          }
        };
        document.title = "Trace de la voiture";

        fetchData();
  }, []);



    return (
      <>
      <div className="app">
      <Sidebar isSidebar={isSidebar} />
      
      <main className='content'>
      <Topbar setIsSidebar={setIsSidebar} />
<div className="container_tr">
                <div className="header_tr">
                    <div className="text_tr">TRACER UN VEHICULE</div>
                    <div className="underline"></div>
                </div>

                <div className="inputs">
                    <div className="input" id='nom'>
                        NOM DU CHAUFFEUR:
                        <select>
                        {driverNames.map((name, index) => (
                        <option key={index} value={name}>
                            {name}
                        </option>
                        ))}
                        </select>
                    </div>
                    <div className="header_tr">
                        <div id='text_date'>Selectionnez une date</div>
                        <div className="underline"></div>
                        <DatePicker
                        selected={selectedDate}
                        onChange={date => setSelectedDate(date)}
                        dateFormat="dd/MM/yyyy" // Customize the date format
                    />
                    </div>
                </div>

                <div className="submit-container">
                  <div className='submit_tr'><a href="/map"><Button type="submit" color="secondary" variant="contained">Voir la trace</Button></a></div>
                    
                </div>
            </div>
                  </main>
                  </div>
            
                  </>
)
}

export default Tracking
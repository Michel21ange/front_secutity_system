import './detail_maintenance.css'
import DatePicker from 'react-datepicker';
import React, { useState, useEffect } from 'react';
import Sidebar from '../../Scenes/Global/Sidebar';
import Topbar from '../../Scenes/Global/Topbar';
import { Button } from '@mui/material';
import 'react-datepicker/dist/react-datepicker.css';
import { db } from '../../firebase_config';
import { collection, getDocs } from "firebase/firestore";

const DetailMaintenance = () =>{
    const [isSidebar, setIsSidebar] = useState(true);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [driverNames, setDriverNames] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const querySnapshot = await getDocs(collection(db, 'users'));
            const names = [];
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              names.push(data.immatriculation);
            });
            setDriverNames(names);
          } catch (error) {
            console.error('Erreur lors de la récupération des noms de chauffeurs : ', error);
          }
        };
        document.title = "Detail de la maintenance";

        fetchData();
  }, []);

    return (
      <>
      <div className="app">
      <Sidebar isSidebar={isSidebar} />
      
      <main className='content'>
      <Topbar setIsSidebar={setIsSidebar} />
<div className="container_dm">
                <div className="header_dm">
                    <div className="text_dm">DETAIL DE MAINTENANCE</div>
                    <div className="underline"></div>
                </div>

                <div className="inputs">
                    <div className="input" id='nom'>
                        NUMERO DE VOITURE:
                        <select>
                        {driverNames.map((name, index) => (
                        <option key={index} value={name}>
                            {name}
                        </option>
                        ))}
                        </select>
                    </div>
                    <div className="date_dm">
                        <div id='text_date'>Selectionnez une date debut
                        <div className="underline"></div>
                        <DatePicker
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        dateFormat="dd/MM/yyyy" // Customize the date format
                    /></div>
                        <div id='text_date'>Selectionnez une date de fin
                        <div className="underline"></div>
                        <DatePicker
                        selected={endDate}
                        onChange={date => setEndDate(date)}
                        dateFormat="dd/MM/yyyy" // Customize the date format
                    /></div>
                    </div>
                </div>

                <div className="submit-container">
                <div className='submit_tr'><a href="display_detail_maintenance"><Button type="submit" color="secondary" variant="contained">Voir</Button></a></div>
                </div>
            </div>
            </main>
      </div>

      </>
)
}

export default DetailMaintenance
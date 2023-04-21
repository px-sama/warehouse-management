import React, { useState } from 'react';
import { db } from '../firebase'
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { v1 as uuidv1 } from 'uuid';

const WarehouseForm = () => {
    const [selectedZone, setSelectedZone] = useState(null);
    const [shelfInputs, setShelfInputs] = useState([]);
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const uid = uuidv1()

    const handleZoneSelect = (zoneNumber) => {
        setSelectedZone(zoneNumber);
        setShelfInputs(Array.from({ length: 10 }, (_, i) => ({ id: i + 1, name: '' })));
    };

    const handleShelfNameChange = (index, event) => {
        const newShelfInputs = [...shelfInputs];
        newShelfInputs[index].name = event.target.value;
        setShelfInputs(newShelfInputs);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const zoneShelfData = {};
        shelfInputs.forEach((shelf, index) => {
            if (shelf.name !== '') {
                zoneShelfData[`shelf-${index + 1}`] = shelf.name;
            }
        });
        const newFormData = { ...formData };
        newFormData[`zone-${selectedZone}`] = zoneShelfData;
        setFormData(newFormData);
        setSelectedZone(null);
        setShelfInputs([]);
    };

    const handleSave = async (event) => {
        event.preventDefault();
        try {
            const dataRef = await setDoc(doc(db, 'data', `${uid}`),
                formData)
            navigate('/landing')
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const renderZoneButtons = () => {
        const buttons = [];
        for (let i = 1; i <= 12; i++) {
            buttons.push(
                <button
                    key={i}
                    className={`button ${selectedZone === i ? 'is-success' : ''}`}
                    onClick={() => handleZoneSelect(i)}
                    disabled={selectedZone === i}
                >
                    Zone {i}
                </button>
            );
        }
        return buttons;
    };

    const renderShelfInputs = () => {
        return shelfInputs.map((shelf, index) => {
            return (
                <li key={shelf.id}>
                    <div class="control">
                        <label class="label is-large" htmlFor={`shelf-${shelf.id}`}>Shelf {shelf.id}</label>
                        <div class="columns is-centered">
                            <div class="column is-one-fifth">
                                <input
                                    class="input is-medium"
                                    type="text"
                                    id={`shelf-${shelf.id}`}
                                    name={`shelf-${shelf.id}`}
                                    value={shelf.name}
                                    onChange={(event) => handleShelfNameChange(index, event)}
                                />
                            </div>
                        </div>
                    </div>
                </li>
            );
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <section class="section is-medium">
                <h1 class="title">Select a Zone</h1>
            </section>

            <div>
                <div class="buttons is-centered is-grouped">{renderZoneButtons()}</div>
            </div>

            <section class="section is-small">
                {selectedZone && (
                    <div>
                        <ul>{renderShelfInputs()}</ul>
                        <div class="section is-small">
                            <button class="button is-large is-primary" type="submit">Save Shelf selections for Zone {selectedZone}</button>
                        </div>
                    </div>
                )}
            </section>

            {Object.keys(formData).length > 0 && (
                <div>
                    {/* Check JSON output */}
                    <h2>Form Data:</h2>
                    <pre>{JSON.stringify(formData, null, 2)}</pre>
                    <button class="button is-primary is-large" onClick={handleSave}>Save to Firebase</button>
                </div>
            )}
        </form>
    );
};

export default WarehouseForm;

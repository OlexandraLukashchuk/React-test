import React, { useState, useEffect } from "react";
import sluzbaData from "./data/sluzba.json";
//import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";
import "./strona.css"



const Table = ({ data }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Imię</th>
                    <th>Nazwisko</th>
                    <th>Data urodzenia</th>
                    <th>Funkcja</th>
                    <th>Doświadczenie</th>
                </tr>
            </thead>
            <tbody>
                {data.map((person) => (
                    <tr key={person.id}>
                        <td>{person.id}</td>
                        <td>{person.firstName}</td>
                        <td>{person.lastName}</td>
                        <td>{person.dateOfBirth}</td>
                        <td>{person.function}</td>
                        <td>{person.experience}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

const Strona = () => {
    const [filteredData, setFilteredData] = useState([]);
    const [sortKey, setSortKey] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        setFilteredData(sluzbaData);
    }, []);

    const handleFilter = (event) => {
        const { name, value } = event.target;
    
        const filtered = sluzbaData.filter((person) =>
          String(person[name]).toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(filtered);
      };



    // const formatDate = (date) => {
    //     if (date) {
    //         const parsedDate = moment(date, 'DD.MM.YYYY H:mm');
    //         const formattedDate = parsedDate.format('DD/MM/YYYY HH:mm');
    //         return parsedDate.toDate();
    //     }
    //     return null;
    // };

    // const handleDateFilter = (date) => {
    //     setSelectedDate(date);

    //     if (date) {
    //         const filtered = sluzbaData.filter((person) => {
    //             const formattedDate = formatDate(person.dateOfBirth);
    //             return formattedDate === formatDate(date);
    //         });
    //         setFilteredData(filtered);
    //     } else {
    //         setFilteredData(sluzbaData);
    //     }
    // };

    const handleSort = (key) => {
        if (sortKey === key) {
            setFilteredData([...filteredData].reverse());
        } else {
            let sorted;
            if (key === "id") {
                sorted = [...filteredData].sort((a, b) => a[key] - b[key]);
            } else {
                sorted = [...filteredData].sort((a, b) =>
                    a[key].localeCompare(b[key])
                );
            }
            setFilteredData(sorted);
        }
        setSortKey(key);
    };

    const handleSortById = () => {
        handleSort("id");
    };

    const handlePagination = (page) => {
        setCurrentPage(page);
    };

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = filteredData.slice(startIndex, endIndex);

    return (
        <div className="container">
            <h1 className="title">Służba Zamku Pięknej i Bestii</h1>
            <input
                type="text"
                placeholder="Filtruj po imieniu..."
                name="firstName"
                onChange={handleFilter}
            />

            <input
                type="text"
                placeholder="Filtruj po nazwisku..."
                name="lastName"
                onChange={handleFilter}
            />
            <input
                type="text"
                placeholderText="Filtruj po dacie urodzenia..."
                name="dateOfBirth"
                onChange={handleFilter}
            />
            {/* działa jak trzeba
             <DatePicker
                showTimeSelect
                selected={selectedDate}
                placeholderText="Filtruj po dacie urodzenia..."
                name="dateOfBirth"
                onChange={handleDateFilter}
            /> */}
            <input
                type="text"
                placeholder="Filtruj po funkcji..."
                name="function"
                onChange={handleFilter}
            />
            <input
                type="text"
                placeholder="Filtruj po doświadczeniu..."
                name="experience"
                onChange={handleFilter}
            />
            <button className="sortButton" onClick={handleSortById}>Sortuj po id</button>
            <Table data={currentData} />
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePagination(page)}
                        className={currentPage === page ? "activePage" : "pageButton"}
                    >
                        {page}
                    </button>
                )
                )}
            </div>
        </div>
    );
};

export default Strona;

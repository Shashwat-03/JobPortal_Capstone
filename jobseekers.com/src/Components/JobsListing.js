import './JobsListing.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faIndianRupeeSign, faLocationDot, faFileLines, faClockRotateLeft, faStar } from '@fortawesome/free-solid-svg-icons'
import data from '../jobs.json'

const JobsListing = () => {
    const [jobs, setJobs] = useState(data);

    //used for setting the filters
    const [experience, setExperience] = useState(10);
    const [salaryRadio, setSalaryRadio] = useState("all");
    const [location, setLocation] = useState("all");

    const handleSaveJobs = (e) => {
        console.log("save to be implemented");
    }

    //utility functions
    const calculateTime = (time) => {
        const givenTime = new Date(time);
        const currTime = new Date(Date.now())
        const diffDays = parseInt((currTime - givenTime) / (1000 * 60 * 60 * 24), 10); 
        return diffDays;
    }

    //Filtering functions
    const handleExperience = (e) => {
        setSalaryRadio("all"); // setting initial value for radio btn i.e., all
        setLocation("all"); // setting initial value of location i.e., all

        setExperience(e.target.value);
        const filteredJob = data.filter((item) => parseInt(item.exp, 10) <= e.target.value);
        console.log(filteredJob);
        setJobs(filteredJob);
    }
    const handleLocation = (e, key) => {
        setSalaryRadio("all"); // setting initial value for radio btn i.e., all
        setExperience(10);  // setting initial value for experience to 10

        if (key === 'remote') {
            const filteredJob = data.filter((item) => item.location[0] === 'Remote')
            console.log(filteredJob);
            setJobs(filteredJob);
        } else if (key === 'office') {
            const filteredJob = data.filter((item) => item.location[0] !== 'Remote')
            console.log(filteredJob);
            setJobs(filteredJob);
        } else if(key === 'all') {
            setJobs(data);
        }
    }
    const handleCheckBox = (e, key) => {
        setExperience(10);  // setting initial value for experience
        setLocation("all"); // setting initial value of location i.e., all

        if(e.target.checked) {
            if(key === "0to3") {
                const filterJob = data.filter((item)=> item.ctc <= 3)
                setJobs(filterJob);
                setSalaryRadio(key);
            }
            if(key === "3to5") {
                //item.ctc === 0 --> not disclosed, between 3 and 5
                const filterJob = data.filter((item)=> (item.ctc >= 3 && item.ctc <= 5) || item.ctc == 0)
                setJobs(filterJob);
                setSalaryRadio(key);
            } 
            if(key === "5to10") {
                //item.ctc === 0 --> not disclosed, between 5 and 10
                const filterJob = data.filter((item)=>  (item.ctc >= 5 && item.ctc <= 10) || item.ctc == 0)
                setJobs(filterJob);
                setSalaryRadio(key);
            } 
            if(key === "10to15") {
                //item.ctc === 0 --> not disclosed, between 10 and 15
                const filterJob = data.filter((item)=> (item.ctc >= 10 && item.ctc <= 15) || item.ctc == 0)
                setJobs(filterJob);
                setSalaryRadio(key);
            }
            if(key === "15plus") {
                //item.ctc === 0 --> not disclosed
                const filterJob = data.filter((item)=> item.ctc >= 15 || item.ctc == 0)
                setJobs(filterJob);
                setSalaryRadio(key);
            } 
            if(key === 'all') {
                setJobs(data);
                setSalaryRadio(key);
            }
        } else {
            setJobs(data);
        }
    }

    return (
        <div className='parent-container'>
            <div className="filter-container">
                <h4>Filter</h4>
                <div>
                    <h6>Location</h6>
                    <button className='filter-btn btn btn-primary' onClick={(e) => handleLocation(e, "all")}>All</button>
                    <button className='filter-btn btn btn-primary' onClick={(e) => handleLocation(e, "remote")}>Remote</button>
                    <button className='filter-btn btn btn-primary' onClick={(e) => handleLocation(e, "office")}>Office</button>
                </div>

                <div>
                    <h6>Experience</h6>
                    <input type="range" min="0" max="10" value={experience} onChange={(e) => handleExperience(e)} />
                    <p>Yrs: <span id="demo">{experience}+ </span></p>
                </div>
                <div className='salary-div'>
                    <h6>Salary</h6>
                    <ul>
                        <li>
                            <input type='radio' name='salary' checked={salaryRadio === 'all'} value="all" onChange={(e) => handleCheckBox(e, "all")}/> <span>All</span>
                        </li>
                        <li>
                            <input type='radio' name='salary' checked={salaryRadio === '0to3'} value="0to3" onChange={(e) => handleCheckBox(e, "0to3")}/> <span>0 to 3 LPA</span>
                        </li>
                        <li>
                            <input type='radio' name='salary' checked={salaryRadio === '3to5'} value="3to5" onChange={(e) => handleCheckBox(e, "3to5")} /> 3 to 5 LPA
                        </li>
                        <li>
                            <input type='radio' name='salary' checked={salaryRadio === '5to10'} value="5to10" onChange={(e) => handleCheckBox(e, "5to10")} /> 5 to 10 LPA
                        </li>
                        <li>
                            <input type='radio' name='salary' checked={salaryRadio === '10to15'} value="10to15" onChange={(e) => handleCheckBox(e, "10to15")} /> 10 to 15 LPA
                        </li>
                        <li>
                            <input type='radio' name='salary' checked={salaryRadio === '15plus'} value="15+" onChange={(e) => handleCheckBox(e, "15plus")} /> 15+ LPA
                        </li>
                    </ul>
                </div>
            </div>

            <div className="card-container container ">
                <div className="row">
                    {
                        jobs.map((item) => (
                            <div className="card">
                                <div className='card-body'>
                                    <h4 className='job-title'>{item.title}</h4>
                                    <p className='company-name'>{item.company}</p>
                                    <ul className='card-list'>
                                        <li>
                                            <FontAwesomeIcon icon={faBriefcase}/>
                                            {/* always write years, no plus symbol in json */}
                                            <span>{item.exp}+ Yrs</span>
                                        </li>
                                        <li>
                                            <FontAwesomeIcon icon={faIndianRupeeSign}/>
                                            {/* always write numbers, lpa will not be added in json */}
                                            <span>{item.ctc > 0 ? item.ctc + " LPA" : "Not disclosed"}</span>
                                        </li>
                                        <li>
                                            <FontAwesomeIcon icon={faLocationDot} />
                                            {/* only 2 locations are permitted in json*/}
                                            <span>{item.location.length > 1 ? item.location[0] + ", " + item.location[1] : item.location[0]}</span>
                                        </li>
                                    </ul>
                                    
                                    <FontAwesomeIcon icon={faFileLines} />
                                    <span>{item.desc}</span>
                                    <br/>
                                    <button className='btn btn-primary apply-btn'>Apply</button>
                                    <div className='history-save'>
                                        <div className='history'>
                                            <FontAwesomeIcon icon={faClockRotateLeft} />
                                            
                                            <span> 
                                            {calculateTime(item.postedOn)} DAYS AGO
                                            </span>
                                        </div>
                                        <div className='save' onClick={(e) => handleSaveJobs(e, item.id)}>
                                            <FontAwesomeIcon icon={faStar}  className="icon" />
                                            <span>Save</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="featured-container">
                <p className="featured-heading">Featured Opportunities</p>
                <img alt='' src='https://img.naukimg.com/fc_images/v2/63124.gif'></img>
                <img alt='' src="https://img.naukimg.com/fc_images/v2/103944.gif"></img>
                <img alt='' src='https://img.naukimg.com/fc_images/v2/41373.gif'></img>
                <img alt='' src="https://img.naukimg.com/fc_images/v2/24468.gif"></img>
                <img alt='' src="https://img.naukimg.com/fc_images/v2/15001.gif"></img>
                <img alt='' src="https://img.naukimg.com/fc_images/v2/479215.gif"></img>
                <img alt='' src="https://img.naukimg.com/fc_images/v2/13512.gif"></img>
                <img alt='' src="https://img.naukimg.com/fc_images/v2/16987.gif"></img>
                <img alt='' src="https://img.naukimg.com/fc_images/v2/100007.gif"></img>
                <img alt='' src="https://img.naukimg.com/fc_images/v2/121866.gif"></img>
            </div>

        </div>
    )
}
export default JobsListing;
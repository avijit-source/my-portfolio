import React, { useEffect, useState } from 'react'
import "./hero.css"
import { AiFillGithub, AiOutlineContacts } from "react-icons/ai";
import supabase from '../config/supabaseClient';
import {FiDownload} from "react-icons/fi"

function Hero() {

    const [fetchErr, setFetchErr] = useState(null)
    const [heroData, setHeroData] = useState(null)

    useEffect(() => {
        async function fetchData() {
            const { data, error } = await supabase
                .from("portfolio-data")
                .select("cvLink")
                .single()

            if (error) {
                setFetchErr("sorry could not fetch data")
                setHeroData(null)
            }
            if (data) {
                setHeroData(data)
                setFetchErr(null)
            }
        }

        fetchData()
    }, [])
    const handleClick = (e) => {
        let next = document.getElementById("contact")
        if (next) {
            next.scrollIntoView({ behavior: 'smooth' });
        }
    }
    return (
        <div className="hero">
            {fetchErr && (<p>{fetchErr}</p>)}
            {
                heroData && (
                    <div className="hero-cont">
                        <h3>Hello there <span className="wave">👋</span></h3>
                        <h3>I'm Avijit Chakraborty</h3>
                        <h3>I build stuff for the web</h3>
                        <button onClick={()=>window.open("https://github.com/avijit-source", "_blank")}>
                        <span style={{ display:"flex",justifyContent: "center",alignItems: "center"}}>
                        <AiFillGithub />
                        <span style={{marginLeft:"3px"}}>Github</span>
                        </span>
                        </button>
                        <button onClick={handleClick}>
                            <span style={{ display:"flex",justifyContent: "center",alignItems: "center"}}>
                            <AiOutlineContacts /><span style={{marginLeft:"3px"}}> Contact</span>
                            </span>
                        </button>
                        <button ><a style={{ textDecoration: "none", color: 'white',display:"flex",justifyContent: "center",alignItems: "center"}}
                         href={heroData.cvLink} download><FiDownload /> <span style={{marginLeft:"3px"}}>Download Cv</span></a>
                         </button>
                    </div>
                )
            }
        </div>
    )
}

export default Hero

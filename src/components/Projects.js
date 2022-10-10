import React, { useEffect, useState } from 'react'
import { AiFillGithub } from "react-icons/ai";
import Slider from "react-slick";
import supabase from '../config/supabaseClient';
import "./projects.css"
function Projects() {
    const [fetchErr, setFetchErr] = useState(null)
    const [projectsData, setProjectsData] = useState(null)

    useEffect(() => {
        async function fetchData() {
            const { data, error } = await supabase
                .from("projects")
                .select()
                .order("id");
            if (error) {
                setFetchErr("sorry could not fetch data")
                setProjectsData(null)
            }
            if (data) {
                setProjectsData(data)
                setFetchErr(null)
            }
        }

        fetchData()
    }, [])
    const settings = {
        dots: true,
        infinite: true,
        // speed: 500,
        // mobileFirst: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
        ]
    };
    return (
        <div className="projects">
            <h2>Projects
            </h2>
            {fetchErr && (<p>{fetchErr}</p>)}
            {projectsData && (
                <Slider {...settings}>
                    {
                        projectsData.map(val => (
                            <div className="project" key={val.id}>
                                <img
                                    width="320"
                                    height="500"
                                    src={val.imageurl} />
                                <p style={{ minHeight: "5.2vh", fontSize: "0.9rem", maxWidth: "95%", textAlign: "center" }}>
                                    {val.description}
                                </p>
                                <button className="btn-primary" onClick={() => window.open(`${val.githublink}`, "_blank")}><span style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><AiFillGithub /> <span style={{ marginLeft: "5px" }}>Github</span></span></button>
                            </div>
                        ))
                    }
                </Slider>
            )}

        </div>
    )
}

export default Projects
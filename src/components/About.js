import React, { useEffect, useState } from 'react'
import supabase from '../config/supabaseClient'
import "./about.css"
import Loader from './Loader'

function About() {
  
  const [fetchErr, setFetchErr] = useState(null)
  const [aboutData, setAboutData] = useState(null)
  const [loading,setLoading] = useState(false)

  useEffect(() => {
      async function fetchData() {
           setLoading(true)
          const { data, error } = await supabase
              .from("portfolio-data")
              .select("about,profilepicture")
              .single()

          if (error) {
              setFetchErr("sorry could not fetch data")
              setAboutData(null)
              setLoading(false)
          }
          if (data) {
              setAboutData(data)
              setFetchErr(null)
              setLoading(false)
          }
      }

      fetchData()
  }, [])

  if(loading===true){
    return <Loader />
  }
  return (
    <div className="cards">
       {fetchErr && (<p>{fetchErr}</p>)}
       {aboutData && (
        <article className="card">
        <header>
          <h2 style={{textAlign: 'center'}}>About Me</h2>
        </header>
        <img src={aboutData.profilepicture} alt="Hot air balloons" />
        <div className="content">
          <p>{aboutData.about}</p>
        </div>
        <hr />
      </article>
       )}
    </div>
  )
}

export default About
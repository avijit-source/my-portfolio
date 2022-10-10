import React, { useRef, useState } from 'react'
import "./contact.css"
import { BiMailSend } from "react-icons/bi"
import supabase from '../config/supabaseClient'


function Contact() {

    const [nameErr, setNameErr] = useState("")
    const [emailErr, setEmailErr] = useState("")
    const [messageErr, setMessageErr] = useState("")
    const [supabaseErr, setSupabaseErr] = useState("")
    const [values, setValues] = useState({
        name: "",
        email: "",
        message: ""
    })
    const [successMsgs, setSuccessMsgs] = useState("");
    const [loading, setLoading] = useState(false)
    let timer3ref = useRef(null)
    let timer2 = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, message } = values;
        let count = 0;
       
        let emailPattern = /^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i;
        if (name.length < 3 || name === "" || !isNaN(name)) {
            setNameErr("please enter a valid name")
            count++;
        }
        if (!emailPattern.test(email)) {
            setEmailErr("Please enter a valid email")
            count++;
        }
        if (message.length < 3 || message === "" || !isNaN(message)) {
            setMessageErr("please write a valid message")
            count++;
        }
        if (count === 0) {
            submitData(e, name, email, message);
        } else {
            if(timer3ref.current){
                clearTimeout(timer3ref.current);
            }
            timer3ref.current = setTimeout(() => {
                setNameErr("");
                setEmailErr("");
                setMessageErr("");
                clearTimeout(timer3ref.current);
            }, 3000)
        }
    }
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const submitData = async function (e, name, email, message) {
        setLoading(true)
        const { data, error } = await supabase
            .from("contacts")
            .insert([{ name, email, message }],{ returning: "minimal" });
        if (error) {
            setSupabaseErr("sorry could not send data")
            console.log(error);
        }else{
            setSuccessMsgs("Successfully received 🎆 !! I will respond as soon as possible")
        }
        setLoading(false)
        e.target.reset()
        setValues({
            name: "",
            email: "",
            message: ""
        })
        if(timer2.current){
            clearTimeout(timer2.current)
        }
        timer2.current = setTimeout(() => {
            setSuccessMsgs("")
            setSupabaseErr("")
            clearTimeout(timer2.current)
        }, 4000)
    }
    return (
        <div className="contact" id="contact">
            <div className="form">
                <h3 style={{ display: 'flex', justifyContent: "center" }}>Contact<BiMailSend color="white" style={{ fontSize: "1.4rem" }} /></h3>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <input name="name" type="search" placeholder="enter name/organization" onChange={handleChange} className="inputs" />
                    <span style={{ color: "red", display: 'block' }}>{nameErr}</span>
                    <input name="email" type="search" placeholder="enter your email" onChange={handleChange} className="inputs" />
                    <span style={{ color: "red", display: 'block' }}>{emailErr}</span>
                    <input name="message" type="search" placeholder="write a message" onChange={handleChange} className="inputs" />
                    <span style={{ color: "red", display: 'block' }}>{messageErr}</span>
                    <input type="submit" value={loading === true ? "waiting..." : "Submit"} className="button-31" disabled={loading} />
                    <span style={{ color: "lightgreen", display: 'block' }}>{successMsgs}</span>
                    <span style={{ color: "red", display: 'block' }}>{supabaseErr}</span>
                </form>
                <hr />
                <p style={{ fontSize: "1.1rem", fontWeight: "100" }}>Alternatively send me an email <a href="mailto:avijitch2022@gmail.com"
                    style={{ textDecoration: "none", color: "lightblue" }}>here </a> </p>
            </div>
        </div>
    )
}

export default Contact
"use client"
import Image from "next/image";
import "./contact.css"
import React, { useState } from "react";

interface Ierror {
  name?: string
  lastName?: string
  email?: string
  message?: string
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    message: ""
  })

  const [errors, setErrors] = useState<Ierror>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: Ierror = {}

    if(!formData.name) {
      newErrors.name = "Votre prénom est requis"
    }

    if(!formData.lastName) {
      newErrors.lastName = "Votre nom est requis"
    }

    if (!formData.email) {
      newErrors.email = "L'adresse e-mail est requise";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'adresse e-mail n'est pas valide";
    }

    if(!formData.message) {
      newErrors.message = "Entrez votre message"
    }

    if(Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
    } else {
      alert("Formulaire remplis !")
      setFormData({ lastName: "", name: "", email: "", message: "" });
      setErrors({});
    }
    
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className="presentation-container">
        <h1 className="page-title">Nous joindre</h1>
      </div>
      <div className="content contact">
        <div className="contact-separation">
          <div className="left-illustration">
            <Image src="/images/robotSuspendu.jpg" className="left-image" width={500} height={1000} alt="Robot 2024"></Image>
          </div>
          <form className="contact-form-container" onSubmit={handleSubmit}>
            <h1 className="form-title font40">Remplisser le formulaire pour nous rejoindre !</h1>
            <div className="input-row">
              <div className="input-container">
                {errors.lastName && <p className="error-message">{errors.lastName}</p>}
                 <input 
                  className='input-field'
                  type="text"
                  name="lastName"
                  placeholder="Votre nom"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="input-container">
                {errors.name && <p className="error-message">{errors.name}</p>}
                <input 
                className='input-field'
                type="text"
                name="name"
                placeholder="Votre prénom"
                value={formData.name}
                onChange={handleChange}
                />
              </div>
            </div>
            <div className="input-row">
              <div className="input-container">
                {errors.email && <p className="error-message">{errors.email}</p>}
                <input
                  className='input-field'
                  type="email"
                  name="email"
                  placeholder="Votre adresse e-mail"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="input-row">
              <div className="input-container">
                {errors.message && <p className="error-message">{errors.message}</p>}
                <textarea
                className='input-field message-input'
                name="message"
                placeholder="Votre message"
                value={formData.message}
                onChange={handleChange}
                />
              </div>
            </div>
            <div className="input-row">
              <input
                className='input-field'
                type="submit"
                value="Envoyer"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

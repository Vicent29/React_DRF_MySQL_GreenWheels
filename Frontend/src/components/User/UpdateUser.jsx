import React, { useContext, useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import "./User.scss";
import AuthContext from '../../context/AuthContext'
// import AuthService from '../../services/AuthService';
// import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function UpdateUser() {
  const { user } = useContext(AuthContext);

  // Save Data Form
    const [form, setForm] = useState({
      name: "",
      email: "",
      password: "",
      avatar: "",
      chat_id: "",
    });

  // Control Edit inputs fields
    const [check, setCheck] = useState({
      name: "",
      email: "",
      password: "",
      avatar: "",
      chat_id: "",
    });


  const [change, setchange] = useState();
  const change_img = () => {
    setCheck({ avatar: '' });
    setchange(form.avatar)
  };

  
  // Telegram Feature
    const generateChatId = () => {
      let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < 10; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
    };

    const ClickTelegram = () => {
      const newChatId = generateChatId();
      setForm({ chat_id: newChatId });
      setCheck({ chat_id: true });
    };

    const saveChatId = () => {
      //Enviar datos al Auth Service
      setCheck({ chat_id: '' });
    };
  
  // Control Regex errors
    const [err, setErr] = useState({
      email: "",
      passwd: ""
    });

    const chechErrors = () => { 
      setErr({ email: "*Format email incorrect" });
      const regex_email = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      const regex_passwd = /^[A-Z0-9._@%&+-]{4,}/i;
      /* if (!regex_email.test(form.email) && !regex_passwd.test(form.password )) {
        console.log("Error uno");
        setErr({ email: "*Format email incorrect" });
        setErr({ passwd: "*Format password incorrect" });
      }else {
        setErr({ email: '' });
        setErr({ passwd: '' });
      } */
      if (!regex_email.test(form.email)) {
        console.log("Error 2");
        setErr({ email: "*Format email incorrect" });
        console.log(err.email)
      }else {
        setErr({ email: '' });
      }
      if (!regex_passwd.test(form.password)) {
        setErr({ passwd: "*Format password incorrect" });
      }else {
        setErr({ passwd: '' });
      }
    };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   setCheckState({
  //     name: false,
  //     email: false,
  //     password: false,
  //     img: false
  //   });
  //   dispatch({ type: USER_UPDATE, payload: formState });
  // }


  return (
    <>
      <div>
        <div className="d-flex justify-center align-baseline">
          <img src={change ? change :user.avatar} alt="avatar" className="img_profile text-center rounded-circle img-fluid"></img>
        </div>
        <form className='form-outline mb-4'>
          {/* Username */}
          <div className="form-outline mt-3 row justify-content-center">
            <div className="row ml-2">
              <p className="p_icon"><FontAwesomeIcon className="U_icon" icon="fa-solid fa-user" /></p>
              {!check.name && (
                <h5 className="d-flex align-items-center col-8 ml-2 mr-2">{form.name ? form.name : (user.first_name + ' ' + user.last_name)}</h5>
              )}
              {check.name  && (
                <div className='col'>
                  <input className="text-center form-control form-control-md" type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder={form.name ? form.name : (user.first_name + ' ' + user.last_name)} id="name"/>
                </div>
              )}
              {!check.name && (
                <p onClick={() => setCheck({ ...check, name: true })} className="btn_edit" >
                  <FontAwesomeIcon icon="fa-solid fa-pen-to-square" className="edit_icon" />
                </p>
              )}
              {check.name && (
                <p onClick={() => setCheck({ name: '' })} className="p_icon">
                  <FontAwesomeIcon className="U_icon check_icon" icon="fa-solid fa-check" />
                </p>
              )}
            </div>
          </div>
          <hr className='w-[100%]'/>
          {/* Email */}
          <div className="form-outline mt-3 row justify-content-center">
            <div className="row ml-2">
              <p className="p_icon"><FontAwesomeIcon className="U_icon" icon="fa-solid fa-envelope" /></p>
              {!check.email && (
                <h5 className="d-flex align-items-center col-8 ml-2 mr-2">{form.email ? (form.email.length < 20 ? form.email : form.email.substring(0, 17) + "...") : (user.email.length < 20 ? user.email : user.email.substring(0, 16) + "...")}</h5>
              )}
              {check.email  && (
                <div className='col'>
                  <input className="text-center form-control form-control-md" type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} placeholder={form.email ? form.email : user.email} id="email"/>
                </div>
              )}
              {!check.email && (
                <p onClick={() => setCheck({ ...check, email: true })} className="btn_edit" >
                  <FontAwesomeIcon icon="fa-solid fa-pen-to-square" className="edit_icon" />
                </p>
              )}
              {check.email && (
                <p onClick={() => {setCheck({ email: '' }); {form.email && chechErrors()}}} className="p_icon">
                  <FontAwesomeIcon className="U_icon check_icon" icon="fa-solid fa-check" />
                </p>
              )}
            </div>
            {err.email && (
              <span className='text-red-500'>{err.email}</span>
            )}
          </div>
          <hr className='w-[100%]'/>
          {/* Password */}
          <div className="form-outline mt-3 row justify-content-center">
            <div className="row ml-2">
              <p className="p_icon"><FontAwesomeIcon className="U_icon" icon="fa-solid fa-key" /></p>
              {!check.password && (
                <h5 className="d-flex align-items-center col-8 ml-2 mr-2">*******</h5>
              )}
              {check.password  && (
                <div className='col'>
                  <input className="text-center form-control form-control-md" type="password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} placeholder='*******' id="password"/>
                </div>
              )}
              {!check.password && (
                <p onClick={() => setCheck({ ...check, password: true })} className="btn_edit" >
                  <FontAwesomeIcon icon="fa-solid fa-pen-to-square" className="edit_icon" />
                </p>
              )}
              {check.password && (
                <p onClick={() => {setCheck({ password: '' }); {form.password && chechErrors()}}} className="p_icon">
                  <FontAwesomeIcon className="U_icon check_icon" icon="fa-solid fa-check" />
                </p>
              )}
            </div>
            {err.passwd && (
            <span className='text-red-500'>{err.passwd}</span>
            )}
          </div>
          <hr className='w-[100%] mb-[-4%]'/>
          {/* Avatar */}
          <div className="form-outline mt-3 row justify-content-center">
            <div className="row ml-2">
              <p>
                <img  src={change ? change :user.avatar} alt="avatar" className="avatar up_div"/>  
              </p>
              <p className="p_avatar"></p>
              {!check.avatar && (
                <h5 className="d-flex align-items-center col-8 ml-2 mr-2">{`${user.first_name.toLowerCase()}_avatar.png`}</h5>
              )}
              {check.avatar  && (
                <div className='col'>
                  <input className="text-center form-control form-control-md" type="text" value={form.avatar} onChange={(e) => setForm({...form, avatar: e.target.value})} placeholder={`${user.first_name.toLowerCase()}_avatar.png`} id="avatar"/>
                </div>
              )}
              {!check.avatar && (
                <p onClick={() => setCheck({ ...check, avatar: true })} className="btn_edit" >
                  <FontAwesomeIcon icon="fa-solid fa-pen-to-square" className="edit_icon" />
                </p>
              )}
              {check.avatar && (
                <p onClick={change_img} className="p_icon">
                  <FontAwesomeIcon className="U_icon check_icon" icon="fa-solid fa-check" />
                </p>
              )}
              
            </div>
          </div>
          {/* <hr className='w-[100%] mb-[-4%]'/> */}
          {/* Telegram */}
          {/* <div className="form-outline mt-3 row justify-content-center">
            <div className="row ml-2">
              <p onClick={ClickTelegram}>
                <img src="https://i.postimg.cc/L5J3J8kf/telegram.png" alt="icon_telegram" className="avatar up_div"/>  
              </p>
              <p className="p_avatar"></p>
              {check.chat_id  && (
                <div className='col'>
                  <input className="text-center form-control form-control-md" readOnly type="text" value={form.chat_id} placeholder={`${user.first_name.toLowerCase()}_avatar.png`} id="avatar"/>
                </div>
              )}
              {check.chat_id && (
                <p onClick={saveChatId} className="p_icon">
                  <FontAwesomeIcon className="U_icon check_icon" icon="fa-solid fa-check" />
                </p>
              )}
            </div>
          </div>
          <hr className='w-[100%]'/> */}
          {/* Update From */}

         
          {(err.email || err.passwd) && (
            <>
              <hr className='w-[100%]'/>
              <button type="button" className="px-8 py-3 text-white bg-black border-2 border-red-700 rounded focus:outline-none disabled:opacity-75"disabled>Save Profile</button>
            </>
          )}
          
          {((form.name || form.email || form.password || form.avatar) && !err.email && !err.passwd ) && (
            <>
              <hr className='w-[100%]'/>
              <a className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md no-underline">
              <span class="w-full h-full bg-gradient-to-br from-[#5ef1a9] via-[#5ef0f1] to-[#5ea6f1] group-hover:from-[#070707] group-hover:via-[#000000] group-hover:to-[#000000] absolute"></span>
                <span className="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400 border-2 border-transparent hover:border-green-500">
                <span className="relative text-white hover:text-black">Save Profile</span>
                </span>
              </a>
            </>
           )}
        </form>
      </div>
    </>
  );
}


